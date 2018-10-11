const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./db/db.js');

// db.addUser('Hannah', 'fake@gmail.com', 'poo');
// db.addUser('Greg', 'faker@gmail.com', 'poo');
// db.addUser('Tsion', 'fakey@gmail.com', 'poo');
// db.addUser('Seano', 'fakest@gmail.com', 'poo');

// db.getUser('fakest@gmail.com').then(data => console.log(data));
// db.changeName('fakest@gmail.com', 'Sean').then(data => console.log(data));
// db.changePassword('fakest@gmail.com', 'poo', 'poop').then(data => console.log(data));

// db.addThread('fakest@gmail.com', 'password');
// db.addThread('fakest@gmail.com', 'password');
// db.getThread(1, 'password').then(data => {console.log(data)});
// db.deleteThread(2, 'password');

// db.joinThread(2, 'password', 1).then(data => console.log(data));
// db.joinThread(2, 'password', 2).then(data => console.log(data));
// db.getThreadMembers(2).then(data => console.log(data));
// db.leaveThread(2,1).then(data => {console.log(data)});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 3000...');
})


module.exports = app;