const db = require('../db/db');
const getPubKey = require('../utils/crypt').getPublicKeyFromPhrase;


class UserController {

  createUser(req,res,next){
    const {password, email} = req.body;
    const username = email;
    const publicKey = getPubKey(email);
    db.addUser(username,email,password,publicKey)
    .then((newUser)=>{
      console.log(newUser);
      res.locals.userId = newUser.id;
      return next();
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