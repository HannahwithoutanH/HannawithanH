const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./db/db.js');

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 3000...');
})


module.exports = app;