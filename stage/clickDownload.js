
const result = async page => {
    console.log('smotrim click');


    try {
        await page.waitForSelector('button[data-track-label="downloadSelected"]', {
            visible: true,
            timeout: 30000
        });

        console.log('est ckick')

        await page.click('button[data-track-label="downloadSelected"]');
        return true;
    }
    catch (e) {
        console.log('net clicka')
        return false
    }
    console.log('SLOMALOS');
}

module.exports = result