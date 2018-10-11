const db = require('../db/db');
const getPubKey = require('../utils/crypt').getPublicKeyFromEmail;


class UserController {


  createUser(req,res,next){
    const {username, password, email} = req.body;
    publicKey = getPubKey(email);
    db.addUser(username,email,password,publicKey)
    .then(next())
    .catch(err=>res.send(err));
  }

  verifyCreds(req,res,next){
    const {email, password} = req.body;
    db.getUser(email,password)
    .then(next())
    .catch(err=>res.send(err));
  }
}


module.exports = new UserController;