const fs = require("fs");
const { promisify } = require("es6-promisify");

const readFile = promisify(fs.readFile);

module.exports = (path = '') => readFile(path)
  .then(data => JSON.parse(data));
