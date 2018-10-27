const crypto = require('crypto');
const aesjs = require('aes-js');

const security = {};

security.encryptAES = (key, plain) => {
    let plainByte = aesjs.utils.utf8.toBytes(plain);
    let aesCtr = new aesjs.ModeOfOperation.ctr(key);
    let encryptedBytes = aesCtr.encrypt(plainByte);
    let cipherText = aesjs.utils.hex.fromBytes(encryptedBytes);

    return cipherText;
};

security.dicryptAES = (pub_key, cipherText) => {
    let encryptedBytes = aesjs.utils.hex.toBytes(cipherText);
    let aesCtr = new aesjs.ModeOfOperation.ctr(key);
    let decryptedBytes = aesCtr.decrypt(encryptedBytes);
    let plainText = aesjs.utils.utf8.fromBytes(decryptedBytes);    
    
    return plainText;
};

security.encrypt = (key, data) => {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let result = cipher.update(data, 'utf8', 'base64');
    result += cipher.final('base64');

    return result;
};

security.dicrypt = (key, data) => {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let result = decipher.update(data, 'base64', 'utf8');
    result += decipher.final('utf8'); 

    return result;
};

security.createHash = () => {
    return crypto.createHash('sha512').update(Math.random()).digest('base64');
};

module.exports = security;
