
# Componente WEB

Estándar del W3C: Web components.

Cuando no existía ese estándar, lo que si existía era la necesidad de crear componentes web.

Componente WEB es una marca HTML propia que se puede reutilizar en distintas aplicaciones.
<usuario id="1231" modo="compacto"/>
Esa marca tiene asociada:
- Lógica de representación (HTML + CSS)
- Lógica de comportamiento (JS)

Cuando no había un estándar, se usaban distintas librerías/Frameworks para crear componentes web: 
Angular, React, Vue, Polymer, etc.

Hoy en día, los navegadores de forma nativa soportan el trabajar con componentes web.
Dentro de polymer, hay una clase, que hoy en día se distribuye como producto independiente, que se llama lit-element.
Que nos permite trabajar de forma nativa con componentes web.

No hay tanta necesidad hoy en día de usar un framework para crear componentes web.
Más bien, usamos los frameworks/librerías por otras razones: Método de trabajo, herramientas, librerías que aportan otras funcionalidades, etc.

W3C definen los estándares de la web: HTML, CSS, XML

JS es un lenguaje cuyos estándares son definidos por ECMA -> Hoy en día el lenguaje se llama ECMAScript

---


Ejemplo: 
    Frontend: Un servicio para interactuar con un Backend de animalitos
        interface AnimalitosService {
            List<Animalito> getAnimalitos();
            Animalito|undefined getAnimalito(long id);
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
      - PRUEBA 1: Alta de un animalito con datos guays / Varias pruebas con datos NO GUAYS (sin nombre, sin tipo, sin edad, etc.)
            Condiciones:            Dado que tengo datos guays: { nombre: "Firulais", tipo: "Perro", edad: 3 }
                                    Y que tengo un servicio de animalitos
                                    Y que tengo un backend rest de animalitos de mierda / de pacotilla
                                        que cuando recibe unos datos de un animalito, siempre devuelve un json con los mismos datos + id= 33
            Acción:                 llamar al método altaDeAnimalito(datosGuays)
            Resultado esperado:     Debo recibir un Animalito
                                    Y el Animalito debe tener los datos que le he pasado    
                                    Y además, en ese Animalito debe haber un id... 33

                ServicioDeAnimalitos(FRONTAL) -------> Backend de pacotilla
                                              <------- 33
                    ^ Llamada (acción que quiero probar)
                        ^ Resultado esperado

      - Prueba 2: Recuperar un animalito que existe... a través de su id
            Condiciones:            Dado que tengo un servicio
                                    Dado que tengo un backend rest de animalitos de mierda / de pacotilla
                                        que cuando recibe como id 55, siempre devuelve un json con { id: 55,  nombre: "Firulais", tipo: "Perro", edad: 3 } STUB
            Acción:                 llamar al método getAnimalito(55)
            Resultado esperado:     Debo recibir un Animalito << Implica que existe
                                    Y que ese animalito tiene por nombre: "Firulais"
                                    Y que ese animalito tiene por tipo: "Perro"
                                    Y que ese animalito tiene por edad: 3
                                    Y que ese animalito tiene por id: 55

      - Prueba 3: Recuperar un animalito que no existe... a través de un id inventado
            Condiciones:            Dado que tengo un servicio
                                    Dado que tengo un backend rest de animalitos de mierda / de pacotilla
                                        que siempre devuelve código de estado 404: NOT_FOUND
            Acción:                 llamar al método getAnimalito(55)
            Resultado esperado:     No debo recibir un Animalito

      - Prueba 4: Recuperar un animalito cuando no soy capaz de contactar con el backend
      - Prueba 5: Recuperar un animalito cuando hay un error interno del backend (si puedo contactar con él... pero me da un 5??)


    - Integración
      - PRUEBA 1: Alta de un animalito con datos guays
            Condiciones:            Dado que tengo datos guays: { nombre: "Firulais", tipo: "Perro", edad: 3 }
                                    Y que tengo un servicio de animalitos
                                    Y que tengo un backend rest de animalitos guay (el de verdad de la buena)
            Acción:                 llamar al método altaDeAnimalito(datosGuays)
            Resultado esperado:     Debo recibir un Animalito
                                    Y el Animalito debe tener los datos que le he pasado    
                                    Y además, en ese Animalito debe haber un id... que debe ser un número mayor que cero (5)
                                    Y además, en el backend debe haberse persitido ese animalito con los datos que le he pasado, y con el id 
                                    que he recibido


                ServicioDeAnimalitos(FRONTAL) -------> Backend real
                                              <------- 
                    ^ Llamada (acción que quiero probar)    ^ Resultado esperado
                        ^ Resultado esperado

      - Prueba 2: Recuperar un animalito que existe... a través de su id
            Condiciones:            Dado que tengo un servicio que quiero probar su integración con un backend a la hora de 
                                    recuperar un animalito
                                    Dado que tengo un backend rest real
                                    Y dado que tengo unos datos guays de un animalito: { nombre: "Pixie", tipo: "Gato", edad: 2 }
                                    OPCION 1: Y dado que he llamado a método altaDeAnimalito(pixie) del servicio
                                    OPCION 2: Y dado que he llamado a un endpoint del backend que crea ese animalito
                                    Y dado que he recibido un ID en esa petición
            Acción:                 llamar al método getAnimalito(ID)
            Resultado esperado:     Debo recibir un Animalito << Implica que existe
                                    Y que ese animalito tiene por nombre: "Pixie"
                                    Y que ese animalito tiene por tipo: "Gato"
                                    Y que ese animalito tiene por edad: 2
                                    Y que ese animalito tiene por id: ID
                Esta prueba, para poder ejecutarse asume unos requisitos... entre ellos:
                    - Que soy capaz de dar de alta un animalito... para recuperarlo después
                    - Si no soy capaz de dar de alta un animalito, no puedo probar esta prueba... porque no tengo un animalito que recuperar
---

Independencia de pruebas:

- Una prueba es independiente de otra si no le afecta el hecho de que esa otra prueba se haya ejecutado previamente o no.

# NPM (el equivalente en java maven)

Node Package Manager: Es una herramienta de automatización de tareas de mi proyecto:
- empaquetado
- ejecución de pruebas
- transpilación
- ...

Además, gestiona dependencias...

# JS es un lenguaje de tipado dinámico: DuckTyping

Las variables no tiene tipo

En lenguajes de tipado estático:
    String texto = "hola";
    - "hola"        -> pone un objeto de tipo String en memoria RAM con valor "hola"
                    Los datos tiene su propio tipo, inherente al dato
    - String texto  -> Crea una variable llamada texto que puede apuntar a objetos (datos) de tipo String
                    La variable tiene un tipo
    - =             -> Asignar la variable a dato
    
    let texto = "hola";
    - "hola"        -> pone un objeto de tipo String en memoria RAM con valor "hola"
                    Los datos tiene su propio tipo, inherente al dato
    - let texto     -> Crea una variable llamada texto que puede apuntar a objetos (datos) de cualquier tipo
                    La variable no tiene un tipo
    - =             -> Asignar la variable a dato

Cómo se si una variable tiene un tipo u otro?
    typeof... siempre y cuando tenga explícitamente definido el tipo (como una clase)
    Si no tengo una clase... y quiero trabajar con el concepto de Interfaz
        Una interfaz simplemente define métodos...
        Lo que miro es si el objeto al que apunta la variable tiene los métodos que me interesan.. y punto !

        typeof variable["metodo"] === "function"


JS es un lenguaje que me permite montar aplicaciones mono-hilo
En el proceso que levanto sólo tengo 1 hilo de ejecución... nada más... 
Algunos estáis acostumbrados a JAVA , donde trabajamos con hilos de ejecución...

Y además... la cosa se complica mucho... Ya que principalmente usamos JS para montar Frontales... que son apps que deben ser muy interactivas con el usuario (cosa que no ocurre en los backends)

    BACKEND -> recibo petición -> proceso petición -> devuelvo respuesta
    FRONTAL -> Recibo eventos -> proceso eventos -> actualizo la vista

Para resolver esta situación en JS tenemos el concepto de funciones ASINCRONAS. Una función asíncrona de JS es una función con capacidad de suspender su ejecución temporalmente... para reactivarse más adelante.
De tal forma que en JS podemos tener un código del tipo:

    TAREA 1
    TAREA 2 (async) 
        llama a un servicio en backend... y cuando sea que el servicio responda... devuelvo los datos que me de el servicio
    TAREA 3
    TAREA 4

    Una función asíncrona de JS devuelve siempre una Promise < Future de JAVA >
    Una promesa es un objeto que envuelve otro objeto de un determinado tipo... que en algún momento estará disponible... o no

Kotlin 
.kt --> compilan a ---> .class  -> JVM              Toda la programación Android hoy en día es Kotlin (java murió)
                            ^                       Cada vez más se empieza a usar para backends
                            byte-code               En Kotlin, que existen hilos, también tenemos el concepto de corrutinas
                                                    que son el equivalente a las funciones asíncronas de JS
.scala --> compilan a ---> .class  -> JVM
                            ^
                            byte-code

---

El API de un backend qué define? OpenAPI (3) (Swagger1 y 2)

- endpoints
  /animalitos
    METODOS:
        GET
            200 OK -> [Animalito] 
            500 NOK -> { error: "..." }


---

Nosotros ahora estamos montando una capa por encima de ese API REST

   ComponenteWEB-ListadoDeAnimalitos            -->   ServicioFrontal ----> API REST
                -DetalleDeUnAnimalito           -->   Animalito             Animalito{id: number, name: string, type: string, age: number}
                -FormularioEdiciónDeUnAnimalito -->   {id: number, nombre: string, tipo: string, edad: number} << mapper
                -FormularioDeNuevoAnimalito     -->