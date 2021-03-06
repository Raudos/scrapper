const $ = require('cheerio');
const OtodomConfig = require('./otodom.config');

async function navigateSearchUI(page, query) {
  await OtodomConfig.openCityInput(page);
  await OtodomConfig.enterCityName(query.city, page);
  await page.waitFor(1000);
  await OtodomConfig.selectHighlightedCity(page);

  await OtodomConfig.togglePriceFromInput(page);
  await OtodomConfig.enterToggledInputValue(query.price_from, page);

  await OtodomConfig.togglePriceToInput(page);
  await OtodomConfig.enterToggledInputValue(query.price_to, page);

  await OtodomConfig.toggleMetersFromInput(page);
  await OtodomConfig.enterToggledInputValue(query.area_from, page);

  await OtodomConfig.toggleMetersToInput(page);
  await OtodomConfig.enterToggledInputValue(query.area_to, page);

  if (query.rooms) {
    await OtodomConfig.toggleRoomsInput(page);
    await OtodomConfig.selectNumberOfRooms(query.rooms, page);
  }

  await OtodomConfig.sendQuery(page);
}

async function getOffers(page, offers = [], currentPage = 0) {
  await page.waitFor(2000);
  let bodyHTML = await page.evaluate(() => document.body.innerHTML);

  $('.offer-item', bodyHTML).each(function() {
    offers.push({
      name: $('.offer-item-header .offer-item-title', this).text(),
      location_short: $('.offer-item-header > p.text-nowrap', this).text(),
      rooms: $('.offer-item-details .offer-item-rooms', this).text().replace(/ /g,'').replace(/\n/g,'').replace('pokój', ''),
      area: $('.offer-item-details .offer-item-area', this).text().replace(/ /g,'').replace(/\n/g,''),
      price: $('.offer-item-details .offer-item-price', this).text().replace(/ /g,'').replace(/\n/g,''),
      offerOwner: $('.offer-item-details-bottom > ul > li', this).text().replace(/ /g,'').replace(/\n/g,''),
      offerLink: $('.offer-item-image a', this).attr('href'),
      imageLink: $('.offer-item-image .img-cover', this).attr('style').match(/\(([^)]+)\)/)[1],
      type: 'otodom'
    });
  });

  const nextPageSelector = '#pagerForm .pager-next a[data-dir="next"]';
  const hasNextPage = $(nextPageSelector, bodyHTML)[0];

  if (hasNextPage && currentPage < 1) {
    await page.click(nextPageSelector);
    await page.waitFor(2000);

    await getOffers(page, offers, currentPage + 1);
    return;
  }

  return offers;
}

module.exports = async (browser, query) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.otodom.pl/wynajem/mieszkanie/');

  await page.waitForSelector('#mainTopSearch .location-selector #search-location');

  await navigateSearchUI(page, query);
  return await getOffers(page);
};
