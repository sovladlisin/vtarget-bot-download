const readFs = require(__dirname + '/stage/read_fs');
const writeFs = require(__dirname + '/stage/write_fs');
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');


let files = readFs(__dirname + '/downloadExport.txt');
let massive = [];
let massiveFileDelete = [];
files.forEach((item) => {
    let id = item['nameFile'].substr(item['nameFile'].indexOf('_') + 1).substr(0, item['nameFile'].indexOf('.') - item['nameFile'].indexOf('_') - 1);
    massive.push (
        {
            'sh_id' : 'd'+ id,
            'url' : 'http://parser3.soso.ru.com/storage/'+ item['nameFile'],
            'tags' : item['tags']
        });
    massiveFileDelete.push ('/storage/'+ item['nameFile']);
})

//console.log(JSON.stringify(massive));
let urlExport;
massive.forEach((item) => {
    fetch('http://ml.vtargete.ru:14292/api/add_image', {
    method: 'post',
    body:    JSON.stringify(item),
    headers: { 'Content-Type': 'application/json' },
})
    .then(res => res.json())
    .then(json => {

        console.log(json);
        if (json['response'] == 'success') {
            urlExport.push = item['url'];
        }
    });
});

massiveFileDelete.forEach((item) => {
    try {
        if (fs.existsSync(__dirname + item)) {
            fs.unlinkSync(__dirname + item);
        }
    } catch(err) {

    }
})

writeFs([],__dirname + '/downloadExport.txt');
console.log(urlExport);

//console.log(readFs('parser_download.txt'));


