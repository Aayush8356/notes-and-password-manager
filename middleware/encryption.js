const Cryptr = require("cryptr");
// var config = require("config");

const secretKey = "secretvygvjygvjgv";
const cryptr = new Cryptr(secretKey);

// Data encryption
const encrypt = (toEncrypt) => {
  try {
    const encrypted = cryptr.encrypt(toEncrypt);
    return encrypted;
  } catch (error) {
    console.log("decryption failed for", toEncrypt);
    return toEncrypt;
  }
};

//Data Decryption
const decrypt = (toDecrypt) => {
  try {
    const decrypted = cryptr.decrypt(toDecrypt);
    return decrypted;
  } catch (error) {
    return toDecrypt;
  }
};

module.exports = { encrypt, decrypt };
