// import puppeteer from 'puppeteer';
import puppeteer, { ConsoleMessage, ElementHandle, Frame } from 'puppeteer';
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

  await page.goto('https://www.boursier.com/actions/new-york?letter=A');

  const boutonAccepter = await page.waitForSelector('#didomi-notice-agree-button', {
    timeout: 5000,
  });

  if (boutonAccepter) {
    await page.click('#didomi-notice-agree-button');
  } else {
    throw new Error("L'élément avec l'identifiant #didomi-notice-agree-button n'a pas été trouvé.");
  }

  //Y'a un bug sur la lettre X (sa renvoie vers Y) mais url bonne
  const tabLettre: string[] = ['1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];

  type listeEntreprise = {
    nomEntreprise: string;
    cours: string;
  };

  async function recupListePage() {
    await page.waitForSelector('table.table.nod.table--values.table--no-auto');

    const tdSelector = 'table.table.nod.table--values.table--no-auto tbody tr td';

    const tdElements = await page.$$(tdSelector);

    if (tdElements.length > 0) {
      for (let i = 0; i < 280; i += 7) {
        const indexTdNomDeLentreprise = tdElements[i];
        const indexTdCourDeEntreprise = tdElements[i+1]
        try{
          const nomDeLentreprise = await indexTdNomDeLentreprise.evaluate((element) => element.textContent);
          const courDeEntreprise = await indexTdCourDeEntreprise.evaluate((element) => element.textContent);
          console.log(nomDeLentreprise);
          console.log(courDeEntreprise);
        }
        catch{
          console.log("break");
          break;
        }
      }
    }
  }

  await page.waitForTimeout(2000);
  console.log('lance');


  for (const lettre of tabLettre) {
    const entrepriseLettre = await page.waitForSelector(`a[href="?letter=${lettre}"]`);

    if (entrepriseLettre) {
      await entrepriseLettre.click();
      await page.waitForNavigation();

      let numPage = 2;
      while (true) {
        await recupListePage();
        try {
          const pageSuivanteInit = await page.waitForSelector(`a[href="/actions/new-york/${numPage}?letter=${lettre}"]`, { timeout: 500 });
          if (pageSuivanteInit) {
            pageSuivanteInit.click();
            numPage++;
            await page.waitForNavigation();
          }
        } catch {
          try {
            const pageSuivante = await page.waitForSelector(`a[href="/actions/new-york/${numPage}"]`, { timeout: 500 });
            if (pageSuivante) {
              pageSuivante.click();
              numPage++;
              await page.waitForNavigation();
            }
          } catch {
            break;
          }
        }
      }
    }
  }

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
  // setTimeout(() => console.clear(), 5000);
}

run();
