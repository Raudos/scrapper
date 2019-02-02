const _ = require('lodash');

const writeFile = require('./writeFile');
const readFile = require('./readFile');

function removeDuplicates(newOffers, previousOffers) {
  return _.uniqBy(newOffers.concat(previousOffers), 'offerLink');
}

function saveFile(queryId, offers, previousOffers = []) {
  const dataToSave = {
    queryId,
    offers: removeDuplicates(offers, previousOffers),
  };

  return writeFile(`./backend/data/results.json`, JSON.stringify(dataToSave, undefined, 2));
}

module.exports = async (offers = []) => {
  const query = await readFile(`./backend/data/query.json`);
  const results = await readFile('./backend/data/results.json')
    .catch(() => null);
  
  const offersWithStatus = offers.map(offer => ({ ...offer, status: 'new' }));

  if (results && query.id === results.queryId) {
    const resultsWithStatus = results.offers.map(offer => ({ ...offer, status: 'old' }));

    return saveFile(query.id, offersWithStatus, resultsWithStatus);
  } else {
    return saveFile(query.id, offersWithStatus);
  }
};
