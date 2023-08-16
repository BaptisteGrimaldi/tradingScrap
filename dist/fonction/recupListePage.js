"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function recupListePage(page) {
    let listeEntreprisePage = [];
    await page.waitForSelector('table.table.nod.table--values.table--no-auto');
    const tdSelector = 'table.table.nod.table--values.table--no-auto tbody tr td';
    const tdElements = await page.$$(tdSelector);
    if (tdElements.length > 0) {
        for (let i = 0; i < 280; i += 7) {
            const indexTdNomDeLentreprise = tdElements[i];
            const indexTdCourDeEntreprise = tdElements[i + 1];
            try {
                const nomDeLentreprise = await indexTdNomDeLentreprise.evaluate((element) => {
                    if (element.textContent !== null) {
                        return element.textContent.trim();
                    }
                    else {
                        throw new Error();
                    }
                });
                const courDeEntreprise = await indexTdCourDeEntreprise.evaluate((element) => {
                    if (element.textContent !== null) {
                        return element.textContent.trim();
                    }
                    else {
                        throw new Error();
                    }
                });
                if (nomDeLentreprise) {
                    listeEntreprisePage.push({ nomEntreprise: nomDeLentreprise, courEntreprise: courDeEntreprise });
                    // console.log(listeEntreprisePage);
                }
            }
            catch (_a) {
                console.log('arret');
                break;
            }
        }
    }
    //Met sous forme SQL
    // postData(listeEntreprisePage);
    listeEntreprisePage = [];
}
exports.default = recupListePage;
