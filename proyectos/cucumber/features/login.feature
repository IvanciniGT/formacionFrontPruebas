#language:es

Característica: Formulario de login

    Antecedentes:  Necesito un navegador web 
        Dado        Dado que tengo un navegador web abierto en la página con url: "https://katalon-demo-cura.herokuapp.com/"
        Y           hago click en el botón con id: "btn-make-appointment"

    Esquema del escenario:  Hacer login ok
        Dado        que escribo en el campo con id: "txt-username" el valor: "<usuario>"
        Y           que escribo en el campo con id: "txt-password" el valor: "<password>"
        Cuando      hago click en el botón con id: "btn-login"
        Entonces    llego a la página con url: "https://katalon-demo-cura.herokuapp.com/#appointment"
        Y           saco una captura de pantalla con nombre: "login_ok.png"

        Ejemplos:
            | usuario   | password            | 
            | John Doe  | ThisIsNotAPassword  |

    Esquema del escenario:  Hacer login nok
        Dado        que escribo en el campo con id: "txt-username" el valor: "<usuario>"
        Y           que escribo en el campo con id: "txt-password" el valor: "<password>"
        Cuando      hago click en el botón con id: "btn-login"
        Entonces    aparece un elemento con clase: "text-danger"
        Y           contiene el texto: "Login failed! Please ensure the username and password are valid."
        Y           saco una captura de pantalla con nombre: "login_nok.png"

        Ejemplos:
            | usuario   | password            | 
            | John Doe  | Ruina               |
            | Ruina     | ThisIsNotAPassword  |
