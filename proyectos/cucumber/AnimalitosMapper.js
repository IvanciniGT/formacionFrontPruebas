export function crearAnimalito(datos){
    const animalito = new Animalito()
    animalito.id = datos.id
    animalito.nombre = datos.nombre
    animalito.edad = datos.edad
    animalito.tipo = datos.tipo
    return animalito
}