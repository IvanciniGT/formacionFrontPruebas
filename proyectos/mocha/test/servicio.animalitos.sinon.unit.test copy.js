import {AnimalitosService} from '../ServicioAnimalitos.js'
import {Animalito} from '../Animalito.js'
import {DatosDeNuevoAnimalito} from '../DatosDeNuevoAnimalito.js'
import chai from "chai"
import {ServidorFakeBackend} from './backend.animalitos.fake.js'

const URL_BACKEND = "/animalitos"
chai.should()

function compararAnimalitos(animalito1, animalito2){
    animalito1.id.should.be.equal(animalito2.id)          // Sintaxis basada en requisitos
    animalito1.nombre.should.be.equal(animalito2.nombre)
    animalito1.edad.should.be.equal(animalito2.edad)
    animalito1.tipo.should.be.equal(animalito2.tipo)
}

describe('AnimalitosService', () => { // Esta es la función que debe ejecutarse para probar ese servicio
    // Preparación
    let animalitosService = new AnimalitosService(URL_BACKEND)
    let nombre = 'Pepito'
    let edad = 3
    let tipo = 'Perro'

    describe('Recuperación de un animalito existente mediante su ID', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        it('Debe devolver un animalito con el ID suministrado y con los datos guays', async () => { // Defino la validación
            let nuevoAnimalito = new Animalito(nombre, edad, tipo, -50)
            ServidorFakeBackend.cargarAnimalitoDePruebas(nuevoAnimalito)
            //animalito.should.be.an.instanceOf(Animalito)
            let animalitoRecuperado = await animalitosService.getAnimalito(nuevoAnimalito.id)
            animalitoRecuperado.id.should.be.equal(nuevoAnimalito.id)          // Sintaxis basada en requisitos
            animalitoRecuperado.nombre.should.be.equal(nuevoAnimalito.nombre)
            animalitoRecuperado.edad.should.be.equal(nuevoAnimalito.edad)
            animalitoRecuperado.tipo.should.be.equal(nuevoAnimalito.tipo)
        })
    })

    describe('Recuperación de un animalito no existente mediante un ID ficticio', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        it('Debe devolver una promesa vacia(undefined)', async () => { // Defino la validación
           ServidorFakeBackend.borrarAnimalitoDePruebas(new Animalito(nombre, edad, tipo, 23))
            let animalitoRecuperado = await animalitosService.getAnimalito(23)
            chai.expect(animalitoRecuperado).to.be.undefined
        })
    })

    describe('Recuperar todos los animalitos', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        it('Debe devolver una promesa con los datos de todos los animalitos cargados en el backend', async () => { // Defino la validación
           ServidorFakeBackend.resetearElEntornoDePruebas()
           let listaDeAnimalitos = [
            new Animalito("Firulais", 3, "Perro", 1),
            new Animalito("Mimi", 2, "Gato", 2),
            new Animalito("Piolin", 1, "Pajaro", 3),
           ]
           listaDeAnimalitos.forEach((animalito) => ServidorFakeBackend.cargarAnimalitoDePruebas(animalito))

              let listaDeAnimalitosRecuperados = await animalitosService.getAnimalitos()
                listaDeAnimalitosRecuperados.should.be.an('array')
                listaDeAnimalitosRecuperados.should.have.lengthOf(3)
                listaDeAnimalitosRecuperados.forEach((animalitoRecuperado, indice) => {
                    compararAnimalitos(animalitoRecuperado, listaDeAnimalitos[indice])
                })

        })
    })


} )
