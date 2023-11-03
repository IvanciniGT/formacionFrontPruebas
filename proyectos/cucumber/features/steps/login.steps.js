import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import {Builder, By} from 'selenium-webdriver';
import chai from 'chai';
import fs from 'fs';

Before( async function () {
    this.navegador = await new Builder().usingServer("http://54.194.100.251:4444/wd/hub").forBrowser("chrome").build();
});
After( async function () {
    await this.navegador.quit();
});

Given('Dado que tengo un navegador web abierto en la página con url: {string}', async function (url) {
    await this.navegador.get(url);
});

Given('que escribo en el campo con id: {string} el valor: {string}', async function (campoId, valor) {
    await this.navegador.findElement(By.id(campoId)).sendKeys(valor);
});

When('hago click en el botón con id: {string}', async function (botonId) {
    await this.navegador.findElement(By.id(botonId)).click();
});

Then('llego a la página con url: {string}', async function (url) {
    let urlActual = await this.navegador.getCurrentUrl()
    chai.expect(urlActual).to.equal(url);
});

Then('saco una captura de pantalla con nombre: {string}', async function (nombreCaptura) {
    let captura = await this.navegador.takeScreenshot();
    fs.writeFileSync(nombreCaptura+".png", captura, "base64");
});

Then('aparece un elemento con clase: {string}', async function (clase) {
    this.elemento = await this.navegador.findElement(By.className(clase))
    chai.expect(this.elemento).to.be.not.undefined
});

Then('contiene el texto: {string}', async function (texto) {
    let textoEncontrado = await this.elemento.getText()
    chai.expect(textoEncontrado).to.contain(texto);
});
