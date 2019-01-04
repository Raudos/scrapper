var fs = require('fs');

function saveFile(fileName, text) {
  fs.writeFile(`./backend/files/${fileName}.json`, text, function(err) {
    if (err) {
      return console.log(err);
    }
    
    console.log(`The file ${fileName} was saved!`);
  });
}

module.exports = (fileName, text) => {
  fs.access(`./backend/files/${fileName}`, (err) => {
    if (err) {
      saveFile(fileName, text);
      
      return;
    }
  
    fs.unlink(`./backend/files/${fileName}`, (err) => {
      if (err) throw err;
      
      saveFile(fileName, text);
    });
  });
};
