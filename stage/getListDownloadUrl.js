const readFs = require('../stage/read_fs');
const writeFs = require('../stage/write_fs');


const result = async (infoTarif) => {
    let availableDownloads = infoTarif.availableDownloads;//Остаток скачиваний
    let restOfDays = infoTarif.restOfDays;//Остаток дней для тарифа
    let curentDownloadLIst = readFs('parser_download.txt'); //Спарсерный спиок ссылок
    let downloadList = readFs('download.txt'); //скаченные ссылки
    if (restOfDays>2) return []; //если остаток дней больше 1 то выходим

    availableDownloads = 3;

    let count = 0;

    let urlDownload = [];//список ссылок для скачивания
    if (downloadList.length> 0) {
        console.log(downloadList);
        curentDownloadLIst.forEach(function (itemDownload) {
            if ((downloadList.indexOf(itemDownload) == -1 ) && (count < availableDownloads)) {
                count++;
                urlDownload.push(itemDownload);
            }
        })
    }
    else {
        for (let a = 0; a < parseInt(availableDownloads); a++) {
            urlDownload[a] = curentDownloadLIst[a];
        }

    }
    console.log(urlDownload);
    return urlDownload;

}



module.exports = result