const puppeteer = require('puppeteer');

const runFunc = require('../otodom/index');
const readQuery = require('../files/readQuery');

module.exports = async () => {
  const query = await readQuery();
  
  if (query) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    await page.goto('https://www.otodom.pl/wynajem/mieszkanie/');
    await runFunc(page, query);
  
    await browser.close();
    
    return true;
  }
  
  console.warn("No query detected.");
  return null;
};
