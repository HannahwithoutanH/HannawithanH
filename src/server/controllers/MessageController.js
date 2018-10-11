
const encrypt = require('../utils/crypt').encryptMessage;
const db = require('../db/db');

class MessageController {

  async postMessage(req,res,next){
    const {threadId, userId, message} = req.body;
    threadPubKey = await db.getThreadPublicKey(threadId)
    encryptedMessage = encrypt(message,threadPubKey)
    db.writeMessage(userId,threadId,encryptedMessage)
    .then(()=>res.sendStatus(200))
    .catch(err=>res.send(err));
  }
}

module.exports = new MessageController();