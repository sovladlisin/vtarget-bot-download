const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const puppeteer = require('puppeteer');
const fs = require('fs');

http.createServer((request, response) => {
  console.log('server work');
  if (request.method == 'GET') {
    // GET -> получить обработать


    console.log(`Запрошенный адрес: ${request.url}`);

    const filePath = request.url.substr(1);
    console.log(` ${filePath}`);
    fs.readFile(filePath, function(error, data){

      if(error){

        response.statusCode = 404;
        response.end("Resourse not found!");
      }
      else{
        response.end(data);
      }
    });


    // fs.access(filePath, fs.constants.R_OK, err => {
    //   // если произошла ошибка - отправляем статусный код 404
    //   if(err){
    //     response.statusCode = 404;
    //     response.end("Resourse not found!");
    //   }
    //   else{
    //     fs.createReadStream(filePath).pipe(response);
    //   }
    // });

    // console.log(request.method); // !!!!
    // let urlRequest = url.parse(request.url, true);
    // // console.log(urlRequest);
    // console.log(urlRequest.query.test); // ! GET Params
    // if (urlRequest.query.test % 2 == 0) {
    //   response.end('even');
    // }
    //response.end('odd');
  }
  else {
    // POST
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      console.log(body);
      let params = parse(body);
      console.log(params);
      console.log(params.hi);
      //response.send(`${params.usr_download} `);
      //response.send('ddd6');
      //response.end(params.url_download);
      if ((typeof  params.login == 'undefined') && (typeof  params.password == 'undefined')){
        let requestArray = {
          'error': 'empty',
          };
        let requet = JSON.stringify(requestArray);

        response.end(requet);
        return false;
      }


      (async () => {
        const browser = await puppeteer.launch({
          executablePath: '/usr/local/bin/chrome',
        });
        var useragent=[];
        useragent.push('Opera/9.80 (X11, Linux x86_64; U;fr) Presto/2.9.168 Version/11.50');
        useragent.push('Mozilla/5.0 (iPadl CPU 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML,like Gecho) Version/6.0 Modile/10A5355d Safari/8536.25');
        useragent.push('Opera/12.02 (Android 4.1; Linux;Opera Modi/ADR-1111101157; U; en-US Presto/2.0.201 Version/12.02' );
        useragent.push('Mozilla/5.0 (Windows NT 6.1;WOW64) ApplwWebKit/537.36 (KHTML, like Gecko) Safari/8536.25');

        var system = require('system');
        //var path = '/usr/www/varlone/api.jazzcinema.ru/www/test5/poster.html';
        //var fs = require('fs');


        const page = await browser.newPage();
        await page.setExtraHTTPHeaders(
            {"method" : "GET"},
        );
        await page._client.send('Page.setDownloadBehavior', {behavior: 'allow',
          downloadPath: '/usr/www/varlone/parser/storage/'});
        await page.setUserAgent(useragent[Math.floor(Math.random()*useragent.length)]);//выбираем агента браузер
        var filesDowmload = [];
        //console.log(process.argv);
        //await page.goto(process.argv[2]);
        await page.goto(params.url_download,{ waitUntil: 'networkidle2' });



        const grupos = await page.evaluate( () => Array.from( document.querySelectorAll( 'a[class="C_b_8978e b_aJ_bb96c oc_ah_0cb7f b_aJ_5d189 oc_ah_5c96c b_aJ_2f1ad oc_v_453f4 b_h_9156a b_h_f4d86 b_h_1a7bb b_h_97f8c b_h_ce5e9 b_h_31b1c b_h_276d2 oc_ah_5c96c b_aJ_2f1ad oc_v_635d8 b_h_695d2"]'  ), element => element.textContent) );
        var tegs = [];
        grupos.forEach(function(item) {
          if ((item !='') && (item !='Показать все')) {
            tegs.push(item);
          }
        });
        console.log(tegs);

        const html = await page.content();
        await new Promise(r => setTimeout(r, 6000));
        await page.waitFor(6000);


        await page.click('button[data-automation="login_free_trial"]');
        await page.waitFor(6000);


        await new Promise(r => setTimeout(r, 6000));
        await page.waitFor(6000);




        try {
          page.waitForSelector('input[name="email"]');

          //набираем плогин и пароль и нажимаем ок
          await page.waitFor('input[name="email"]');
          await page.focus('input[name="email"]');
          //await page.keyboard.type('shadow_mag@mail.ru');
          //await page.keyboard.type('xopromo@mail.ru');
          await page.keyboard.type(params.login);
          //
          await page.waitFor('input[name="password"]');
          await page.focus('input[name="password"]');
          //await page.keyboard.type('zyjxrf208');
          //await page.keyboard.type('xopromo77');
          await page.keyboard.type(params.password);
          await page.click('button[data-automation="LoginForm_continue_button"]');
          await page.screenshot({path: 'google1.png'});
          await page.waitFor(6000);
          try { //если авторизация прошла
            //page.waitForSelector('button[data-automation="ActivationButton_Загрузить_button"]');
            page.waitForSelector('button[data-track-label="downloadSelected"]');



            //await page.click('button[data-automation="ActivationButton_Загрузить_button"]');
            await page.click('button[data-track-label="downloadSelected"]');
            await page.setViewport({width: 1200, height: 5000});
            await page.screenshot({path: 'google2.png'});
            await page.waitFor(6000);

            try { //если есть кнопка загрузить
              const example_function = value => {
                console.log(value);
              };
              //await page.waitForSelector('button[data-automation="Relicense_downloadImage_button"]');
              await page.waitForSelector('button[data-automation="ImageLicenseDrawer_confirmNow_button"]');

              await page.waitFor(6000);
              await page.setViewport({width: 1200, height: 5000});
              await page.screenshot({path: 'google3.png'});
              await page.click('button[data-automation="ImageLicenseDrawer_confirmNow_button"]');

              await page.on('response', resp  => {

                const contentType = resp.headers();

                filesDowmload.push(contentType['content-disposition']);
                // if (/* URL and/or contentType matches pattern */) {
                //     const fileName = path.basename(r.request().url());
                //     // handle and rename file name (after making sure it's downloaded)
                // }
              });

              await page.waitFor(6000);
              await page.waitFor(6000);

              console.log('AFA');

            }
            catch(error)  {





            }
            try {
              await page.waitForSelector('button[data-automation="Relicense_downloadImage_button"]');

              await page.waitFor(6000);
              await page.setViewport({width: 1200, height: 5000});
              await page.screenshot({path: 'google4.png'});
              await page.click('button[data-automation="Relicense_downloadImage_button"]');

              await page.on('response', resp  => {

                const contentType = resp.headers();

                filesDowmload.push(contentType['content-disposition']);
                // if (/* URL and/or contentType matches pattern */) {
                //     const fileName = path.basename(r.request().url());
                //     // handle and rename file name (after making sure it's downloaded)
                // }
              });

              await page.waitFor(6000);
              await page.waitFor(6000);

              console.log('AFA');
            }
            catch (error) {

            }



          } catch(error) {
            // do as you wish with this error and then do your next actions

            // await page.setViewport({width: 1000, height: 5000});
            // await page.click('button[data-automation="heroActions_try"]');
            // await page.waitFor(6000);
            // await page.screenshot({path: 'google2.png'});

          }

        }
        catch(error) {
          let requestArray = {
            'error' : 'not file',
            'tags' : tegs
          };
          let requet = JSON.stringify(requestArray)
          response.end(requet);



        }
        var filename = '';
        filesDowmload.forEach( function(item) {
          if ((typeof item) !='undefined') {
            filename =     String(item);
          }
        });

        filename = filename.substring(filename.indexOf('filename'));
        var re = /filename=/gi;
        filename = filename.replace(re,'');
        re = /"/gi;
        filename = filename.replace(re,'');

        console.log(filename);
        let requestArray = {}
        if (filename.length < 1) {
           requestArray = {
            'error': 'not file',
            'tags': tegs
          };
        } else {
          filename = 'http://parser.soso.ru.com/storage/' + filename;
          requestArray = {
            'file': filename,
            'tags': tegs
          };
        }

        let requet = JSON.stringify(requestArray);
        response.end(requet);
        //тыкаем скачать




        //await page.click('button[data-automation="ActivationButton_Загрузить_button"]');







        //fs.writeFile(path, html, _ => console.log('HTML saved'));


        await browser.close()
      })();









    });
  }

}).listen(3000);