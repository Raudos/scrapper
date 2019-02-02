const readFile = require('../files/readFile');
const BackendError = require('../models/BackendError');

const notificationsInterval = process.env.NOTIFICATIONS_INTERVAL || 1000 * 10 * 1;

module.exports = () => {
  console.log(`Started notifications interval with value: ${notificationsInterval} ms`);

  setInterval(async () => {
    const subscriptions = await readFile('./backend/data/subscriptions.json');
    const payload = JSON.stringify({ title: 'test' });
    
    if (!(subscriptions instanceof BackendError) && subscriptions.length) {
      subscriptions.forEach(subscription => {
        global.webpush.sendNotification(subscription, payload)
          .catch(error => {
            console.error(error.stack);
          });
      });
    }
  }, notificationsInterval);
};
