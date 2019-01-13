const fs = require('fs');

fs.readFile(`./backend/files/otodom.json`, (err, data) => {
  console.log(JSON.parse(data).length);
});
