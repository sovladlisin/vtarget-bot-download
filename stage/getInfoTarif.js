
const result = async function  getInfoTafif(page) {
    //const grupos = await page.evaluate( () => Array.from( document.querySelectorAll( 'div[class="m_x_27bde"]'  ), element => element.textContent) );
    const grupos = await page.evaluate( () => {
            let pop = document.querySelector('div[data-automation="welcomeCard_Card_CardTitle"]');
            return Array.from( pop.querySelectorAll( 'span'  ), element => element.textContent)
        }

    );

    //Смотрим кол-во скачиваний и остаток дней до конца подписки
    let restOfDays = parseInt(grupos[0].slice(grupos[0].indexOf('with') + 5, grupos[0].indexOf('days')));


    let storage = grupos[0].slice(9, grupos[0].indexOf('downloads'));

    let totalТumberOfDownloads = parseInt(storage.slice(storage.indexOf('/')+2));
    let availableDownloads = parseInt(storage.slice(0,storage.indexOf('/')));


    return {'restOfDays':restOfDays,'availableDownloads':availableDownloads}
}



module.exports = result