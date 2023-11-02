import sinon from 'sinon';
import { Animalito } from '../Animalito.js';

class AnimalitosBackendFake {

    constructor() {
        this.entorno = sinon.createSandbox(); // Entorno trampeado donde ejecutar mis pruebas
        this.miFakeServer = this.entorno.stub(global, 'fetch');
            // Cuando a partir de ahora, se llame a la función "fetch"... quiero que en lugar de la función original,
            // Se invoque a una nueva que sinon va a crear para mi... y que por defecto, devolverá nada!
        this.animalitos=[]
        this.miFakeServer.withArgs("/animalitos").resolves(this.crearRespuestaHttp(200,this.animalitos))
    }

    cargarAnimalitoDePruebas(animalito){
        this.animalitos.push(animalito)
        this.miFakeServer.withArgs("/animalitos/"+animalito.id).resolves(this.crearRespuestaHttp(200,animalito))
    }

    borrarAnimalitoDePruebas(animalito){
        this.animalitos = this.animalitos.filter((animalitoEnLaLista) => animalitoEnLaLista.id != animalito.id)
        this.miFakeServer.withArgs("/animalitos/"+animalito.id).resolves(this.crearRespuestaHttp(404,undefined))
    }

    modificarAnimalitoDePruebas(animalito){
        this.animalitos = this.animalitos.map((animalitoEnLaLista) => {
            if(animalitoEnLaLista.id == animalito.id){
                return animalito
            } else {
                return animalitoEnLaLista
            }
        })
        this.miFakeServer.withArgs("/animalitos/"+animalito.id).resolves(animalito)
    }

    resetearElEntornoDePruebas(){
        this.entorno.restore()
    }

    crearRespuestaHttp(status, body){
        return new Response(JSON.stringify(body), {
            status: status,
            headers: {
                'Content-type': 'application/json'
            }
        })
    }
    
}

export const ServidorFakeBackend = new AnimalitosBackendFake()
/*
fetch("/animalitos").then((response) => console.log(response))
//fetch("/animalitos/23").then((response) => console.log(response))


let miAnimalito = new Animalito("Pepito", 3, "Perro", 23)
ServidorFakeBackend.cargarAnimalitoDePruebas(miAnimalito)
ServidorFakeBackend.borrarAnimalitoDePruebas(miAnimalito)
fetch("/animalitos/23").then((response) => console.log(response))
*/