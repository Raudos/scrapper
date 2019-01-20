const fs = require('fs');
const _ = require('lodash');

const readQuery = require('./readQuery');
const readResults = require('./readResults');


function removeDuplicates(newOffers, previousOffers) {
  return _.uniqBy(newOffers.concat(previousOffers), 'offerLink');
};

function saveFile(queryId, offers, previousOffers = []) {
  const dataToSave = {
    queryId,
    offers: removeDuplicates(offers, previousOffers),
  };
  
  return new Promise((resolve, reject) => {
    fs.writeFile(`./backend/files/results.json`, JSON.stringify(dataToSave, undefined, 2), (err) => {
      if (err) {
        reject(null);
        return
      }
      
      resolve(true);
    });
  });
}

module.exports = async (offers) => {
  const query = await readQuery();
  const results = await readResults();

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
