const {defineConfig} = require('cypress')
module.exports = defineConfig({
    browser: 'chrome',
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
        reporterEnabled: 'mochawesome',
        mochawesomeReporterOptions: {
            reportDir: 'cypress/reports/mocha',
            quite: true,
            overwrite: false,
            html: false,
            json: true,
        },
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshotOnRunFailure: true,
    video: false,
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents(on, config) {
            require('./cypress/plugins/index.js')(on, config)
        },
        experimentalSessionAndOrigin: true,
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/**/*.spec.ts',
    },
})
