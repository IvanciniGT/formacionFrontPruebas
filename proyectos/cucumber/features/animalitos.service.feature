#language:es

Característica: Servicio de Animalitos

    Esquema del escenario:  Alta de un animalito cuando tengo datos ok
        Dado        que tengo un servicio de animalitos que trabaja con un backend de prueba
        Y           que tengo un nuevo animalito
        Y           que ese animalito tiene por "nombre": "<nombre>"
        Y           que ese animalito tiene por "tipo": "<tipo>"
        Y           que ese animalito tiene por "edad": <edad>
        Cuando      solicito un alta del animalito
        Entonces    se devuelve un animalito
        Y           ese animalito tiene por "nombre": "<nombre>"
        Y           ese animalito tiene por "tipo": "<tipo>"
        Y           ese animalito tiene por "edad": <edad>
        Y           ese animalito tiene un id válido

        Ejemplos:
            | nombre  | tipo  | edad |
            | Pepito  | Perro | 2    |
            | Juanito | Gato  | 3    |
            | Pepita  | Perro | 4    |
            | Juanita | Gato  | 5    |

    Escenario:  Recuperar un animalito existente en el backend
        Dado        que tengo un servicio de animalitos que trabaja con un backend de prueba
        Y           que tengo un nuevo animalito
        Y           que ese animalito tiene por "nombre": "Pepito"
        Y           que ese animalito tiene por "tipo": "Perro"
        Y           que ese animalito tiene por "edad": 2
        Y           solicito un alta del animalito
        Y           recupero el id del animalito
        Cuando      solicito el animalito con el id anterior
        Entonces    se devuelve un animalito
        Y           ese animalito tiene por "nombre": "Pepito"
        Y           ese animalito tiene por "tipo": "Perro"
        Y           ese animalito tiene por "edad": 2
        Y           ese animalito tiene por id el recuperado anteriormente


    Escenario:  Recuperar un animalito no existente en el backend
        Dado        que tengo un servicio de animalitos que trabaja con un backend de prueba
        Cuando      solicito el animalito con id: -78
        Entonces    se no devuelve un animalito

