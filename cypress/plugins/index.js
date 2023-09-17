// cypress/plugins/index.js
/* eslint-disable */

const fs = require("fs");

module.exports = (on, config) => {
    const filesToDelete = []
    on('after:spec', (spec, results) => {
        if (results.stats.failures === 0 && results.video) {
            filesToDelete.push(results.video)
        }
    });
    on('after:run', async () => {
        console.log(
            'Deleting %d videos from successful specs',
            filesToDelete.length
        )
        filesToDelete.forEach(path => {
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Successfully deleted passing test videos' + path)
            })
        });
    });
    on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
            launchOptions.args.push('--window-size=1920,1080');
            return launchOptions
        }
        if (browser.name === 'electron') {
            launchOptions.preferences['width'] = 1920;
            launchOptions.preferences['height'] = 1080;
            return launchOptions
        }
    });
    on('task', {
        log(message) {
            console.log(message)

            return null
        },
    });
    return config;
};
