import { Given, When, Then, Before } from '@cucumber/cucumber';
import { DatosDeNuevoAnimalito } from '../../DatosDeNuevoAnimalito.js';
import { AnimalitosService } from '../../ServicioAnimalitos.js';
import chai from 'chai';

Before( async function () {
    const URL_BACKEND = "http://localhost:3001/animalitos"
    this.animalitosService = new AnimalitosService(URL_BACKEND)
});

Given('que tengo un servicio de animalitos que trabaja con un backend de prueba', function () {
});

Given('que tengo un nuevo animalito', function () {
    this.nuevoAnimalito= new DatosDeNuevoAnimalito()
});

Given('que ese animalito tiene por {string}: {string}', function (campo, valor) {
    this.nuevoAnimalito[campo]=valor
});

Given('que ese animalito tiene por {string}: {int}', function (campo, valor) {
    this.nuevoAnimalito[campo]=valor
});

When('solicito un alta del animalito', async function () {
    this.animalito = await this.animalitosService.altaDeAnimalito(this.nuevoAnimalito)
});

Then('se devuelve un animalito', function () {
    chai.expect(this.animalito).to.be.not.undefined
});

Then('ese animalito tiene por {string}: {string}', function (campo, valor) {
    chai.expect(this.animalito[campo]).to.be.equal(valor)
});

Then('ese animalito tiene por {string}: {int}', function (campo, valor) {
    chai.expect(this.animalito[campo]).to.be.equal(valor)
});

Then('ese animalito tiene un id válido', function () {
    chai.expect(this.animalito.id).to.be.a('number')
    chai.expect(this.animalito.id).to.be.above(0)
});

Given('recupero el id del animalito', function () {
    this.animalitoId=this.animalito.id
});

When('solicito el animalito con el id anterior', async function () {
    this.animalito = undefined
    this.animalito = await this.animalitosService.getAnimalito(this.animalitoId)
});

Then('ese animalito tiene por id el recuperado anteriormente', function () {
    chai.expect(this.animalito.id).to.be.equal(this.animalitoId)
});

When('solicito el animalito con id: {int}', async function (id) {
    this.animalito = undefined
    this.animalito = await this.animalitosService.getAnimalito(id)
});

Then('se no devuelve un animalito', function () {
    chai.expect(this.animalito).to.be.undefined
});