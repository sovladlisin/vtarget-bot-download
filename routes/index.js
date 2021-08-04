const {Router} = require('express');
const fs = require('fs');
const router = Router();
const readFs = require('../stage/read_fs');
const writeFs = require('../stage/write_fs');
const putfile = require('../stage/putfile');


router.get('/',(req,res) => {
    let ar = [{'a':88}, {'b':90}];
    writeFs(ar, 'test.txt');
    res.json(ar);
});

router.post('/add/',(req,res) => { //добавляем
    var arr =  readFs('url.txt');
    var flag = false;
    arr.forEach(function(item) {
        if (item['login'] ==req.body['login']) {
            flag = true;
        }
    });
    if (flag == false) {
        arr.push(req.body);
        writeFs(arr, 'url.txt');
    }
    res.json(arr);
});

router.post('/update/',(req,res) => { //Делаем update
    var arr = readFs('url.txt');
    var flag = false;
    arr.forEach(function(item) {
        if (item['login'] == req.body['login']) {
            item ['url_download'] = req.body['url_download'];
            item ['password'] = req.body['password'];
            flag = true;
        }
    });
    if (flag == true) {
        writeFs(arr, 'url.txt');
    }
    res.json(arr);
});
router.post('/delete/',(req,res) => { //Делаем update
    var arr = readFs('url.txt');
    var flag = false;
    var newArr = [];
    arr.forEach(function(item) {
        if (item['login'] != req.body['login']) {
            newArr.push(item);
        }
    });
    writeFs(newArr, 'url.txt');
    res.json(arr);
});
router.get('/read/',(req,res) => {
    const arr = readFs('url.txt');
    res.json(arr);

});
router.post('/getdownload/',(req,res) => { //Делаем update
    const arr = readFs('downloadExport.txt');
    res.json(arr);
});
router.post('/putfile/', async (req,res) => { //Делаем update


    const arr = await putfile(req.body['login'],req.body['password'],req.body['url_download']);

        console.log(arr);
    res.json(arr);
});




router.post('/',(req,res) => {

});

module.exports = router;

