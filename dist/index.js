"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import puppeteer from 'puppeteer';
const puppeteer_1 = require("puppeteer");
async function run() {
    const browser = await puppeteer_1.default.launch({
        executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://www.zonebourse.com/outils/stock-screener/');
    await page.waitForTimeout(1000);
    const frames = await page.frames();
    const frame = frames[3];
    if (frame) {
        const spanElements = await frame.$$('span');
        await spanElements[2].click();
    }
    const element = await page.$('#mTopT1');
    if (element) {
        await element.click();
    }
    else {
        console.log('element de connexion pas trouvé');
    }
    const inputMail = await page.$('input[name="login"]');
    const inputMailPassord = await page.$('input[name="password"]');
    if (inputMail && inputMailPassord) {
        await inputMail.type('grimaldi.baptiste@gmail.com');
        await inputMailPassord.type('Crapulo2001*');
    }
    else {
        console.log("l'input mail n'a pas été trouvé");
    }
    await page.waitForTimeout(1000);
    const inputElement = await page.$('input.hlSubmit.btn_inscription');
    if (inputElement) {
        await inputElement.click();
    }
    else {
        console.log("le bouton valider n'a pas été trouvé");
    }
    await page.waitForTimeout(2000);
    const scrollPosition = 500; // Position de défilement en pixels
    await page.evaluate((scrollPosition) => {
        window.scrollTo(0, scrollPosition);
    }, scrollPosition);
    await page.evaluate(() => {
        document.addEventListener('mousemove', (event) => {
            const { clientX, clientY } = event;
            console.log(`Coordonnées de la souris : X=${clientX}, Y=${clientY}`);
        });
    });
    await page.mouse.click(532, 523);
    await page.waitForTimeout(1000);
    await page.mouse.click(580, 521);
    const selectCountry = await page.$('#selCountry');
    selectCountry === null || selectCountry === void 0 ? void 0 : selectCountry.click();
    await page.waitForTimeout(1000);
    const deselectEurope = await page.$('#country_3');
    deselectEurope === null || deselectEurope === void 0 ? void 0 : deselectEurope.click();
    await page.waitForTimeout(1000);
    await page.click('label[for="exp8"]');
    await page.waitForTimeout(1000);
    await page.click('label[for="country_12"]');
    await page.waitForTimeout(1000);
    let anchorsEntrepriseStart = await page.$$eval('tbody a', (elements) => elements.map((el) => el.textContent).slice(1, -4));
    while (true) {
        const suivant = await page.$('a[title="Page suivante"]');
        const precedent = await page.$('a[title="Page précédente"]');
        if (suivant) {
            if (precedent) {
                const anchorsEntreprise = await page.$$eval('tbody a', (elements) => elements.map((el) => el.textContent).slice(1, -5));
                anchorsEntrepriseStart = anchorsEntrepriseStart.concat(anchorsEntreprise);
                // await page.waitForTimeout(1000);
                await suivant.click();
                await page.waitForNavigation();
            }
            else {
                const anchorsEntreprise = await page.$$eval('tbody a', (elements) => elements.map((el) => el.textContent).slice(1, -4));
                anchorsEntrepriseStart = anchorsEntrepriseStart.concat(anchorsEntreprise);
                // await page.waitForTimeout(1000);
                await suivant.click();
                await page.waitForNavigation();
            }
        }
        else {
            const anchorsEntreprise = await page.$$eval('tbody a', (elements) => elements.map((el) => el.textContent).slice(1, -4));
            anchorsEntrepriseStart = anchorsEntrepriseStart.concat(anchorsEntreprise);
            break;
        }
    }
    fetch('http://127.0.0.1:3000/entreprise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // body : JSON.stringify(formu)
    });
    console.log(anchorsEntrepriseStart);
    // await browser.close();
}
run();
