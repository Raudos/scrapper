const runBrowser = require('../browser/index');
const saveQuery = require('../files/saveQuery');

const BackendError = require('../models/BackendError');

module.exports = app => {
  app.get('/searchForOffers', async (req, res) => {
    try {
      runBrowser()
        .then(data => {
          res.send(JSON.stringify(data, undefined, 2));
        })
        .catch(backendError => {
          res.status(backendError.status).send(backendError);
        });
    } catch (e) {
      const error = new BackendError('unknown', 500, e);
      res.status(error.status).send(error);
    }
  });

  app.post('/postNewQuery', (req, res) => {
    const { body } = req;

    saveQuery(body)
      .then((queryWithId) => {
        res.send(queryWithId);
      })
      .catch((backendError) => {
        res.status(backendError.status).send(backendError);
      });
  });
};
