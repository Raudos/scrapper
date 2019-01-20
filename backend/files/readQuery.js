const fs = require('fs');

module.exports = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./backend/files/query.json`, (err, data) => {
      if (err) {
        reject(null);
        return;
      }
  
      resolve(JSON.parse(data));
    });
  });
};
