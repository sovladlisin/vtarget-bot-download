
const result = name => {

    var filename = '';
    name.forEach( function(item) {
        if ((typeof item) !='undefined') {
            if (String(item).indexOf('f.txt') == -1) {
                filename =     String(item);
            }
        }
    });

    filename = filename.substring(filename.indexOf('filename'));
    var re = /filename=/gi;
    filename = filename.replace(re,'');
    re = /"/gi;
    filename = filename.replace(re,'');
    return filename;
};




module.exports = result