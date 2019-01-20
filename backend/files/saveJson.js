const fs = require('fs');

function saveFile(fileName, passedData, prevData = false) {
  let dataToSave = passedData;
  
  if (prevData) {
    dataToSave = JSON.parse(prevData).concat(passedData);
  }
  
  fs.writeFile(`./backend/files/${fileName}.json`, JSON.stringify(dataToSave, undefined, 2), function(err) {
    if (err) {
      return console.log(err);
    }
    
    console.log(`The file ${fileName} was ${prevData ? 'updated' : 'saved'}!`);
  });
}

module.exports = (fileName, passedData, update = false) => {
  fs.readFile(`./backend/files/${fileName}.json`, (err, data) => {
    if (err) {
      saveFile(fileName, passedData);
      
      return;
    }

    update ? saveFile(fileName, passedData, data) : saveFile(fileName, passedData);
  });
};
