const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./bd.js');

// const practiceUser = ['GD', 'faker@gmail.com', '91320', 'general', 'metaco123', '5555555'];
// const practiceEvent = ['1', 'Cuts', 'hair cuts', 'here', '2008-11-11 13:23:44', '0', 'a place to cut hair', 'pending'];

// db.insertUser(...practiceUser);
// db.insertEvent(...practiceEvent);
// db.insertRSVPS(4, 25);

db.getUser('fake@gmail.com');
// db.getEventByService('');
// db.getEventByLocation('');

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 3000...');
})