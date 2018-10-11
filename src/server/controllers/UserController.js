const db = require('../db/db.js');

class UserController {


  createUser(req,res,next){
    const {username, password, email} = req.body;
    db.addUser(username,email,password)
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