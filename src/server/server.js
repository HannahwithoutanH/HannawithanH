const express = require('express');
<<<<<<< HEAD
const server = express();
=======
require('dotenv').config();
const app = express();
const db = require('./db/db.js');
>>>>>>> 4c0a9be692857a2ea8cfc0a9d4110fae3cbe6678




sever.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 3000...');
})


module.exports = server;