
import {crearAnimalito} from './AnimalitosMapper.js'
//import "./config.js"
export class AnimalitosService {

    constructor(backend){
        this.backend = backend
    }

    getAnimalitos(){    // void ---> Promise<[Animalito]>
        let promesaADevolver = new Promise((resolve, reject) => {
            fetch(this.backend)
            .then((response) => {
                if(response.status == 200){
                    resolve(response.json()).then((animalitosRecibidos) => {
                        resolve(animalitosRecibidos.map(crearAnimalito)) // Establecer el valor de la promesa que he devuelto
                    })
                } else {
                    reject(response.status) // Establezco que la promesa que he devuelto ha ido mal
                }
            })
        })
        return promesaADevolver
    }

    getAnimalito(id){   // number ---> Promise<Animalito>
        let promesaADevolver = new Promise((resolve, reject) => {
            fetch(`${this.backend}/${id}`)
            .then((response) => {
                if(response.status == 200){
                    resolve(response.json()).then((animalitoRecibido) => {
                        resolve(crearAnimalito(animalitoRecibido)) // Establecer el valor de la promesa que he devuelto
                    })
                } else if(response.status == 404){
                    resolve(undefined) // Establecer el valor de la promesa que he devuelto
                } else {
                    reject(response.status) // Establezco que la promesa que he devuelto ha ido mal
                }
            })
        })
        return promesaADevolver
    }
    async altaDeAnimalito(animalito){ // DatosDeNuevoAnimalito ---> Promise<Animalito>
        let promesaADevolver = new Promise((resolve, reject) => {
            fetch(this.backend, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(animalito)
            }).then((response) => {
                if(response.status == 201){
                    resolve(response.json()).then((animalitoRecibido) => {
                        resolve(crearAnimalito(animalitoRecibido)) // Establecer el valor de la promesa que he devuelto
                    })
                } else {
                    reject(response.status) // Establezco que la promesa que he devuelto ha ido mal
                }
            })
        })
        return promesaADevolver
    }
}