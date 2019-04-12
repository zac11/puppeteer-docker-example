const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

// puppeteer options
const opts = {
    headless: false,
    slowMo: 100,
    timeout: 50000,
    args: ['--start-fullscreen']
};

// expose variables
before(async function () {
    
    global.expect = expect;
    global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after(function () {
    browser.close();

    global.browser = globalVariables.browser;
    global.expect = globalVariables.expect;
});