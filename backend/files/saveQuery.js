const shortid = require('shortid');

const writeFile  = require('./writeFile');

module.exports = (query) => {
  const queryWithId = Object.assign(query, { id: shortid.generate() });
  const strQuery = JSON.stringify(queryWithId, undefined, 2);

  return writeFile('./backend/files/query.json', strQuery)
    .then(() => queryWithId);
};
