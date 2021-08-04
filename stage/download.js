const clickDownload = require('../stage/clickDownload');
const nameExtraction = require('../stage/nameExtraction');


const result = async  function download(page,url,dates,currentTIme) {

    await page.goto(url,{
        waitUntil: 'load',
        timeout: 15000
    });

    const grupos = await page.evaluate( () => Array.from( document.querySelectorAll( 'a[class="C_b_8978e b_aJ_bb96c oc_ah_0cb7f b_aJ_5d189 oc_ah_5c96c b_aJ_2f1ad oc_v_453f4 b_h_9156a b_h_f4d86 b_h_1a7bb b_h_97f8c b_h_ce5e9 b_h_31b1c b_h_276d2 oc_ah_5c96c b_aJ_2f1ad oc_v_635d8 b_h_695d2"]'  ), element => element.textContent) );
    var tegs = [];
    grupos.forEach(function(item) {
        if ((item !='') && (item !='Показать все')) {
            tegs.push(item);
        }
    });
    await page.screenshot({path: './log_picture/download0.png',fullPage: true});

    if (await clickDownload(page) == false) {
        console.log('note click');
    }
    console.log('click download');
    //первая загрузка
    try {
        await page.waitForSelector('button[data-automation="ImageLicenseDrawer_confirmNow_button"]', {
            visible: true,
            timeout: 15000
        });
        console.log('perehod na modalku')
        try {

            await page.waitForSelector('input[class="o_checkbox_theme_input oc_N_4aa1c b_n_de3dc"]', {
                visible: true,
                timeout: 10000
            });
            console.log("GALOCHKA");
            await page.click('input[class="o_checkbox_theme_input oc_N_4aa1c b_n_de3dc"]');
            await page.screenshot({path: './log_picture/galochka.png',fullPage: true});
        }
        catch (e) {
            console.log("NET GALOCHKA");
        }

        console.log('NOVIY');
        await page.screenshot({path: './log_picture/download3.png',fullPage: true});
        const prom1 = new Promise( (resolve,reject) => {
            let yy = page.on('response', resp => {
                const contentType = resp.headers();

                //filesDowmload.push();
                let item = contentType['content-disposition'];
                let filename = '';
                if ((typeof item) != 'undefined') {
                    if (String(item).indexOf('f.txt') == -1) {
                        filename = String(item);
                    }
                }
                if (filename.length > 0) {
                    filename = filename.substring(filename.indexOf('filename'));
                    var re = /filename=/gi;
                    filename = filename.replace(re,'');
                    re = /"/gi;
                    filename = filename.replace(re,'');
                    console.log('URA');
                    console.log(filename);
                    resolve  (filename);
                    return true;
                }
            });
            // console.log(yy);
        });

        var aga =  await Promise.all([
            page.click('button[data-automation="ImageLicenseDrawer_confirmNow_button"]'),
            // page.waitForNavigation({waitUntil: 'networkidle2'}),
            prom1
        ]);

    }
    catch (e) {
        //console.log(e);
    }
    //Повторная загрузка
    try {
        await page.waitForSelector('button[data-automation="Relicense_downloadImage_button"]', {
            visible: true,
            timeout: 15000
        });
        console.log('perehod na modalku')

        try {
            await page.waitForSelector('input[class="o_checkbox_theme_input oc_N_4aa1c b_n_de3dc"]', {
                visible: true,
                timeout: 10000
            });
            console.log("GALOCHKA");
            await page.click('input[class="o_checkbox_theme_input oc_N_4aa1c b_n_de3dc"]');
            await page.screenshot({path: './log_picture/galochka.png',fullPage: true});
        }
        catch (e) {
            console.log("NET GALOCHKA");
        }
        console.log('UGE KACHALSYA');

        await page.screenshot({path: './log_picture/download4.png',fullPage: true});

        const prom1 = new Promise( (resolve,reject) => {
             let yy = page.on('response', resp => {
                const contentType = resp.headers();

                //filesDowmload.push();
                let item = contentType['content-disposition'];
                let filename = '';
                if ((typeof item) != 'undefined') {
                    if (String(item).indexOf('f.txt') == -1) {
                        filename = String(item);
                    }
                }
                if (filename.length > 0) {
                    filename = filename.substring(filename.indexOf('filename'));
                    var re = /filename=/gi;
                    filename = filename.replace(re,'');
                    re = /"/gi;
                    filename = filename.replace(re,'');
                    console.log('URA');
                    console.log(filename);
                    resolve  (filename);
                    return true;
                }
            });
           // console.log(yy);
        });

        var aga =  await Promise.all([
            page.click('button[data-automation="Relicense_downloadImage_button"]'),
            // page.waitForNavigation({waitUntil: 'networkidle2'}),
            prom1
        ]);



    }
    catch (e) {
        console.log(e);
    }


    await page.screenshot({path: './log_picture/aaaaaa.png',fullPage: true});

    console.log('SUCCESSFULLY DOWNLOAD');

    let namefile = aga[1];

    //let namefile = await nameExtraction(filesDowmload);//получаем название файла
    console.log(namefile );

    return {'tags':tegs,'nameFile':namefile,'dates':dates,'timestamp':currentTIme}

};

module.exports = result