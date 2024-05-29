module.exports = {getDecodedPassword};
const CryptoJS = require("crypto-js");

/** 
 * To decode the encoded password 
 * @param {string} encoded password  
 * @returns {string} decoded password 
 */
 function getDecodedPassword(password)
    {
      const decodedPassword = CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Utf8)
      return decodedPassword;
    };


    