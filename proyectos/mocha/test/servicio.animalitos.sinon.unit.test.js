import {AnimalitosService} from '../ServicioAnimalitos.js'
import {Animalito} from '../Animalito.js'
import {DatosDeNuevoAnimalito} from '../DatosDeNuevoAnimalito.js'
import chai from "chai"
import {ServidorFakeBackend} from './backend.animalitos.fake.js'

const URL_BACKEND = "/animalitos"
chai.should()

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
           
        })
    })


} )
