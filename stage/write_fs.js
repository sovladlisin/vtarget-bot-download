const fs = require('fs');

const result = function write(array, path) { //пишем в файл
    try {
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
            fs.writeFileSync(path, JSON.stringify(array));
            return true
        }
        else {
            fs.writeFileSync(path, JSON.stringify(array));
            return true
        }
    } catch(err) {
        fs.writeFileSync(path, JSON.stringify(array));
        return true;
    }
}


module.exports = result