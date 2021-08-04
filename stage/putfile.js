const puppeteer = require('puppeteer');
const authorized = require('../stage/autorized');
const readFs = require('../stage/read_fs');
const writeFs = require('../stage/write_fs');
const getcookies = require('../stage/getcookies');
const getInfoTarif = require('../stage/getInfoTarif');
const download = require('../stage/download');


const result = async function putfile(login,password,url) {
    var date = new Date();
    const day =  (   parseInt(date.getDate()) < 10) ? '0' + date.getDate() : date.getDate();
    const Mounth = (   parseInt(date.getMonth() + 1) < 10) ? '0' + (date.getMonth()+1) : date.getMonth();
    const dates = day + '-' + Mounth + '-' + date.getFullYear();

    const browser = await puppeteer.launch({
        executablePath: '/usr/local/bin/chrome',
    })
    console.log('START: ' + dates);


    var useragent = [];
    useragent.push('Opera/9.80 (X11, Linux x86_64; U;fr) Presto/2.9.168 Version/11.50');
    useragent.push('Mozilla/5.0 (iPadl CPU 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML,like Gecho) Version/6.0 Modile/10A5355d Safari/8536.25');
    useragent.push('Opera/12.02 (Android 4.1; Linux;Opera Modi/ADR-1111101157; U; en-US Presto/2.0.201 Version/12.02');
    useragent.push('Mozilla/5.0 (Windows NT 6.1;WOW64) ApplwWebKit/537.36 (KHTML, like Gecko) Safari/8536.25');

    const page = await browser.newPage();

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
    let getUrl = 'https://www.shutterstock.com/en/';

    await page.setUserAgent(useragent[Math.floor(Math.random() * useragent.length)]);//выбираем агента браузер
    console.log('START4: ');
    const cookies = await getcookies(page,login);
    if (cookies != false) {//читаем cookie файл
        await page.setCookie(...cookies);
    };
    console.log('START5: ');
    await page.goto(getUrl,{
        waitUntil: 'load',
        timeout: 40000
    });
    
    console.log('GO TO URL:' + getUrl);
    await page.screenshot({path: './log_picture/stage1.png',fullPage: true});

    try {                                                                                       //Проверка на авторизацию
        await page.waitForSelector('div[data-automation="welcomeCard_Card_CardTitle"]', {
            visible: true,
            timeout: 4000
        });
        console.log('AUTORIZED sucess:');

        //await page.screenshot({path: './log_picture/login-true.png',fullPage: true});
        console.log('count remainder downloads');
        let infoTarif = await getInfoTarif(page);//Смотрм остаток скачиваний
        console.log('TARIF = ');
        console.log(infoTarif);
        var currentTIme = date.getTime();

        console.log(infoTarif['availableDownloads']);

        let requestArray = {};
        if (parseInt(infoTarif['availableDownloads']) > 0) {
            console.log('go url');
            let massive = await download(page,url,dates,currentTIme)
             requestArray = {
                'file': 'http://parser3.soso.ru.com/storage/' + massive['nameFile'],
                'tags': massive['tags'],
                'rest_of_days' :infoTarif['restOfDays'],
                'available_downloads': infoTarif['availableDownloads']
            };
        }
        else {
            console.log('availableDownloads = 0 ');
             requestArray = {
                'error': 'availableDownloads = 0',
                'tags': null,
                'rest_of_days' :infoTarif['restOfDays'],
                'available_downloads': infoTarif['availableDownloads']
            };
        }


        console.log('END');





        console.log(infoTarif);
        await browser.close();
        return requestArray
    }
    catch (e) { //Если не авторизован то авторизуемся
        console.log('NOT AUTORIZED');
        let authorizedFlag = await authorized(login,password,page);
        await page.screenshot({path: './log_picture/login-true.png',fullPage: true});
        let requestArray = {};
        if (authorizedFlag == true) {


            let infoTarif = await getInfoTarif(page);//Смотрм остаток скачиваний
            console.log(infoTarif);
            var currentTIme = date.getTime();




            //console.log(massive);
            if (infoTarif['availableDownloads'] > 0) {
                console.log('go url');
                let massive = await download(page,url,dates,currentTIme)
                 requestArray = {
                    'file': 'http://parser3.soso.ru.com/storage/' + massive['nameFile'],
                    'tags': massive['tags'],
                    'rest_of_days' :infoTarif['restOfDays'],
                    'available_downloads': infoTarif['availableDownloads']
                };
            }
            else {
                 requestArray = {
                    'error': 'availableDownloads = 0',
                    'tags': massive['tags'],
                    'rest_of_days' :infoTarif['restOfDays'],
                    'available_downloads': infoTarif['availableDownloads']
                };
            }
            await browser.close();
            return requestArray
        }


        await browser.close();

        return {'autorized': false}
    }


}


module.exports = result;