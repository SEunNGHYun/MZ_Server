const { getConnection } = require('../../dbConnect')

module.exports = async (req, res) => {
  try{
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    let { policy_id } = req.headers;
    const dbConnect = await getConnection()

    dbConnect.query("select * from SCRAB_POLICIES where user_id = ? and policy_id = ?", [user_id, policy_id])
    .then(result => {
      if (result.length > 0) {
        return res.status(400).json({
          status : 404,
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