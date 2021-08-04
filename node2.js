const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const puppeteer = require('puppeteer');
const fs = require('fs');
const authorized = require('./stage/autorized');
const readFs = require('./stage/read_fs');
const writeFs = require('./stage/write_fs');
const getcookies = require('./stage/getcookies');
const getInfoTarif = require('./stage/getInfoTarif');
const getListDowbloadUrl = require('./stage/getListDownloadUrl');
const download = require('./stage/download');
const setDownload = require('./stage/setDownload');

async function getPic(login,password,url) {

    const browser = await puppeteer.launch({
        executablePath: '/usr/local/bin/chrome',
    })

    var date = new Date();
    const day =  (   parseInt(date.getDate()) < 10) ? '0' + date.getDate() : date.getDate();
    const Mounth = (   parseInt(date.getMonth() + 1) < 10) ? '0' + (date.getMonth()+1) : date.getMonth();
    const dates = day + '-' + Mounth + '-' + date.getFullYear();
    console.log(dates);
    const dateStamp = dates + ' '+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    //console.log('Запрос login=' + login + 'дата =' + dateStamp);

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
    let getUrl = 'https://www.shutterstock.com';

    await page.setUserAgent(useragent[Math.floor(Math.random() * useragent.length)]);//выбираем агента браузер

    const cookies = await getcookies(page,login);
    if (cookies != false) {//читаем cookie файл
        await page.setCookie(...cookies);
    };

    await page.goto(getUrl,{
        waitUntil: 'load',
        timeout: 35000
    });
    console.log('Запрос login=' + login + ' успешно');
    await page.screenshot({path: './log_picture/stage1.png',fullPage: true});
    try {//Проверка на авторизацию
        await page.waitForSelector('div[data-automation="welcomeCard_Card_CardTitle"]', {
            visible: true,
            timeout: 4000
        });
        console.log('Авторизован');


        await page.screenshot({path: './log_picture/login.png',fullPage: true});
        let infoTarif = await getInfoTarif(page);
        let availableDownloads = infoTarif.availableDownloads;//Остаток скачиваний

        if (availableDownloads == 0 ) {
            await browser.close();
            return {'error': 'no downloads left'}
        }
        let urlDownload = await getListDowbloadUrl(infoTarif); //получаем список url для скачивания

        await page.screenshot({path: './log_picture/download.png',fullPage: true});
        var currentTIme = date.getTime();
        let massiveFiles = [];
        for (const url of urlDownload) {
            massiveFiles.push(  await download(page,url,dates,currentTIme));
        }

        await setDownload(massiveFiles,urlDownload);//записываем скаченные ссылки

        console.log(massiveFiles);
        console.log(currentTIme);
    }
    catch (e) { //Если не авторизован то авторизуемся
        console.log('нет авторизации');
        await authorized(login,password,page);
    }
    await browser.close();
};

var arr = readFs('url.txt');

var get = [];
var a1=0;
arr.forEach(function(item) {
    a1++;
    get[a1] = new Promise((resolve, reject) => {
        resolve = getPic(item['login'],item['password'],item['url_download']);
    });
});
Promise.all(get).then(values => {
    console.log(values);
});