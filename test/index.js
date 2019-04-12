const puppeteer = require('puppeteer');
const creds = require('../creds.js');
const {expect} = require('chai');
const USERNAME = '#login_field';
const PASSWORD = '#password';
const LOGIN_BTN = 'input.btn.btn-primary.btn-block';
const addContext = require('mochawesome/addContext');




describe('Logs in to the application', function () {
    it('should log in to the application',async()=>{
        let page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('https://github.com');
        await page.screenshot({ path: 'screenshots/github.png' });
        await page.goto('https://github.com/login');
        await page.click(USERNAME);
        await page.keyboard.type(creds.username);

        await page.click(PASSWORD);
        await page.keyboard.type(creds.password);

        await page.click(LOGIN_BTN);

        //await page.waitForNavigation();

        await page.goto("https://github.com/trending");

        await page.waitFor(5 * 1000);

        const data = await page.evaluate(() => {
            const exctactedData = [];
            for (const entry of document.querySelectorAll('ol.repo-list > li')) {
                exctactedData.push(`${
                    entry.querySelector('h3').innerText
                    } has ${
                    entry.querySelector('a[href$="/stargazers"]').innerText.trim()
                    } stars.`);
            }
            return exctactedData.join('\n');
        });

        console.log(`The top repositories are ${data}`);
        await addContext(this, {
            title:"This is title" ,
            value: `{data}`
        });


    });

  
});



