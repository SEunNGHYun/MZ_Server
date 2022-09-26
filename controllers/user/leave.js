const { getConnection } = require('../../dbConnect');
const { verifyAccessToken } = require('../../modules/auth');

module.exports = async (req, res) => {
  try {
    let { authorization } = req.headers;
    const dbConnect = await getConnection();

    let { user_id } = await verifyAccessToken(authorization);

    await dbConnect.query("delete from USERS_TB where user_id = ?", user_id);
    
    return res.status(200).json({
      status : 200,
      message : "회원탈퇴 성공"
    })

  }catch(err) {
    return res.status(500).json({
      status : 500,
      message : "서버 에러"
    })
  }
}