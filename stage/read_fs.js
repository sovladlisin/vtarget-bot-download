
const fs = require('fs');

const result = function read(path) {//Читаем из файла
    let array = []
    try {
        if (fs.existsSync(path)) {
            let fileContent = fs.readFileSync(path);
            if (fileContent.length < 1) {
                fileContent = JSON.stringify([]);
            }
            array = JSON.parse(fileContent);
        }
    } catch(err) {
        console.error(err)
    }
    return array;
}

module.exports = result