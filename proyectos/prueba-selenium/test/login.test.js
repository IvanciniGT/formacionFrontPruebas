import {Builder, By} from 'selenium-webdriver';
import chai from 'chai';

describe("Probar que mi formulario de login funciona bien", () => {

    let navegador;

    beforeEach(async () => {
        // Conectarnos con un nuevo navegador
        navegador = await new Builder().forBrowser("chrome").build();
    });
    afterEach(async () => {
        // Cerrar el navegador
        await navegador.quit();
    });

    it("Se puede hacer login cuando los datos son correctos", async () => {
        // Lo primero, acceder a la página web
        await navegador.get("https://katalon-demo-cura.herokuapp.com/");
        // Podría fijar un determinado tamaño de ventana
        await navegador.manage().window().setSize(1024, 768);

        // Llegados a este punto, el código va a ser: Buscar elemento, interactuar con él
        // Apretar en el botón MAKE APPOINTMENT -> a[btn-make-appointment]
        await navegador.findElement(By.id("btn-make-appointment")).click();
        // John Doe -> input[txt-username]
        await navegador.findElement(By.id("txt-username")).sendKeys("John Doe");
        // ThisIsNotAPassword -> input[txt-password]
        await navegador.findElement(By.id("txt-password")).sendKeys("ThisIsNotAPassword");
        // Hacer click en el botón de login: button[btn-login]
        await navegador.findElement(By.id("btn-login")).click();
        // Debo llegar a la ruta: https://katalon-demo-cura.herokuapp.com/#appointment
        let urlActual = await navegador.getCurrentUrl()
        // Y hasta aquí llega WEBDRIVER

        // AHORA VIENE LA PRUEBA vvvvv
        chai.expect(urlActual).to.equal("https://katalon-demo-cura.herokuapp.com/#appointment");
    });


    it("No se puede hacer login cuando los datos son incorrectos", () => {});
    

});