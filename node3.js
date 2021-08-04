const puppeteer = require('puppeteer');
const fs = require('fs');
const readFs = require('./stage/read_fs');
const writeFs = require('./stage/write_fs');
async function getPic(url) {

    const browser = await puppeteer.launch({
        executablePath: '/usr/local/bin/chrome',
    })

    var useragent = [];
    useragent.push('Opera/9.80 (X11, Linux x86_64; U;fr) Presto/2.9.168 Version/11.50');
    useragent.push('Mozilla/5.0 (iPadl CPU 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML,like Gecho) Version/6.0 Modile/10A5355d Safari/8536.25');
    useragent.push('Opera/12.02 (Android 4.1; Linux;Opera Modi/ADR-1111101157; U; en-US Presto/2.0.201 Version/12.02');
    useragent.push('Mozilla/5.0 (Windows NT 6.1;WOW64) ApplwWebKit/537.36 (KHTML, like Gecko) Safari/8536.25');
    const page = await browser.newPage();

    const cookies = fs.readFileSync('./cookies/xopromo.cookies.json', 'utf8');
    const deserializedCookies = JSON.parse(cookies);
    await page.setCookie(...deserializedCookies);


    await page.setViewport({
        width: 1920,
        height: 1080
    })
    await page.setExtraHTTPHeaders(
        {"method": "GET"},
    );

    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: '/usr/www/sergey/parser/storage/'
    });

    await page.setUserAgent(useragent[Math.floor(Math.random() * useragent.length)]);//выбираем агента браузер

    await page.goto('https://www.shutterstock.com/',{
        waitUntil: 'load',
        timeout: 55000
    });

    await page.screenshot({path: './log_picture/node3-2.png', fullPage: true});


    //const grupos = await page.evaluate( () => Array.from( document.querySelectorAll( 'a[data-automation="mosaic-grid-cell-anchor"]'  ), element => element.href) );
    //

    const grupos = await page.evaluate( () => {
        //let pop = document.querySelectorAll('div[data-automation="welcomeCard_Card_CardTitle"]');
        let pop = document.querySelector('div[data-automation="welcomeCard_Card_CardTitle"]');

        return Array.from( pop.querySelectorAll( 'span'  ), element => element.textContent)
    }

        );
    console.log(grupos);
    // let curentDownloadLIst = readFs('parser_download.txt'); //Спарсерный спиок ссылок
    // if (curentDownloadLIst.length<0) {
    //     curentDownloadLIst = grupos;
    // }
    // else {
    //     grupos.forEach((item) => {
    //         if (curentDownloadLIst.indexOf(item) < 0) {
    //             curentDownloadLIst.push(item);
    //         }
    //     });
    // }
    // console.log(curentDownloadLIst.length);
    // writeFs(curentDownloadLIst,'parser_download.txt');

    await browser.close();

}


getPic('https://www.shutterstock.com/ru/search/girl?image_type=photo&page=15');
getPic('https://www.shutterstock.com/ru/search/girl?image_type=photo&page=16');
getPic('https://www.shutterstock.com/ru/search/girl?image_type=photo&page=17');