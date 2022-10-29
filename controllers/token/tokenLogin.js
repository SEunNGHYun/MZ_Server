const getConnection  = require('../../dbConnect')

module.exports = async (req, res) => {
  try{
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    const dbConnect = getConnection;

    let userData = await dbConnect.query("select * from USERS_TB where user_id = ?", user_id)

    if (userData[0]) {
      return res.status(200).json({
        status: 200,
        message : "로그인 성공"
      })
    }else {
      return res.status(400).json({
        status: 400,
        message : "존재하지 않는 회원입니다."
      })
    }
    
  }catch(err){
    return res.status(500).json({
      status: 500,
      message : "server error"
    })
  }
}