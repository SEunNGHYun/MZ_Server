const getConnection  = require('../../dbConnect')
const { makaAccessToken } = require('../../modules/auth');

module.exports = async (req, res) => {
  try{
    let { refresh_token } = req.headers
    const dbConnect = await getConnection

    let userData = await dbConnect.query("select user_id from USERS_TB where refresh_token = ?", refresh_token)

    let newAccessToken = makaAccessToken(userData[0].user_id)

    return res.status(200).json({
      status: 200,
      access_token : newAccessToken
    })
  }catch(err){
    return res.status(500).json({
      status: 500,
      message : "server error"
    })
  }
}