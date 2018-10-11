const jwt = require("jsonwebtoken");

class AuthController {

  constructor(){
    this.secret = process.env.JWT_SECRET;
  }
  checkToken(req,res,next) {
    const token = req.body.token || req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, this.secret, (err, decoded) => {
        if(err){
          res.status(403).json({
            message:"Wrong Token"
          });
        }else{
          req.decoded=decod;
          next();
        }
      });
    }
  }

  sendToken(req,res,next) {
    const username = req.body.username;
    const token = jwt.sign(username,this.secret)
    res.json({
      token:token,
    })
  }
}
