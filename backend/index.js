const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const initialiseRoutes = require('./routes/index');

// Setup
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

initialiseRoutes(app);

app.listen(3000, () => {
  console.log('Server started!');
});
