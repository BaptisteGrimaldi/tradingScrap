"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import puppeteer from 'puppeteer';
const puppeteer_1 = require("puppeteer");
async function run() {
    const browser = await puppeteer_1.default.launch({
        executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://www.zonebourse.com/');
    const frame = page.frames()[4];
    if (frame) {
        const spanElements = await frame.$$('span');
        spanElements[2].click();
    }
    //   await browser.close();
}
run();
