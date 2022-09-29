const { verifyAccessToken } = require('../../modules/auth');

module.exports = async (req, res, next) => {
  let { authorization } = req.headers;
  //페이지 갯수도 넣어야 할 듯    

  try{
    let { user_id } = await verifyAccessToken(authorization);
    req.user_id = user_id;
    next()
  }catch(err){
    return res.status(400).json({
      status : 400,
      status: err.message
    })
  }
}