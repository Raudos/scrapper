const puppeteer = require('puppeteer');
const _ = require('lodash');

const readFile = require('../files/readFile');
const saveResults = require('../files/saveResults');

// Portals
const otodom = require('./portals/otodom/index');

// Models
const BackendError = require('../models/BackendError');

module.exports = async () => {
  const query = await readFile('./backend/data/query.json');
  const status = await readFile('./backend/data/status.json');

  if (status.length) {
    if (query && !(query instanceof BackendError)) {
      const runners = {
        otodom,
      };

      const browser = await puppeteer.launch({ headless: true });

      const offers = await Promise.all(status.map(portalName => runners[portalName](browser, query)))
        .then(data => _.flatten(data));

      await browser.close();

      await saveResults(offers);

      return offers;
    }

    return query;
  }

  return new BackendError('Tests not passed', 500, {});
};
