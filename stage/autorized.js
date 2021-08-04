const fs = require('fs');
const setcookies = require('../stage/setcookies');

const result = async function authorized(login,password,page) {
    await page.screenshot({path: './log_picture/authorized0.png',fullPage: true});
    await page.click('button[data-track-label="logIn"]');
    try {

        await page.waitForSelector('input[name="email"]', {
            visible: true,
            timeout: 800
        });

        console.log('PUSH BUTTON AUTORIZED');
        await page.screenshot({path: './log_picture/authorized1.png',fullPage: true});
        await page.focus('input[name="email"]');
        await page.keyboard.type(login);
        await page.focus('input[name="password"]');
        await page.keyboard.type(password);
        await page.screenshot({path: './log_picture/authorized2.png',fullPage: true});
        await page.click('button[data-automation="LoginForm_continue_button"]');

        try {
            await page.waitForSelector('div[data-automation="welcomeCard_Card_CardTitle"]', {
                visible: true,
                timeout: 10000
            });
            // await page.waitForSelector('div[class="m_u_27bde"]', {
            //     visible: true,
            //     timeout: 15000
            // });
            console.log('третий этап');


            setcookies(page,login);//устанавливаем cookies

            await page.screenshot({path: './log_picture/authorized3.png',fullPage: true});
            return true;


        }
        catch (e) {
            await page.screenshot({path: './log_picture/authorized-error1.png',fullPage: true});
            return false;
        }

    }
    catch (e) {
        await page.screenshot({path: './log_picture/authorized-error2.png',fullPage: true});
        return false;
    }




}



module.exports = result