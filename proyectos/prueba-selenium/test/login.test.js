import {Builder, By} from 'selenium-webdriver';
import chai from 'chai';
import fs from 'fs';


describe("Probar que mi formulario de login funciona bien",function() {

    async function captura( nombre) {
        const captura = await navegador.takeScreenshot();
        fs.writeFileSync(nombre+".png", captura, "base64");
    
    }

    let navegador;
    this.timeout(30000)// amplio el tiempo de mocha para que dé tiempo a ejecutar los scripts de selenium


    beforeEach(async () => {
        // Conectarnos con un nuevo navegador
        //navegador = await new Builder().forBrowser("chrome").build();
        navegador = await new Builder().usingServer("http://52.51.33.227:4444/wd/hub").forBrowser("chrome").build();
    });
    afterEach(async () => {
        // Cerrar el navegador
        await navegador.quit();
    });
    it("Acceder a wikipedia", async () => {
        // Lo primero, acceder a la página web
        await navegador.get("https://wikipedia.es/");

        console.log("Accedemos a google:" + await navegador.getTitle());
    });


    it("Se puede hacer login cuando los datos son correctos", async () => {
        // Lo primero, acceder a la página web
        await navegador.get("https://katalon-demo-cura.herokuapp.com/");
        // Podría fijar un determinado tamaño de ventana
        await navegador.manage().window().setRect({width:2048, height:1024});
        // Llegados a este punto, el código va a ser: Buscar elemento, interactuar con él
        // Apretar en el botón MAKE APPOINTMENT -> a[btn-make-appointment]
        await navegador.findElement(By.id("btn-make-appointment")).click();
        // John Doe -> input[txt-username]
        await navegador.findElement(By.id("txt-username")).sendKeys("John Doe");
        // ThisIsNotAPassword -> input[txt-password]
        await navegador.findElement(By.id("txt-password")).sendKeys("ThisIsNotAPassword");
        // Hacer click en el botón de login: button[btn-login]
        await captura("datos_guays_antes")
        await navegador.findElement(By.id("btn-login")).click();
        // Debo llegar a la ruta: https://katalon-demo-cura.herokuapp.com/#appointment
        let urlActual = await navegador.getCurrentUrl()
        // Y hasta aquí llega WEBDRIVER

        // AHORA VIENE LA PRUEBA vvvvv
        chai.expect(urlActual).to.equal("https://katalon-demo-cura.herokuapp.com/#appointment");
        await captura("datos_guays_despues")
    });


    it("No se puede hacer login cuando los datos son incorrectos", async () => {
        // Lo primero, acceder a la página web
        await navegador.get("https://katalon-demo-cura.herokuapp.com/");
        // Podría fijar un determinado tamaño de ventana
        await navegador.manage().window().setRect({width:2048, height:1024});

//        await navegador.manage().window().setSize(2048, 2048);

        // Llegados a este punto, el código va a ser: Buscar elemento, interactuar con él
        // Apretar en el botón MAKE APPOINTMENT -> a[btn-make-appointment]
        await navegador.findElement(By.id("btn-make-appointment")).click();
        // John Doe -> input[txt-username]
        await navegador.findElement(By.id("txt-username")).sendKeys("Federico");
        // ThisIsNotAPassword -> input[txt-password]
        await navegador.findElement(By.id("txt-password")).sendKeys("ThisIsNotAPassword");
        // Hacer click en el botón de login: button[btn-login]
        await captura("datos_ruina_antes")
        await navegador.findElement(By.id("btn-login")).click();
        // Debo llegar a la ruta: https://katalon-demo-cura.herokuapp.com/#appointment
        let textoFallo = await navegador.findElement(By.css(".text-danger")).getText()
        // XPATH
        textoFallo = await navegador.findElement(By.xpath("//section[@id='login']//p[contains(text(),'failed')]")).getText()

        chai.expect(textoFallo).to.equal("Login failed! Please ensure the username and password are valid.");
        await captura("datos_ruina_despues")

    });
    // Dejar los campos en blanco
    // Dejar el campo de usuario en blanco
    // Dejar el campo de contraseña en blanco
    // Usuario OK con contraseña NOK
    // Usuario NOK con contraseña OK

});