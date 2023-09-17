const cypress = require('cypress');
const fs_extra = require('fs-extra');
const {merge} = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

const reportDir = `./results/openmage/reports`;

const mochawesome_options = {
    'timestamp': false,
    'reportDir': reportDir,
    'overwrite': false,
    'html': false,
    'json': true
};

const cypress_options = {
    browser: 'chrome',
    config: {
        reporter: 'cypress-multi-reporters',
        reporterOptions: {
            reporterEnabled: 'mochawesome',
            mochawesomeReporterOptions: {
                reportDir: reportDir,
                quite: true,
                overwrite: false,
                html: false,
                json: true,
            },
        },
        viewportWidth: 1920,
        viewportHeight: 1080,
        screenshotOnRunFailure: true,
        screenshotsFolder: `cypress/screenshots/`,
        video: true,
        videoCompression: false,
        chromeWebSecurity: false,
        e2e: {
            specPattern: `cypress/e2e/ui/specs/**/*.spec.ts`,
        },
    },
    env: {
        baseUrl: process.env.baseUrl,
        store: process.env.store,
        project: "openmage",

        screenshotsFolder: `./cypress/screenshots/snapshots/actual`,
        trashAssetsBeforeRuns: false,
        video: false,
    },
};

const optionDefinitions = [
    { name: 'run', alias: 'r', type: Boolean },
    { name: 'open', alias: 'o', type: Boolean },
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)

async function runTests() {
    try {
        await fs_extra.emptyDir(reportDir);
        if (options.run) {
            await cypress.run(cypress_options);
            const jsonReport = await merge({files: [reportDir + '/*.json']});
            await generator.create(jsonReport, mochawesome_options);
        } else if (options.open) {
            await cypress.open(cypress_options);
        }
    } catch (error) {
        console.error(error);
    } finally {
        process.exit(0);
    }
}

runTests();
