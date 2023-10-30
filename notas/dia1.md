# Pruebas

## Vocabulario que usamos en el mundo del testing

- Error     Los humanos somos los que cometemos errores (cansancio, falta de concentración, falta de conocimiento, etc)
- Defecto   Al cometer un error podemos introducir un defecto en el producto
- Fallo     Esos defecto en un momento dado pueden manifestarse y provocar un fallo

## Para qué sirven las pruebas?

- Para asegurar el cumplimiento de unos requisitos <<< Concepto básico de lo que es una prueba 
- Para detectar la mayor cantidad posible de fallos al usar mi producto antes de su paso a producción (lanzamiento)
    - Una vez identificado un fallo, procedemos a resolver el defecto que lo provoca
    - Pero para ello, lo primero es necesario: identificar el defecto (depuración o debugging) -> Desarrollador
- Para ayudar a la pronta identificación de los defectos (capturar logs, pantallas, escribir el procedimiento para reproducir un fallo...) (**1)
- Para detectar la mayor cantidad posible de defectos antes de su paso a producción (lanzamiento)
  - Revisión de código -> SonarQube
  - Revisión de requisitos
  - Revisión de un diseño (app, bbdd, etc)
- Haciendo un análisis de causas raíces, podemos llegar a identificar los ERRORES que se cometieron y el por qué se cometieron... lo que nos permite tomar acciones preventivas, que eviten nuevos errores -> defectos -> fallos en el futuro
- Establecer una metodología de desarrollo de software (guiarnos en el desarrollo):
  - Test-First                          Primero diseño las pruebas UNITARIAS y luego desarrollo el código que haga
                                        que las pruebas pasen
  - TDD (Test Driven Development)       Test-first + refactorización en cada iteración.
  - BDD (Behavior Driven Development)   Primero que hacemos es definir las pruebas de Sistema
  - ATDD (Acceptance Test Driven Development)  Primero que hacemos es definir las pruebas de Aceptación
- Conocer más de mi producto -> Extraer conocimiento que aplicar en el futuro
- Para saber que tal voy en el desarrollo de mi producto

## Tipos de pruebas en el mundo del software

Las pruebas se clasifican en base a diferentes taxonomías (paralelas entre si)
Cualquier prueba debe centrarse en una única característica (**1)

### En base al objeto de prueba

- Funcionales       Se centran en la funcionalidad de un sistema/componente
- No funcionales    Se centran en otros aspectos
  - Rendimiento
  - UX
  - Estrés
  - Carga
  - Seguridad
  - HA
  - Pruebas de humo La prueba más básica que hacemos para asegurarnos que un sistema está correctamente instalado y configurado.
    Smoke/test

### En base al nivel de la prueba (scope)

- Unitarias             Se centra en una única característica de un componente AISLADO de mi sistema

            TREN
                 Motor      Sistema de frenos       Ruedas      Asientos        Sistema de transmisión

        Si le meto corriente al sistema de frenos, las pinzas se cierran? (prueba unitaria)
        Si pongo la rueda en un eje... y le pego un viaje... gira? (prueba unitaria)

- Integración           Se centra en la COMUNICACION entre 2 componentes de mi sistema

            Sistema de frenos ---> Ruedas

        Si junto el sistema de frenos con la rueda, y a la rueda le meto un viaje... cuando le meta corriente al sistema de frenos entonces: 
        la rueda se pare.

- End2End (Sistema)     Se centran en el COMPORTAMIENTO de sistema en su conjunto

        Ya tengo el tren montado... si le doy al botón de START, va pa'lante?

        Si tengo todas las pruebas de sistema pasando, necesito otro tipo de pruebas adicionales? NO, ya tengo la garantía.
        El truco está en:
        - Y si no pasan? Dónde está el problema? NPI
        - Cuando puedo hacer estas pruebas de sistema? Cuando ya tengo el Sistema... y no antes.
          - Y hasta el último día no hago pruebas? Pues lo llevas claro... ponle bien de perejil a San Pancracio


- Aceptación    Normalmente son un subconjunto de las anteriores

La diferencia entre una prueba unitaria, una prueba de integración y una de sistema, a veces es simplemente el contexto en el que hago la prueba.
A veces, ni siquiera... y la diferencia es conceptual.


    FRONTAL de una app web: App web de la tienda de animalitos FERMIN!

    Frontal                                                                 Backend
    -----------------------------------------------------------------       ----------------------------------------------------
                                                                                                                guardarAnimalito
                                                                                                                    v
    Pantalla / listado > Componente Listado de Animalitos > Servicio  >>>>  Controlador Rest    > Servicio   > Repositorio      > BBDD
                            Definir la                      Definir la      Exponer serv.         Definir    > Definir          > Persistir 
                            lógica de                       lógica de       mediante un           la lógica    la lógica          información
                            representación                  acceso a        protocolo             de negocio   de persistencia
                            de datos de                     datos de            REST                altaDeUnAnimalito
                            animalitos                      un backend          SOAP                - Llegan unos datos
                                                                                                    - Los persisto en un repo
                                                                                                    - Mando un email a altas@animalitosfermin.com
                                                                                                    - Llamar a un veterinario para que lo revise

    Para probar esos componentes... voy a empezar: por las pruebas unitarias o por la de integración o por la de sistema? Unitarias
        Servicio en Backend: altaDeUnAnimalito... pero este servicio depende de: Repositorio / Servicio de envío de emails

            Servicio De Backend -> Servicio de Emails
                                -> Repositorio de Animalitos

        Hago una llamada a la función del servicio: altaDeUnAnimalito... y falla... qué ha fallao? 
            La lógica que he implementado en el Servicio de Backend                     < UNITARIA? 

                    Servicio De Backend -> Servicio de Emails de mentirijilla
                                                void sendEmail(String email, String asunto, String cuerpo) {
                                                    // No hago nada
                                                }
                                        -> Repositorio de Animalitos de mentirijilla
                                                long guardarAnimalito(DatosDeAnimalito datos) {
                                                    return 33;
                                                }

            La lógica que he implementado en el Servicio de Emails                      < UNITARIA
            La lógica que he implementado en el Repositorio de Animalitos               < UNITARIA 
            La BBDD                                                                     < UNITARIA
            La comunicación del servicio de Backend con el Servicio de Emails           < INTEGRACION
            La comunicación del servicio de Backend con el Repositorio de Animalitos    < INTEGRACION

                    Servicio De Backend -> Servicio de Emails de mentirijilla
                                                void sendEmail(String email, String asunto, String cuerpo) {
                                                    // No hago nada
                                                }
                                        -?-> Repositorio de Animalitos de verdad de la buena !


            La comunicación del repositorio con la BBDD                                 < INTEGRACION

    Esos componentes de mentirijilla que voy creando para hacer pruebas se denominan: Test-Doubles... mal llamados mocks
    Hay muchos tipos de test-doubles (véase Martin Fowler):
    - Dummies
    - Stub
    - Fake
    - Spy
    - Mocks
    Muchas veces usamos el término Mock para referirnos a cualquier testDouble. esto está fatal (culpa de Mockito)

            long altaDeAnimalito(Datos)     long guardarAnimalito(Datos)
                    v                           v
            Servicio de Animalitos ---*1--> Repositorio de Animalitos
                                   <--*2---

            algo*2 = repositorioDeAnimalitos.guardar(animalito*1);

        En ocasiones solo me interesa centrarme en los datos que se devuelven:
            class RepositorioDeAnimalitosDeStub implements RepositorioDeAnimalitos{ // Devuelve siempre lo mismo ante cualquier petición
                long guardar(Animalito animalito) {
                    return 33;
                }
            }

            Prueba unitaria Servicio de Animalitos:
                Dado que tengo unos datos de animalito guays (nombre: "Fermin", tipo: "Gato", edad: 3)
                Cuando le pido al servicio que guarde un animalito (altaDeAnimalito)
                Recibo: 33

            class RepositorioDeAnimalitosDeFake implements RepositorioDeAnimalitos{ //Lo que devuelve viene condicionado por los datos de entrada
                long guardar(Animalito animalito) {
                    if(animalito.getNombre().equals("Fermin")
                        return 33;
                    else return 44;
                }
            }

            Un fake me sirve para distintas pruebas. Un stub no.
            Un fake llevado al extremo se acabaría convirtiendo en La implementación real!

            long altaDeAnimalito(Datos)     void enviarEmail(String destinatario, String asunto , String cuerpo)
                    v                           v
            Servicio de Animalitos ---*1--> Servicio de Emails
                                   <--*2---

            class ServicioDeEmailsDummy implements ServicioDeEmails{ // No hace nada. La implementación más sencilla posible de una clase 
                void enviarEmail(String destinatario, String asunto , String cuerpo) {
                    // No hago nada
                }
            }
            Prueba unitaria Servicio de Animalitos:
                Dado que tengo unos datos de animalito guays (nombre: "Fermin", tipo: "Gato", edad: 3)
                Cuando le pido al servicio que guarde un animalito (altaDeAnimalito)
                Recibo: 33
                Y se debe haber solicitado el envío de un email:
                    Miro en el El Spy si destinatario es igual al valor esperado
                    Miro en el El Spy si asunto es igual al valor esperado
                    Miro en el El Spy si cuerpo es igual al valor esperado

            class ServicioDeEmailsSpy implements ServicioDeEmails{ // Registrar las llamadas que se hagan
                String destinatario = null;
                String asunto= null;
                String cuerpo = null;
                void enviarEmail(String destinatario, String asunto , String cuerpo) {
                    this.destinatario = destinatario;
                    this.asunto = asunto;
                    this.cuerpo = cuerpo;
                }
            }
            class ServicioDeEmailsMock implements ServicioDeEmails{ // Valida las llamadas que se hagan
                String destinatario = null;
                String asunto= null;
                String cuerpo = null;
                boolean seHaLlamadoALaFuncion = false;
                void esperaUnaLlamadaConLosDatos(String destinatario, String asunto , String cuerpo) {
                    this.destinatario = destinatario;
                    this.asunto = asunto;
                    this.cuerpo = cuerpo;
                }
                void enviarEmail(String destinatario, String asunto , String cuerpo) {
                    if( !this.destinatario.equals(destinatario)) throw new RuntimeException("Destinatario no coincide");
                    if( !this.asunto.equals(asunto)) throw new RuntimeException("Asunto no coincide");
                    if( !this.cuerpo.equals(cuerpo)) throw new RuntimeException("Cuerpo no coincide");
                }
                public boolean validarLaLlamada(){
                    if(!seHaLlamadoALaFuncion) throw new RuntimeException("No se ha llamado a la función");
                }

            }// El mock lleva dentro el código para validar los datos

            A la hora de hacer la prueba, configuro el mock (le digo que llamada se debería esperar)
            Si la llamada se hace con datos incorrectos, el mock estalla
            Al final de la prueba, le pido al mock que me asegure que la llamada se realizó: mock.validarLaLlamada()

    En ocasiones, los test-doubles que vamos a necesitar, los creamos nosotros... son muy simples y tardo poco
    En otras ocasiones me puedo ayudar de herramientas que generan este tipo de objetos por mi:
        JAVA: Mockito
        JS:   Sinon

Lo primero, hoy en día tratamos de respetar los principios de desarrollo SOLID (por aquí empieza a salirnos el tio Bob)
SOLID:
    S: Single Responsability Principle: Un componente de mi sistema debería tener una única responsabilidad dentro del sistema... y por ende un
       único motivo para cambiar
    D: Dependency Inversion Principle:  Los componentes de mi sistema deberían depender de abstracciones y no de implementaciones concretas


### Tipos de pruebas en base al procedimiento de ejecución de la prueba:

- Pruebas dinámicas: Son las que requieren ejecutar el código para realizarse       -> Identifican FALLOS
- Pruebas estáticas: Son las que NO requieren ejecutar el código para realizarse    -> Identifican DEFECTOS (SonarQube)

### Tipos de pruebas en base al conocimiento previo del objeto de prueba:

- Pruebas de caja negra: No se conoce el código del objeto de prueba
- Pruebas de caja blanca: Se conoce el código del objeto de prueba

### Otras clasificaciones

- Pruebas de regresión: Prueba que vuelvo a ejecutar más adelante para asegurar que lo que funcionaba sigue funcionando
    Al trabajar con met. ágiles, casi todas las pruebas se me convierten en pruebas de regresión
    Pruebas... que si voy a querer ejecutar más de 1 vez, es muy probable que me interese: AUTOMATIZARLAS


## Cómo definimos una prueba.

### Partes / Conceptos que hemos de tener un cuenta a la hora de definir cualquier prueba:

- Escenario/Condiciones en las que voy a realizar la prueba
- La acción que quiero probar
- El resultado esperado

En ocasiones usamos distintas sintaxis que nos facilitan el no olvidarnos de estas partes: Given/When/Then -> Gherkin

Gherkin es un lenguaje... más propiamente es un conjunto de restricciones que aplicamos sobre lenguajes naturales (hablados por los seres humanos: Español, Inglés, Mandarín, etc)

La idea detrás de Gherkin es definir los requisitos de un sistema de forma que sean entendibles por todos los miembros del equipo de desarrollo (desarrolladores, testers, analistas, etc) y además, que esos requisitos se conviertan semiautomáticamente en pruebas de mi sistema/componente.
Existe una herramienta llamada Cucumber que es capaz de leer esos ficheros y ejecutar las pruebas que se definen en ellos, así como de generarnos un esqueleto de código para implementar esas pruebas.

Hay otros lenguajes... por ejemplo algunos que nos proporcionan los frameworks de pruebas.
- Junit
- Mocha / Jasmine       describe() it() -> Las condiciones y las acciones que queremos probar
- Chai                  me da una forma de escribir "El resultado esperado"
                        - asserts
                        - expects
                        - shoulds

Mocha era el nombre antiguo de JS -> EcmaScript

### Hay otra cosita que tenemos en cuenta a la hora de definir pruebas en el mundo del software

Hoy en día, a la hora de desarrollar software tenemos en cuenta los principios SOLID
Los principios SOLID tienen su equivalente en el mundo del testing: FIRST

Los principios FIRST son 5 principios que nos ayudan a definir pruebas de software de calidad... fácilmente mantenibles.

- Fast: Las pruebas deben ser rápidas de ejecutar
  - Voy a estar ejecutándolas de continuo... y quiero los resultados rapidito... no voy a estar 5 horas esperando el resultado de unas pruebas
  - En ocasiones metermos (usaremos) test-doubles para acelerar la ejecución de las pruebas
- Independent: Las pruebas deben ser independientes entre si
  - Que para hacer la prueba 2 no tenga que haber hecho antes la prueba 1
  - Que el haber hecho la prueba 1 no me condicione el resultado de la prueba 2 <<< En ocasiones es complejo de conseguir !
- Repeatable: Las pruebas deben ser repetibles dado cualquier estado de partida
  - Que si ya he ejecutado la prueba 1, que pueda volver a ejecutarla sin ningún problema... y en ocasiones es complejo de conseguir !
- Self-validating: Las pruebas deben ser autovalidables
  - Deben tener en cuenta todas las consecuencia de la acción que queremos probar
- Timely: Oportunas: Las pruebas deben ser escritas en el momento adecuado
  - De nada me sirve una prueba unitaria después de tener las pruebas de sistema.

---

Ejemplo: 
    Frontend: Un servicio para interactuar con un Backend de animalitos
        interface AnimalitosService {
            List<Animalito> getAnimalitos();
            Animalito getAnimalito(long id);
            Animalito altaDeAnimalito(DatosDeNuevoAnimalito animalito);
        }

        SOLID: I: Interface Segregation Principle: Es mejor tener muchas interfaces específicas que una única interfaz de propósito general

    Backend: Una serie de endpoints REST que me permiten hacer operaciones CRUD con animalitos:

        POST /api/v1/animalitos {datos} -> {datos + id + fecha de alta...} 201 CREATED
        GET  /api/v1/animalitos -> [ {} , {}, {} ]200 OK
        GET  /api/v1/animalitos/{id} -> {datos} 200 OK

        {datos} = { nombre: "Firulais", tipo: "Perro", edad: 3 } + { id }

Pruebas que podemos definirle:
- Pruebas funcionales
    - Unitarias
      - PRUEBA 1: Alta de un animalito con datos guays
            Condiciones:            Dado que tengo datos guays: { nombre: "Firulais", tipo: "Perro", edad: 3 }
                                    Y que tengo un servicio de animalitos
                                    Y que tengo un backend rest de animalitos de mierda / de pacotilla
                                        que cuando recibe unos datos de un animalito, siempre devuelve un json con los mismos datos + id= 33
            Acción:                 llamar al método altaDeAnimalito(datosGuays)
            Resultado esperado:     Debo recibir un Animalito
                                    Y el Animalito debe tener los datos que le he pasado    
                                    Y además, en ese Animalito debe haber un id... 33
    - Integración
      - PRUEBA 1: Alta de un animalito con datos guays
            Condiciones:            Dado que tengo datos guays: { nombre: "Firulais", tipo: "Perro", edad: 3 }
                                    Y que tengo un servicio de animalitos
                                    Y que tengo un backend rest de animalitos
            Acción:                 llamar al método altaDeAnimalito(datosGuays)
            Resultado esperado:     Debo recibir un Animalito
                                    Y el Animalito debe tener los datos que le he pasado    
                                    Y además, en ese Animalito debe haber un id... que debe ser un número mayor que cero
                                    +???

---

Aplicación de consola que me reciba 2 argumentos: IDIOMA / PALABRA
Y me escriba en la consola: 
  - La palabra X existe en el idioma Y
    Y sus significados son: Tal, tal y tal
  - La palabra X No existe en el idioma Y
    Quizás quisiste decir la palabra Z

3 componentes:
    Frontal (Consola)
        v Comunicación ^        API backend
    Backend (controlar diccionarios)

API backend: diccionarios-api <- JAVA  ---> diccionarios-api-v1-0-0.jar

    package com.diccionarios.api;
        public interface Diccionario {
            boolean existe(String palabra);
            List<String> getSignificados(String palabra);
        }
        public interface SuministradorDeDiccionarios {
            boolean tienesDiccionarioDe(String idioma);
            Diccionario getDiccionario(String idioma);
        }

Implementación de ese API: Una donde los diccionarios se almacenen en Ficheros, BBDD, Serv rest.
    Diccionarios en Ficheros

    package com.diccionarios.impl;
        public class DiccionarioEnFicheros implements Diccionario {
            public boolean existe(String palabra) { ...}
            public List<String> getSignificados(String palabra) { ...}
        }
        public class SuministradorDeDiccionariosEnFicheros implements SuministradorDeDiccionarios {
            public boolean tienesDiccionarioDe(String idioma) { ...}
            public Diccionario getDiccionario(String idioma) { ...}
        }

UI de terminal / consola

    import com.diccionarios.api.SuministradorDeDiccionarios;        // Interfaz
    import com.diccionarios.api.Diccionario;                        // Interfaz
    //import com.diccionarios.impl.SuministradorDeDiccionariosEnFicheros; // Y AQUI LA HE REGAO !!!!!
                                                                        // ME acabo de caer con to'l equipo
                                                                        // ESTA ES LA MUERTE DE MI PROYECTO 
                                        // Me acabo de cagar en el ppo de inversión de la dependencia
    public class AppConsola {

        // Más código
        public void procesarPeticion(String idioma, String palabra, SuministradorDeDiccionarios miSuministrador){
            // haré cosas
            boolean existeLaPalabra = false;
            // SuministradorDeDiccionarios miSuministrador = new SuministradorDeDiccionariosEnFicheros();
            if(miSuministrador.tienesDiccionarioDe(idioma)) {
                existeLaPalabra = miSuministrador.getDiccionario(idioma).existe(palabra);
            }
            // Sigo haciendo cositas... con esa variable
        }
    }

    Una forma de resolver este problema... y de seguir respetando el principio D: Dependency Inversion Principle
    aplicar un patrón de INYECCION DE DEPENDENCIAS: es un patrón de diseño orientado a objetos, en el que se suministran objetos a una clase en lugar de ser la propia clase la que cree dichos objetos

    Si no tengo un software construido que se haya sido diseñado mediante patrones de inyección de dependencias:
    LO LLEVO COMO EL CULO para poder hacer pruebas UNITARIAS y de INTEGRACION. En ocasiones puede incluso ser imposible hacerlas.

    Lo único que mantiene a JAVA vivo a día de hoy: Spring Framework... y la única razón de ser de spring es facilitar el diseñar un software mediante un patrón de inyección de dependencias.
    Angular: Es un framework de IoC, igual que Spring, que me facilita el diseño de un software mediante un patrón de inyección de dependencias.

---






















- De regresión
  






# Metodologías ágiles

Son un reemplazo de las met. tradicionales (met. en cascada, V, espiral...) que se usaban para el desarrollo de software.

## Cuál es la principal característica de las metodologías ágiles?

Realizar la entrega de mi producto de forma incremental, para recibir feedback de los usuarios lo antes posible, evitando arrastrar defectos durante el desarrollo de mi producto.


Dia 30, Entrega 1 (100% funcional)... quizás estoy entregando el 10% de mi producto, pero es 100% funcional. -> Paso a prod 1
- Pruebas a nivel de producción: 10%
- Instalación 1
Dia 45 Entrega 2 (100% funcional)... quizás estoy entregando el +5% de mi producto -> Paso a prod 2
- Pruebas a nivel de producción: 5% + 10% = 15%
- Instalación 2
Dia 60 Entrega 3 (100% funcional)... quizás estoy entregando el +15% de mi producto -> Paso a prod 3
- Pruebas a nivel de producción: 15% + 5% + 10% = 30%
- Instalación 3

Las met. ágiles han venido con sus propios problemas... han resuelto otros... pero traen nuevos al tablero de juego.
Antiguamente, cuántas veces se probaba un producto? 1 vez en el proyecto... cuando iba a entregar.
Hoy en día, cuántas veces se instalaba un producto? 1 vez. Al acabar el proyecto

De dónde sale la pasta para esto? y los recursos? y el tiempo? No la hay, ni pasta, ni recursos, ni tiempo.
Ésto solo tiene una única solución: AUTOMATIZAR TODO LO QUE SE PUEDA.

> El software funcionando es la MEDIDA principal de progreso.

La MEDIDA principal de progreso es el "software funcionando"
La MEDIDA (la forma en la que mido) principal (la más importante que debo utilizar) de progreso (para saber qué tal va mi proyecto... si voy en fecha... o retrasado) es el "software funcionando" => INDICADOR!
- "software funcionando"? Un software que funciona..
- Quién dice que un software funciona? Las pruebas!

Hoy en día para saber que tal va mi proyecto, miro el número de pruebas superadas por unidad de tiempo.

Antiguamente mediamos el grado de avance de un proyecto:
- Preguntando al equipo de desarrollo!
- Contar el número de líneas de código que se han escrito en una unidad de tiempo

# DEV-->OPS

Es una cultura, una filosofía, movimiento en pro de la AUTOMATIZACION en el mundo IT... automatización de qué? De TODO!

                AUTOMATIZABLE?          HERRAMIENTAS DE AUTOMATIZACION
- Plan          Malamente
- Code          Digamos que no...                                               ---> Repo de git (u otro SCM)
- Build         SI
                                        Java: Maven, Gradle, Ant
                                        .net: MSBuild, dotnet, nuget
                                        js/TS: npm, yarn, webpack
                                        python: poetry, pip
                                        Contenedores: Docker
----> Si automatizo todo lo posible hasta este punto? Desarrollo ágil 
                                                      (no tiene nada que ver con usar una metodología ágil de gestión de proyectos)
- Test
    Diseño      Digamos que no...
    Ejecución   SI (para la mayor parte de tipos de pruebas: UX)
                                        Frameworks de pruebas: JUnit, TestNG, NUnit, xUnit, Jasmine, Jest, Mocha, Cucumber
                                        Pruebas de unos servicios backend: Postman, SoapUI, ReadyAPI, karate
                                        Pruebas de frontend:
                                            - Web: Selenium, Cypress, karma
                                            - App Smartphone: Appium
                                            - App desktop: UFT
                                        Pruebas de calidad de código: Sonarqube, lint
                                        Pruebas de rendimiento: JMeter, LoadRunner
     NOTA: Las pruebas las ejecuto en la máquina del desarrollador? NUNCA NI DE COÑA ! No me fio de la máquina del desarrollador.. Está malea!!!
           Las pruebas las ejecuto en la máquina del tester? NUNCA NI DE COÑA ! No me fio de la máquina del tester.. Está malea!!!
           Las ejecuto en un entorno de pruebas precreado? Hoy en día tampoco... no me fio de los entornos de pruebas precreados... 
                                                           están malea!!! En la instalación 1, están guay... y después de 25 instalaciones???
           La tendencia hoy en día es tener entornos de pruebas de usar y tirar... que se crean y se destruyen en cada ejecución de pruebas. -> Contenedores/Docker ....
           La creación de estos entornos ... y la instalación de mi app en ellos, es algo que también querré automatizar:
            - Creación de entornos: Docker, Vagrant, Ansible, Puppet, Chef, Terraform, Kubernetes
----> Si automatizo todo lo posible hasta este punto? Integración continua
        Cuando consigo tener CONTINUAMENTE la última versión que han hecho mis desarrolladores del código en el entorno de INTEGRACION
        siendo sometida a pruebas de todo tipo... y que esas pruebas se ejecuten de forma automática...

        Cuál es el producto de un flujo/pipeline/script de CI?                  INFORME DE PRUEBAS !!!!

- Release   SI
            Dejar mi producto listo para usar en un repo de artefactos (artifactory, nexus, npm, dockerhub, playstore, etc) 
----> Si automatizo todo lo posible hasta este punto? Entrega continua (Continuous delivery)
- Deploy    SI
----> Si automatizo todo lo posible hasta este punto? Despliegue continuo (Continuous deployment)
- Operate   SI
- Monitor   SI

Imaginaos que para un proyecto he conseguido automatizar todas las tareas de arriba que sean automatizables para ese proyecto.
Ya tendría todo automatizado? Me faltaría automatizar la ejecución de esos automatismos

Aquí entran los servidores de automatización de tareas: (orquestadores de tareas): AUTOMATIZACION de SEGUNDO NIVEL
- Jenkins
- Jet brains: TeamCity
- Atlassian: Bamboo
- Github: Actions
- Gitlab: CI/CD
- Travis CI

# AUTOMATIZAR

Montar una máquina o un programa que haga lo que antes hacíamos los seres humanos.
En el mundo de las pruebas o de las instalaciones, lo que hacemos es montar un SCRIPT que haga la prueba o la instalación por mi.
