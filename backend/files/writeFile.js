const fs = require("fs");
const { promisify } = require("es6-promisify");

const BackendError = require('../models/BackendError');

const writeFile = promisify(fs.writeFile);

module.exports = (path = '', data = '') => writeFile(path, data)
  .catch(e => new BackendError('fs', 500, e));
