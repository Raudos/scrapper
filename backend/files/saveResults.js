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

module.exports = async (offers) => {
  const query = await readFile(`./backend/data/query.json`);
  const results = await readFile('./backend/data/results.json')
    .catch(() => null);

  if (results && query.id === results.queryId) {
    return saveFile(query.id, offers, results.offers);
  } else {
    return saveFile(query.id, offers);
  }
};
