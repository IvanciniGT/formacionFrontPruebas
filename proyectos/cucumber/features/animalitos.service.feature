#language:es

Característica: Servicio de Animalitos

    Escenario: Alta de un animalito cuando tengo datos ok
        Dado        que tengo un servicio de animalitos que trabaja con un backend de prueba
        Y           que tengo un nuevo animalito
        Y           que ese animalito tiene por "nombre": "Pepito"
        Y           que ese animalito tiene por "tipo": "Perro"
        Y           que ese animalito tiene por "edad": 2
        Cuando      solicito un alta del animalito
        Entonces    se devuelve un animalito
        Y           ese animalito tiene por "nombre": "Pepito"
        Y           ese animalito tiene por "tipo": "Perro"
        Y           ese animalito tiene por "edad": 2
        Y           ese animalito tiene un id válido