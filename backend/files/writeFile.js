const fs = require("fs");
const { promisify } = require("es6-promisify");

const writeFile = promisify(fs.writeFile);

module.exports = (path = '', data = '') => writeFile(path, data);
