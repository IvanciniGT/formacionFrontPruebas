import {AnimalitosService} from '../ServicioAnimalitos.js'
import {Animalito} from '../Animalito.js'
import chai from "chai"
import sinon from "sinon"
import { DatosDeNuevoAnimalito } from '../DatosDeNuevoAnimalito.js'
// import "../config.js"
//import {Response} from 'node-fetch'

const URL_BACKEND = "/animalitos"
chai.should()

function compararAnimalitos(animalito1, animalito2){
    animalito1.id.should.be.equal(animalito2.id)          // Sintaxis basada en requisitos
    animalito1.nombre.should.be.equal(animalito2.nombre)
    animalito1.edad.should.be.equal(animalito2.edad)
    animalito1.tipo.should.be.equal(animalito2.tipo)
}

function crearRespuestaHttp(status, body){
    return new Response(JSON.stringify(body), {
        status: status,
        headers: {
            'Content-type': 'application/json'
        }
    })
}
describe('AnimalitosService', () => { // Esta es la función que debe ejecutarse para probar ese servicio
    let fetchStub;
    before( ()=>{
        console.log("Antes de todos los tests")
        // Stubbear la función fetch global
        // Cuando a partir de ahora, se llame a la función "fetch"... quiero que en lugar de la función original,
        // Se invoque a una nueva que sinon va a crear para mi
        fetchStub = sinon.stub(global, 'fetch')
    } ) // Esto se ejecuta antes de comenzar los tests

    beforeEach( ()=>{ // Esto se ejecuta antes de cada test
        fetchStub.resetHistory()
    })

    after( ()=>{  // Esto se ejecuta después de los test
        console.log("Después de cada test")
        fetchStub.restore()
    })

    // Preparación
    let animalitosService = new AnimalitosService(URL_BACKEND)

    describe('Recuperación de un animalito existente mediante su ID', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        it('Debe devolver un animalito con el ID suministrado y con los datos guays', async () => { // Defino la validación
            let nuevoAnimalito = new Animalito("Pipo", 3, "Gato", -50)
            fetchStub.withArgs("/animalitos/-50").resolves(crearRespuestaHttp(200, nuevoAnimalito))
                    // ^ Me aseguro que se llama al backend adecuado
            let animalitoRecuperado = await animalitosService.getAnimalito(nuevoAnimalito.id)
            animalitoRecuperado.id.should.be.equal(nuevoAnimalito.id)          // Sintaxis basada en requisitos
            animalitoRecuperado.nombre.should.be.equal(nuevoAnimalito.nombre)
            animalitoRecuperado.edad.should.be.equal(nuevoAnimalito.edad)
            animalitoRecuperado.tipo.should.be.equal(nuevoAnimalito.tipo)
        })
    })
    describe('Recuperación de un animalito no existente mediante un ID ficticio', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        it('Debe devolver un undefined', async () => { // Defino la validación
            fetchStub.resolves(crearRespuestaHttp(404, undefined))

            let animalitoRecuperado = await animalitosService.getAnimalito(25)
            sinon.assert.calledWith(fetchStub, "/animalitos/25") // Estamos usando el Stub como si fuera: Spy
            chai.expect(animalitoRecuperado).to.be.undefined

        })
    })
    describe('Recuperación de todos los animalitos', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        it('Debe devolver un array con los datos existentes en backend', async () => { // Defino la validación
            let listaDeAnimalitos = [
                new Animalito("Firulais", 3, "Perro", 1),
                new Animalito("Mimi", 2, "Gato", 2),
                new Animalito("Piolin", 1, "Pajaro", 3),
               ]
               
            fetchStub.resolves(crearRespuestaHttp(200, listaDeAnimalitos))

            let listaDeAnimalitosRecuperados = await animalitosService.getAnimalitos()

            sinon.assert.calledWith(fetchStub, "/animalitos") // Estamos usando el Stub como si fuera: Spy

            listaDeAnimalitosRecuperados.should.be.an('array')
                listaDeAnimalitosRecuperados.should.have.lengthOf(3)
                listaDeAnimalitosRecuperados.forEach((animalitoRecuperado, indice) => {
                    compararAnimalitos(animalitoRecuperado, listaDeAnimalitos[indice])
                })
        })
    })
    describe('Alta de un animalito con datos guays', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        let datosDeNuevoAnimalito = new DatosDeNuevoAnimalito("Fire", 3, "Perro")

        it('Debe devolver un animalito con id mayor que cero, y con los datos guays', async () => { // Defino la validación
            let animalito = animalitosService.altaDeAnimalito(datosDeNuevoAnimalito)
        })
    })

} )

console.log(global.fetch)