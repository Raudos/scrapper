const writeFile = require('./writeFile');
const readFile = require('./readFile');
const BackendError = require('../models/BackendError');

const subscriptionPath = './backend/data/subscriptions.json';

module.exports = async (newSubscription) => {
  const subscriptions = await readFile(subscriptionPath);
  
  if (subscriptions instanceof BackendError && subscriptions.type === 'fs') {
    return writeFile(subscriptionPath, JSON.stringify([newSubscription], undefined, 2));
  } else {
    return writeFile(subscriptionPath, JSON.stringify(subscriptions.concat(newSubscription), undefined, 2));
  }
};
