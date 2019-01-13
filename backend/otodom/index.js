const $ = require('cheerio');
const OtodomConfig = require('./otodom.config');
const fileManager = require('../saveJson');

async function navigateSearchUI(page) {
  await OtodomConfig.openCityInput(page);
  await OtodomConfig.enterCityName('Warszawa', page);
  await page.waitFor(1000);
  await OtodomConfig.selectHighlightedCity(page);
  
  await OtodomConfig.togglePriceFromInput(page);
  await OtodomConfig.enterToggledInputValue('600', page);
  
  await OtodomConfig.togglePriceToInput(page);
  await OtodomConfig.enterToggledInputValue('2800', page);
  
  await OtodomConfig.toggleMetersFromInput(page);
  await OtodomConfig.enterToggledInputValue('20', page);
  
  await OtodomConfig.toggleMetersToInput(page);
  await OtodomConfig.enterToggledInputValue('30', page);
  
  await OtodomConfig.toggleRoomsInput(page);
  await OtodomConfig.selectNumberOfRooms(1, page);
  
  await OtodomConfig.sendQuery(page);
}

async function getOffers(page, update = false, currentPage = 0) {
  await page.waitFor(2000);
  let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  
  const offers = [];
  $('.offer-item', bodyHTML).each(function() {
    offers.push({
      name: $('.offer-item-header .offer-item-title', this).text(),
      location_short: $('.offer-item-header > p.text-nowrap', this).text(),
      rooms: $('.offer-item-details .offer-item-rooms', this).text().replace(/ /g,'').replace(/\n/g,'').replace('pokój', ''),
      area: $('.offer-item-details .offer-item-area', this).text().replace(/ /g,'').replace(/\n/g,''),
      price: $('.offer-item-details .offer-item-price', this).text().replace(/ /g,'').replace(/\n/g,''),
      offerOwner: $('.offer-item-details-bottom > ul > li', this).text().replace(/ /g,'').replace(/\n/g,''),
      offerLink: $('.offer-item-image a', this).attr('href'),
      imageLink: $('.offer-item-image .img-cover', this).attr('style').match(/\(([^)]+)\)/)[1]
    });
  });
  
  await fileManager('otodom', offers, update);

  const nextPageSelector = '#pagerForm .pager-next a[data-dir="next"]';
  const hasNextPage = $(nextPageSelector, bodyHTML)[0];
  
  if (hasNextPage && currentPage < 4) {
    await page.click(nextPageSelector);
    await page.waitFor(2000);
    
    await getOffers(page, true, currentPage + 1);
  }
}

module.exports = async (page) => {
  await page.waitForSelector('#mainTopSearch .location-selector #search-location');
  
  await navigateSearchUI(page);
  await getOffers(page);
};
