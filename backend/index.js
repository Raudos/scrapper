const puppeteer = require('puppeteer');

const runFunc = require('./otodom/index');
const readQuery = require('./files/readQuery');

(async () => {
  const query = await readQuery();
  
  if (query) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
  
    await page.goto('https://www.otodom.pl/wynajem/mieszkanie/');
    await runFunc(page, query);
  
    return await browser.close();
  }
  
  console.warn("No query detected.");
})();
