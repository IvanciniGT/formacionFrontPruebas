// Paradigmas de programación
// - Imperativo             Cuando escribimos código que debe ejecutarse de forma secuencial
//                          En ocasiones necesito romper la secuencialidad: if, for, while, switch
// - Procedural             Cuando el lenguaje me permite definir mis propias funciones/procedimientos/métodos/subrutinas
//                          Además, me permite invocarlas posteriormente
// - Funcional              Cuando el lenguaje me permite que una variable apunte a una función
//                          para posteriormente ejecutar la función desde la variable
//                          Lo relevante es lo que puedo comenzar a hacer si dispongo de esta capacidad
//                          - Pasar funciones como parámetros de otras funciones
//                          - Retornar funciones desde otras funciones
// - Orientado a objetos    Cuando el lenguaje me permite definir mis propios tipos de datos, son sus prop y funciones específicas
//                              List        secuencia de valores            size, add, remove, get, set, indexOf, contains, ...
//                              String      secuencia de caracteres         size, toUpperCase, toLowerCase, indexOf, contains, ...
//                              Date        dia, mes, año                   enQueDiaDeLaSemanaCae
//                              Animalito   nombre, edad, tipo, id          comer, dormir, ...
// - Declarativo


// En español es igual
// - Imperativo: Felipe, pon una silla debajo de la mesa
// - Declarativo: Felipe, la silla debe estar debajo de la mesa
function saluda(nombre){
    console.log(`Hola ${nombre}`)
}
saluda("Felipe")

let miFuncion = saluda
miFuncion("Felipe")

function generarSaludoFormal(nombre){
    return `Estimado ${nombre}`
}

function generarSaludoInformal(nombre){
    return `Hola ${nombre}`
}

function saludar(persona, funcionGeneradoraDeSaludo){
    console.log(funcionGeneradoraDeSaludo(persona)) // Statement: Sentencia | Oración | Frase
}

saludar("Felipe", generarSaludoFormal)

// Expresiones Lambda: Arrow functions => Trozo de código que devuelve una función anónima creada dentro del statement
// Es una expresion: Trozo de código que devuelve un valor
let numero = 5+7; // Statement
             /// Expresión

let miFuncionGeneradoraDeSaludoAmistoso = (nombre) => {
    return `Hey ${nombre}`
}

miFuncionGeneradoraDeSaludoAmistoso = (nombre) => `Hey ${nombre}`

saludar("Felipe", miFuncionGeneradoraDeSaludoAmistoso)
                        
saludar("Felipe", (nombre) => `Hey ${nombre}`)
