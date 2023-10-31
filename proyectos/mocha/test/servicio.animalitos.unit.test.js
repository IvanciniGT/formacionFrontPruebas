import {AnimalitosService} from '../ServicioAnimalitos.js'
import {DatosDeNuevoAnimalito} from '../DatosDeNuevoAnimalito.js'
import chai from "chai"
describe('AnimalitosService', () => { // Esta es la función que debe ejecutarse para probar ese servicio
    // Preparación
    let animalitosService = new AnimalitosService()

    describe('Alta de un animalito con datos guays', () => { // Esta es la función que debe ejecuatse para probar ese servicio
        let nombre = 'Pepito'
        let edad = 3
        let tipo = 'Perro'
        let datosDeNuevoAnimalito = new DatosDeNuevoAnimalito(nombre, edad, tipo)
        // Ejecución
        let animalito = animalitosService.altaDeAnimalito(datosDeNuevoAnimalito)

        it('Debe devolver un animalito con id mayor que cero', () => { // Defino la validación
            // Validación
            chai.assert.eventually.isAbove(animalito.id, 0)        // Sintaxis basada en aserciones
            chai.assert.eventually.isNumber(animalito.id)          // Sintaxis basada en aserciones
            chai.assert.eventually.typeOf(animalito.id,"number")   // Sintaxis basada en aserciones

            chai.expect(animalito.id).to.eventually.be.a("number") // Sintaxis basada en expectativas
            chai.expect(animalito.id).to.eventually.be.above(0)    // Sintaxis basada en expectativas

            chai.should()
            animalito.id.should.eventually.be.above(0)             // Sintaxis basada en requisitos
            animalito.id.should.eventually.be.a("number")          // Sintaxis basada en requisitos
            animalito.nombre.should.eventually.be.equal(nombre)
            animalito.edad.should.eventually.be.equal(edad)
            animalito.tipo.should.eventually.be.equal(tipo)
        })
    })

} )
