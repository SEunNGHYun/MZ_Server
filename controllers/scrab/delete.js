const { getConnection } = require('../../dbConnect')
const { verifyAccessToken } = require('../../modules/auth');

module.exports = async (req, res) => {
  try{
    const dbConnect = await getConnection()
    let { authorization , policy_id } = req.headers;
    //페이지 갯수도 넣어야 할 듯    
    let { user_id } = await verifyAccessToken(authorization);

    await dbConnect.query("delete from SCRAB_POLICIES where user_id = ? and policy_id = ?", [user_id, policy_id])
    
    return res.status(200).json({
      status: 200,
      message : "스크랩 삭제 성공"
    })
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status: 500,
      message : "Server error"
    })
  }
}