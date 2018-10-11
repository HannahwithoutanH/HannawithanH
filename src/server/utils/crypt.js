const cryptico = require('cryptico');
const BITS = 1024;

function getPublicKeyFromEmail(email){
  const rsa = cryptico.generateRSAKey(email,BITS);
  return cryptico.publicKeyString(rsa);
}

function encryptMessage(text,publicKey){
  return cryptico.encrypt(text,publicKey);
}


module.exports = {
  getPublicKeyFromEmail,
  encryptMessage
}