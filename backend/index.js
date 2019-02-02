const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const initialiseRoutes = require('./routes/index');
const initialiseWebpush = require('./notifications/webpush');
const initialiseNotifications = require('./notifications/index');

// Setup
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

initialiseRoutes(app);
initialiseWebpush();

app.listen(3003, () => {
  console.log('Server started!');
  initialiseNotifications();
});
