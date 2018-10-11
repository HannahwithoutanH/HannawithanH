const db = require('../db/db');
const getPubKey = require('../utils/crypt').getPublicKeyFromPhrase;


class UserController {

  createUser(req,res,next){
    const {username, password, email} = req.body;
    publicKey = getPubKey(email);
    db.addUser(username,email,password,publicKey)
    .then((newUser)=>{
      res.locals.userId = newUser.id;
      next();
    })
    .catch(err=>res.send(err));
  }

  verifyCreds(req,res,next){
    const {email, password} = req.body;
    db.getUser(email,password)
    .then(user=>{res.locals.userid = user[0].id; next()})
    .catch(err=>res.send(err));
  }
}


module.exports = new UserController();