const readFile = require('../files/readFile');
const runBrowser = require('../browser/index');
const saveQuery = require('../files/saveQuery');

module.exports = app => {
  app.get('/searchForOffers', async (req, res) => {
    console.log('Searching for offers!');

    try {
      const isScrappingCompleted = await runBrowser();

      if (isScrappingCompleted) {
        readFile(`./backend/files/results.json`)
          .then(data => {
            res.send(JSON.stringify(data, undefined, 2));
          })
          .catch(e => {
            res.status(400).send(e);
          });
      } else {
        res.status(400).send('No query found.');
      }
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.post('/postNewQuery', (req, res) => {
    console.log('Creating new query.json file!');
    const { body } = req;

    saveQuery(body)
      .then((queryWithId) => {
        res.send(queryWithId);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  });
};
