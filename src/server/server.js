const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const db = require('./db/db.js');
const userController = require('./controllers/userController.js');
const eventsController = require('./controllers/userController.js');

app.use(express.static(path.join(__dirname, '../../dist/static')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../.././dist/static/index.html')));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
