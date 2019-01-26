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

  return writeFile(`./backend/files/results.json`, JSON.stringify(dataToSave, undefined, 2));
}

module.exports = async (offers) => {
  const query = await readFile(`./backend/files/query.json`);
  const results = await readFile('./backend/files/results.json')
    .catch(() => null);

  if (query) {
    if (results && query.id === results.queryId) {
      return saveFile(query.id, offers, results.offers);
    } else {
      return saveFile(query.id, offers);
    }
  } else {
    throw new Error("Query file missing!");
  }
};
