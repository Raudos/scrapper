const puppeteer = require('puppeteer');

const runFunc = require('./otodom/index');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('https://www.otodom.pl/wynajem/mieszkanie/');
  await runFunc(page);

  await browser.close()
})();
