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
          res.status(403).json({
            message:"Wrong Token"
          });
        }else{
          req.decoded=decoded;
          next();
        }
      });
    }
  }

  sendToken(req,res,next) {
    const userId = res.locals.userId;
    const token = jwt.sign({userId},this.secret)
    res.json({
      token:token,
    })
  }
}
