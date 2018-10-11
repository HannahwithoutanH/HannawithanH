const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const db = require('./db/db.js');

app.use(express.static(path.join(__dirname, '../../dist/static')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../.././dist/static/main.js')));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
