const getConnection  = require('../../dbConnect');

module.exports = async (req, res) => {
  try {
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    const dbConnect = await getConnection


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