require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./controllers/UserController');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({     
  extended: true
}));
server.use(express.static(path.join(__dirname, '../../dist/static')));


server.post('/signup', userController.createUser, authController.sendToken);
server.post('/login', userController.verifyCreds, authController.sendToken);

server.listen(3000, () => console.log('Listening on port 3000'));