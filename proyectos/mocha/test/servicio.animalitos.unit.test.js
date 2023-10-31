import {AnimalitosService} from '../ServicioAnimalitos.js'
import {Animalito} from '../Animalito.js'
import {DatosDeNuevoAnimalito} from '../DatosDeNuevoAnimalito.js'
import chai from "chai"

const URL_BACKEND = "http://localhost:3001/animalitos"
chai.should()

function asegurarQueTodoSonAnimalitosConSusDatosCompletos(arrayDeAnimalitos){
    arrayDeAnimalitos.should.be.an('array')
    arrayDeAnimalitos.forEach((animalito) => {
       // animalito.should.be.an.instanceOf(Animalito)
        animalito.nombre.should.be.a('string')
        animalito.edad.should.be.a('number')
        animalito.tipo.should.be.a('string')
        animalito.id.should.be.a('number')
        animalito.id.should.be.above(0)
    })
}

describe('AnimalitosService', () => { // Esta es la función que debe ejecutarse para probar ese servicio
    // Preparación
    let animalitosService = new AnimalitosService(URL_BACKEND)
    let nombre = 'Pepito'
    let edad = 3
    let tipo = 'Perro'

    describe('Alta de un animalito con datos guays', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        let datosDeNuevoAnimalito = new DatosDeNuevoAnimalito(nombre, edad, tipo)
        // Ejecución
        let animalito = animalitosService.altaDeAnimalito(datosDeNuevoAnimalito)

        it('Debe devolver un animalito con id mayor que cero, y con los datos guays', async () => { // Defino la validación
            animalito = await animalito // Espera a que la promesa del animalito se resuelva
            //animalito.should.be.an.instanceOf(Animalito)
            animalito.id.should.be.above(0)             // Sintaxis basada en requisitos
            animalito.id.should.be.a("number")          // Sintaxis basada en requisitos
            animalito.nombre.should.be.equal(nombre)
            animalito.edad.should.be.equal(edad)
            animalito.tipo.should.be.equal(tipo)

            // Validación
            /*
            chai.assert.eventually.isAbove(animalito.id, 0)        // Sintaxis basada en aserciones
            chai.assert.eventually.isNumber(animalito.id)          // Sintaxis basada en aserciones
            chai.assert.eventually.typeOf(animalito.id,"number")   // Sintaxis basada en aserciones

            chai.expect(animalito.id).to.eventually.be.a("number") // Sintaxis basada en expectativas
            chai.expect(animalito.id).to.eventually.be.above(0)    // Sintaxis basada en expectativas

            animalito.id.should.eventually.be.above(0)             // Sintaxis basada en requisitos
            animalito.id.should.eventually.be.a("number")          // Sintaxis basada en requisitos
            animalito.nombre.should.eventually.be.equal(nombre)
            animalito.edad.should.eventually.be.equal(edad)
            animalito.tipo.should.eventually.be.equal(tipo)
            Ese eventually sale de una extensión de chai llamada chai-as-promised
            */

        })
        
    })
    describe('Recuperación de un animalito existente mediante su ID', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        it('Debe devolver un animalito con el ID suministrado y con los datos guays', async () => { // Defino la validación
            let datosDeNuevoAnimalito = new DatosDeNuevoAnimalito(nombre, edad, tipo)
            let animalito = await animalitosService.altaDeAnimalito(datosDeNuevoAnimalito)
            //animalito.should.be.an.instanceOf(Animalito)
            animalito.id.should.be.above(0)             // Sintaxis basada en requisitos
            let animalitoRecuperado = await animalitosService.getAnimalito(animalito.id)
            animalitoRecuperado.id.should.be.equal(animalito.id)          // Sintaxis basada en requisitos
            animalitoRecuperado.nombre.should.be.equal(nombre)
            animalitoRecuperado.edad.should.be.equal(edad)
            animalitoRecuperado.tipo.should.be.equal(tipo)
        })
    })

    describe('Recuperación de un animalito no existente mediante un ID ficticio', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        it('No debe devolver un animalito', async () => { // Defino la validación
            let animalitoRecuperado = await animalitosService.getAnimalito(-50)
            chai.expect(animalitoRecuperado).to.be.undefined
        })
    })

    describe('Recuperación de todos los animalitos', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        it('Debe devolver en cada momento los animalitos existentes', async () => { // Defino la validación
            let animalitosIniciales = await animalitosService.getAnimalitos()
            asegurarQueTodoSonAnimalitosConSusDatosCompletos(animalitosIniciales)
            let tamanoInicial = animalitosIniciales.length
            let nuevoNombre = "Filipo"
            let datosDeNuevoAnimalito = new DatosDeNuevoAnimalito(nuevoNombre, edad, tipo)
            let filipo = await animalitosService.altaDeAnimalito(datosDeNuevoAnimalito)
            let animalitosFinales = await animalitosService.getAnimalitos()
            asegurarQueTodoSonAnimalitosConSusDatosCompletos(animalitosFinales)
            let tamanoFinal = animalitosFinales.length
            tamanoFinal.should.be.equal(tamanoInicial+1)
            let filipoRecuperado = animalitosFinales.find((animalito) => animalito.id == filipo.id)
            chai.expect(filipoRecuperado).to.be.not.undefined
            filipoRecuperado.nombre.should.be.equal(nuevoNombre)
            filipoRecuperado.edad.should.be.equal(edad)
            filipoRecuperado.tipo.should.be.equal(tipo)
        })
    })

} )
