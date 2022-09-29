const { getConnection } = require('../../dbConnect')

module.exports = async (req, res) => {
  try{
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    let { policy_id } = req.headers;
    const dbConnect = await getConnection()

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