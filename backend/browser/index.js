const puppeteer = require('puppeteer');

const readFile = require('../files/readFile');
const runFunc = require('../otodom/index');

module.exports = async () => {
  const query = await readFile('./backend/files/query.json');

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
