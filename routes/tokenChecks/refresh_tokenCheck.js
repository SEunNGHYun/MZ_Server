const { verifyRefreshToken } = require('../../modules/auth');

module.exports = async (req, res, next) => {
  try {
    let { refresh_token } = req.headers

    await verifyRefreshToken(refresh_token)

    next();
  }catch(err){
    return res.status(400).json({
      status: 400,
      message: err.message
    })
  }
}