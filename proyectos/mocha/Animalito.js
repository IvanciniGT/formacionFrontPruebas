import {DatosDeNuevoAnimalito} from './DatosDeNuevoAnimalito.js'
export class Animalito extends DatosDeNuevoAnimalito{
    constructor(nombre=undefined, edad=undefined, tipo=undefined, id=undefined){
        super(nombre, edad, tipo)
        this.id = id
    }
}
