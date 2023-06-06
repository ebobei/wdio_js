/* eslint multiline-comment-style: ["error", "separate-lines"] */
require('dotenv').config();
const ALLURE_PATH = process.env.ALLURE_PATH;
const url = require('./stands');
const testrailUtil = require('wdio-wdiov5testrail-reporter/lib');
const ENV = process.env.ENV;
const version = process.env.RELEASE_VERSION;
if (!ENV || !['release', 'prod', 'stage'].includes(ENV)) {
    console.log('Укажите ссылку на переменную окружения! Перед командой npm run необходимо добавить ENV=prod|release|stage');
    process.exit();
}
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = dd + '.' + mm + '.' + yyyy;

const testrailReporterConfig = ['wdiov5testrail', {
    domain: process.env.TESTRAIL_DOMAIN,
    username: process.env.TESTRAIL_LOGIN,
    password: process.env.TESTRAIL_PASSWORD,
    title: `Automation Regression test | ${(url[process.env.ENV])} | WEB ${version} | Google Chrome desktop | ${today}`,
    projectId: 2,
    includeAll: false,
    useLatestRunId: false,
}];

const config = {
    runner: 'local',
    port: 80,
    path: '/wd/hub',

    specs: [
        './test/specs/**/*.js'
    ],

    suites: {
        regression: [
            './test/specs/regression/desktop/**/*.js'
        ],

        main: [
            './test/specs/regression/desktop/main/*.js'
        ],
    },

    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,

    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        browserVersion: '91.0',
        'goog:chromeOptions': {
            args: [
                'start-maximized'
            ],
        },
        'selenoid:options' : {
        'enableVNC': true,
        'enableVideo': false,
        'screenResolution': '1920x1080'
        }
    }],

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',

    bail: 0,

    baseUrl: url[process.env.ENV],

    waitforTimeout: 15000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 10,

    framework: 'mocha',

    reporters: ['spec',
        ['allure', {
        outputDir: `${ALLURE_PATH}`,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        }],

    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 400000
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function (config, capabilities, specs) {
        testrailUtil.startup();
      },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: () => {
        require('expect-webdriverio');
        global.wdioExpect = global.expect;
        const chai = require('chai');
        global.expect = chai.expect;
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function () {
        const chai = require('chai');
        const chaiWebdriver = require('chai-webdriverio').default;
        chai.use(chaiWebdriver(browser));

        global.assert = chai.assert;
        global.should = chai.should;
        global.expect = chai.expect;
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: function(test) {
        if (test.error !== undefined) {
            browser.saveScreenshot('./test/screenshots');
        }
    },

    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: (exitCode, conf, capabilities, results) => {
        testrailUtil.cleanup(conf);
      },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
};
if (process.argv.slice(2)[2] === 'regression') {
    config.reporters.push(testrailReporterConfig);
}

exports.config = config;