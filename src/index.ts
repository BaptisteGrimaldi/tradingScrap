// import puppeteer from 'puppeteer';
import puppeteer, { ConsoleMessage, ElementHandle, Frame } from 'puppeteer';
import { readFile } from 'fs/promises';
import axios from 'axios';

import recupListePage from './fonction/recupListePage';

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

  await page.waitForTimeout(2000);
  console.log('lance');

  for (const lettre of tabLettre) {
    const entrepriseLettre = await page.waitForSelector(`a[href="?letter=${lettre}"]`);

    if (entrepriseLettre) {
      await entrepriseLettre.click();
      await page.waitForNavigation();

      let numPage = 2;
      while (true) {
        await recupListePage(page);
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
}

run();
