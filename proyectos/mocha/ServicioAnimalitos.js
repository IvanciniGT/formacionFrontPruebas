export class AnimalitosService {
    getAnimalitos(){    // void ---> Promise<[Animalito]>
        return Promise.resolve([])
    }
    getAnimalito(id){   // number ---> Promise<Animalito>
        return Promise.resolve({})
    }
    altaDeAnimalito(animalito){ // DatosDeNuevoAnimalito ---> Promise<Animalito>
        return Promise.resolve({})
    }
}