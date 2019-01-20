const fs = require('fs');
const shortid = require('shortid');

module.exports = (query) => {
  return new Promise((resolve, reject) => {
    const queryWithId = Object.assign(query, { id: shortid.generate() });
    const strQuery = JSON.stringify(queryWithId, undefined, 2);
    
    fs.writeFile('./backend/files/query.json', strQuery, (err) => {
      if (err) {
        reject(null);
        return;
      }
      
      resolve(queryWithId);
    });
  });
};
