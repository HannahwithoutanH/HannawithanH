const cryptico = require('cryptico');
const BITS = 1024;

function getPublicKeyFromPhrase(phrase){
  const rsa = cryptico.generateRSAKey(phrase,BITS);
  return cryptico.publicKeyString(rsa);
}

function encryptMessage(text,publicKey){
  return cryptico.encrypt(text,publicKey);
}


module.exports = {
  getPublicKeyFromPhrase,
  encryptMessage
}