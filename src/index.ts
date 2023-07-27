// import puppeteer from 'puppeteer';
import puppeteer, { ElementHandle, Frame } from 'puppeteer';
import { createObjectCsvWriter } from 'csv-writer';
import { readFile } from 'fs/promises';
import axios from 'axios';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://www.boursier.com/actions/new-york');

  
  await page.waitForNavigation();

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

  
  let anchorsEntrepriseStart: any[] = [];

  // while (true) {

  // }


  // const entreprise: object = {
  //   entreprise: anchorsEntrepriseStart,
  //   nombreEntreprise: nombreEntreprise,
  // };

  // async function postData() {
  //   const url = 'http://127.0.0.1:3000/entreprise';
  //   const data = entreprise;
  //   try {
  //     const response = await axios.post(url, data, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       console.error('Error:', error.message);
  //     } else {
  //       console.error('Unknown error occurred.');
  //     }
  //   }
  // }
  // postData();

  // https://www.boursier.com/actions/new-york

  // console.log(anchorsEntrepriseStart);

  // await browser.close();
}

run();
