const $ = require('cheerio');

const fileManager = require('../saveJson');

async function navigateSearchUI(page) {
  await page.waitForSelector('#mainTopSearch .location-selector #search-location');
  
  await page.click('#mainTopSearch .location-selector');
  await page.type('#mainTopSearch .location-selector #search-location', 'Warszawa');
  
  await page.waitFor(1000);
  await page.click('.select2-results ul.select2-results__options .select2-results__option--highlighted');
  
  await page.click('[data-name*="filter_float_price:from"]');
  await page.keyboard.type('600');
  
  await page.click('[data-name*="filter_float_price:to"]');
  await page.keyboard.type('2800');
  
  await page.click('[data-name*="filter_float_m:from"]');
  await page.keyboard.type('20');
  
  await page.click('[data-name*="filter_float_m:to"]');
  await page.keyboard.type('30');
  
  await page.click('[data-name*="filter_enum_rooms_num"]');
  await page.click('.select2-results ul.select2-results__options li:nth-child(1)');
  
  await page.click('.btn-search-big');
}

async function getOffers(page) {
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
  
  fileManager('otodom', JSON.stringify(offers, undefined, 2));
  
  // await page.evaluate(() => {
  //   const hasPagination
  // })
}

module.exports = async (page) => {
  await navigateSearchUI(page);
  await getOffers(page);
};
