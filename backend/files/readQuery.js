const fs = require('fs');

module.exports = async () => {
  return await new Promise((resolve) => {
    fs.readFile(`./backend/files/query.json`, (err, data) => {
      if (err) {
        resolve(null);
        return;
      }
  
      resolve(JSON.parse(data));
    });
  });
};
