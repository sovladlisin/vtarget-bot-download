const fs = require('fs');

const result = async (page,login) => {
    let nameFile = login.slice(0, login.indexOf('@'));
    nameFile += '.cookies.json';
    try {
        if (fs.existsSync('./cookies/' + nameFile)) {
            const cookies = fs.readFileSync('./cookies/' + nameFile, 'utf8');
            const deserializedCookies = JSON.parse(cookies);
            return deserializedCookies;
        }
        else {
            return false
        }
    } catch(err) {
        return false
    }
}

module.exports = result