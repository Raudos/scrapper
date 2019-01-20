const fs = require('fs');

module.exports = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./backend/files/results.json`, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      
      resolve(JSON.parse(data));
    });
  })
  .catch(e => e);
};
