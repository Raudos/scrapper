const fs = require("fs");
const { promisify } = require("es6-promisify");

const BackendError = require('../models/BackendError');

const readFile = promisify(fs.readFile);

module.exports = (path = '', parse = true) => readFile(path)
  .then(data => {
    if (parse) {
      return JSON.parse(data);
    }

    return data;
  })
  .catch(e => new BackendError('fs', 500, e));
