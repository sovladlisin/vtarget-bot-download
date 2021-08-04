const {Router} = require('express');
const fs = require('fs');
const router = Router();
const readFs = require('../stage/read_fs');
const writeFs = require('../stage/write_fs');
const putfile = require('../stage/putfile');


router.get('',(req,res) => {
    let ar = [{'a':88}, {'b':90}];
    writeFs(ar, 'test.txt');
    res.json(ar);
});



router.get('/',(req,res) => {
    let ar = [{'a':88}, {'b':90}];
    writeFs(ar, 'test.txt');
    res.json(ar);
});


module.exports = router;
