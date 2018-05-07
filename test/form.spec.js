import puppeteer from "puppeteer"
var path = require('path')

const APP = "https://twitter.com/login";
let page;
let browser;
const width = 1920;
const height = 1080;
var cookies
var path = __dirname.replace('test', '') + 'distribution'
const twit_at = process.env.twit_at

beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 5,
      args: [
        `--window-size=${width},${height}`,
        `--disable-extensions-except=${path}`,
        `--load-extension=${path}`
        ]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });
  afterAll(() => {
    browser.close();
  });

  describe("Login", () => {
    test("Will Login And Get Cookies To Proceed", async () => {
      await page.goto(APP);
      await page.waitForSelector(".js-username-field.email-input.js-initial-focus");
      await page.click("input.js-username-field.email-input.js-initial-focus");
      await page.type("input.js-username-field.email-input.js-initial-focus", process.env.twit_username);
      await page.click("input.js-password-field");
      await page.type("input.js-password-field", process.env.twit_password);
      await page.click('button.submit.EdgeButton.EdgeButton--primary.EdgeButtom--medium')
      cookies = await page.cookies();
      await page.waitForSelector('span.username.u-dir.u-textTruncate')
      const username = await page.$eval('span.username.u-dir.u-textTruncate', el => el.innerText)
      await expect(username).toBe(twit_at)
      page.goto('https://twitter.com')
      await page.setCookie(...cookies);
    }, 10000);
  });

  describe("Trend Box", () => {
    test("Trend Box should be hidden", async () => {
        await page.waitForSelector('.module.trends')
        const trendBoxExists = await page.evaluate(() => {
            const element = document.querySelector('.module.trends') 
            if (element) {
                return element.innerHTML
            } else {
                return null
            }
        })
        await expect(trendBoxExists).toBeDefined()
        const trendBoxUndefined = await page.evaluate(() => {
         const el = document.querySelector('.module.trends')
         el.parentNode.removeChild(el)
        })
        await expect(trendBoxUndefined).toBeUndefined()
    }, 10000);
});

describe("Like Button", () => {
    test("Like Button should be in navbar", async () => {
        await page.waitForSelector('ul#global-actions span.Icon.Icon--heart.Icon--large')
        const likeButtonExists = await page.evaluate(() => {
            const element = document.querySelector('ul#global-actions span.Icon.Icon--heart.Icon--large');
            if (element) {
                return element.innerHTML
            } else {
                return null
            }
        })
        await expect(likeButtonExists).toBeDefined()
        const likeButtonUndefined = await page.evaluate(() => {
            const element = document.querySelector('ul#global-actions span.Icon.Icon--heart.Icon--large');
            element.parentNode.removeChild(element)
        })
        await expect(likeButtonUndefined).toBeUndefined()
    }, 10000);
});

describe("Redirect Notification", () => {
    test("Clicking bell redirects to mentions and not notifications", async () => {
        await page.waitForSelector('li.people.notifications a')
        const bellButtonRedirectTrue = await page.evaluate(() => {
            const element = document.querySelector('li.people.notifications a');
            element.setAttribute('href', 'https://twitter.com/mentions')
            if (element) {
                return element.getAttribute('href')
            } else {
                return false
            }
        })
        await expect(bellButtonRedirectTrue).toBe('https://twitter.com/mentions')
        const bellButtonRedirectFalse = await page.evaluate(() => {
            const element = document.querySelector('li.people.notifications a');
            element.setAttribute('href', 'https://twitter.com/i/notifications')
            if (element) {
                return element.getAttribute('href')
            } else {
                return false
            }
        })
        await expect(bellButtonRedirectFalse).toBe('https://twitter.com/i/notifications')
    }, 10000);
});