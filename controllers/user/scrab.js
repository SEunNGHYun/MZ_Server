const { getConnection } = require('../../dbConnect');
const { verifyAccessToken } = require('../../modules/auth');

module.exports = async (req, res) => {
  try {
    let { authorization  } = req.headers;
    const dbConnect = await getConnection()

    let { user_id } = await verifyAccessToken(authorization);

    let scrabs = await dbConnect.query("select policy_id from SCRAB_POLICIES where user_id = ? ", user_id)
  
    return res.status(200).json({
      status :200,
      data : scrabs
    })
  }catch(err){
    return res.status(200).json({
      status :200,
      message : "Server Error"
    })
  }
}