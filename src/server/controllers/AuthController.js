const jwt = require("jsonwebtoken");

class AuthController {

  constructor(){
    this.secret = process.env.JWT_SECRET;
  }

  checkToken(req,res,next) {
    const token = req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, this.secret, (err, decoded) => {
        if(err){
          res.status(401).json({
            message:"Wrong Token"
          });
        }else{
          req.decoded=decoded;
          next();
        }
      });
    }
    else{
      res.status(401).json({
        message:"no token"
      });
    }

  }

  sendToken(req,res,next) {
    const userId = res.locals.userId;
    const token = jwt.sign({userId},process.env.JWT_SECRET)
    res.json({
      token:token,
      message:"Authenticated, token given",
    })
  }
}

module.exports = new AuthController();
