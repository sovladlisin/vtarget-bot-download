const readFs = require('../stage/read_fs');
const writeFs = require('../stage/write_fs');


const result = async (massiveFiles,urlDownload) => {
    let downloadList = readFs('download.txt'); //скаченные ссылки
    urlDownload.forEach((item)=> {
        downloadList.push(item);
    });
    writeFs(downloadList,'download.txt');


    let downloadExportList = readFs('downloadExport.txt'); //скаченные объекты
    massiveFiles.forEach((item)=> {
        downloadExportList.push(item);
    });
    writeFs(downloadExportList,'downloadExport.txt');
}


module.exports = result