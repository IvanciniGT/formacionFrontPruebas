
                                              sinon
                                                v
    Pruebas unitarias sobre ServicioAnimalitos ---> Backend HTTP REST 
                                                        ^
                                                        json-server


## Versiones antiguas de node:

npm install node-fetch

Quitar los comentarios de los import en:
- ServicioAnimalitos.js
- servicio.animalitos.sinon.unit.test.js
- backend.animalitos.fake.js

# Sonarqube

Herramienta de análisis de calidad de código.
Entre otros, suelta algunos indicadores:
- Cobertura de código: Porcentaje de código que está soportado por las pruebas unitarias.
                       A sonar le da igual si las pruebas son buenas o malas, solo mira si hay o no.
                       Realmente, Sonar no ejecuta las pruebas, solo mira si hay o no.
                       Otras herramientas ejecutan las pruebas y generan un informe de cobertura.
                       Ese informe es el que lee Sonar.
- Complejidad ciclomática: Es el número de caminos que puede tomar un código (se calcula a nivel de cada función) al ejecutarse
                           Para qué me sirve saber esto? Para saber el mínimo número de pruebas que tengo que hacer para cubrir todos los caminos.
- Complejidad cognitiva: Cómo de complejo es para un ser humano entender un trozo de código.
                         Si tengo una función con muchos if, bucles, whiles... etc... SONAR ME LA TIRA A LA CARA ! 

# Selenium

Es una herramienta que nos permite hacer pruebas a un frontal web.... pero pruebas de sistema!

Antes, existía una herramienta para este tipo de pruebas llamada mercury, pero se quedó obsoleta... y era muy compleja de usar.
De hecho de ahí viene el nombre de Selenium, porque se suministra Selenio para combatir una intoxicación por mercurio.

Hay un estandar del W3C llamado WebDriver que permite interactuar con un navegador web desde código.
Los navegadores web (Chrome, Firefox, Edge, Safari...) implementan este estandar, y Selenium se apoya en él para automatizar trabajos dentro de un navegador.

SELENIUM realmente no es una herramienta de pruebas.
Es una herramienta que nos permite interactuar con un navegador web desde código.

Selenium ofrece 3 productos independientes:
- Selenium IDE: Es un plugin para Chrome y Firefox que nos permite grabar acciones en el navegador y reproducirlas.
                Es una castaña del 15... NO VALE (un poquito si)
- Selenium WebDriver: Es una librería (disponible en un montón de lenguajes de programación diferentes) que nos permite
                interactuar con un navegador web desde código.
                      Es la que vamos a usar. POR SUPUESTO !
- Selenium Grid: Es una herramienta que nos permite ejecutar pruebas en paralelo en varios navegadores y en varios equipos.
                 Es poco habitual que montemos lo que se llama un grid de selenium.
                 Normalmente es algo que alquilamos en la nube.

                 Safari     la versión ultima, las 5 últimas
                            Mac
                            Iphone
                 Firefox
                 Chrome
                            Windows
                            Mac
                            Linux
                            Android - Tableta (resolución de pantalla)
                                    - Teléfono (otra resolución de pantalla)
                 Edge
                 Opera


                                    v driver de navegador (que implementa el estandar WebDriver del W·C y depende del navegador)
Script JS -> selenium-webdriver -> webdriver -> navegador (Chrome)
                ^ Librería que tengo para montón de lenguajes de programación
                  que me permite hablar con un driver de navegador



# Cypress / Karma, Webdriver.io

Me ayudará a hacer pruebas de sistema, pero incluso pruebas de integración o unitarias