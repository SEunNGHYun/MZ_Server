const { getConnection } = require('../../dbConnect')
const { verifyAccessToken } = require('../../modules/auth');

module.exports = async (req, res) => {
  try{
    const dbConnect = await getConnection()
    let { authorization , policy_id } = req.headers;
    //페이지 갯수도 넣어야 할 듯    
    let { user_id } = await verifyAccessToken(authorization);

    dbConnect.query("select * from SCRAB_POLICIES where user_id = ? and policy_id = ?", [user_id, policy_id])
    .then(result => {
      if (result.length > 0) {
        return res.status(400).json({
<<<<<<< HEAD
          status : 405,
=======
          status : 404,
>>>>>>> 4526610eb715b7371f7ec1ad10da8748e4244d02
          message : "이미 스크랩을 하셨습니다."
        })
      }
      dbConnect.query("insert into SCRAB_POLICIES(user_id, policy_id) values (?, ?)", [user_id, policy_id])
      .then(_ =>{
        return res.status(200).json({
          status: 200,
          message : "스크랩 성공"
        })
      })
    })
  }catch(err){
    return res.status(500).json({
      status: 500,
      message : "Server error"
    })
  }
}