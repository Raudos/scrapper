const webpush = require('web-push');

module.exports = () => {
  const publicVapidKey = process.env.PUBLIC_VAPID_KEY || 'BIs6JiiC9m1OPvb2fp1xyrtZLKj6gBnSylNJWpBoKijduIbEpUtPr-Cy2Yvjj8uDz1kPOIuyjs7iX7NbNwH6tok';
  const privateVapidKey = process.env.PRIVATE_VAPID_KEY || 'B-sY6atC6b0J05lJCcQSCtx91KOam_WAMnA_dcnmhOw';
  
  webpush.setVapidDetails('mailto:sklepinski.p@gmail.com', publicVapidKey, privateVapidKey);
  global.webpush = webpush;
};
