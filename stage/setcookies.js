const fs = require('fs');


const result =  async (page,login) => {
    const cookies = await page.cookies();
    const cookieJson = JSON.stringify(cookies);
    let nameFile = login.slice(0, login.indexOf('@'));
    nameFile += '.cookies.json';
    fs.writeFileSync('./cookies/' + nameFile, cookieJson);


};
module.exports = result