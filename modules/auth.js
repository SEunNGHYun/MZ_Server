const crypto = require('crypto');
const jwt = require('jsonwebtoken')

module.exports = {
  cryptoPassword : (password) => crypto.createHash('sha256').update(password).digest('base64'),
  makaAccessToken : (id) => {
    return jwt.sign({
      user_id : id
    }, process.env.SECRET_KEY,{
      expiresIn : '2h'
    })
  },
  makeRefreshToken : () => {
    return jwt.sign({}, process.env.SECRET_KEY,{
      expiresIn : '14d'
    })
  },
  verifyAccessToken : async (token) => {
    let decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodeToken
  }
}