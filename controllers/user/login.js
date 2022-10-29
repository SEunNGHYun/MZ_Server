const getConnection  = require('../../dbConnect')
const { cryptoPassword, makaAccessToken, makeRefreshToken } = require('../../modules/auth');

module.exports = async (req, res) => {
  try {
    const dbConnect = await getConnection
    //db 연결 
    let {
      user_id,
      user_password
    } = req.body
    //요청에 담긴 데이터를 추출
    //유저의 데이터의 유효성을 검사허기 => 4xx에러 
    
    user_password = cryptoPassword(user_password)
    //유저릐 비밀번호를 암호화한다.

    const val = await dbConnect.query("select * from USERS_TB where user_id = ? and user_password = ? ;", [user_id, user_password])
    if (val.length > 0) {
        //요청 데이터가 유저 테이블에 있는 경우 
        const access_token = makaAccessToken(user_id);//유저의 id로 accesstoken 생성
        const refresh_token = makeRefreshToken()//refresh token 생성
        await dbConnect.query("update USERS_TB set refresh_token = ? where user_id = ? ", [refresh_token, user_id]) // refresh token 데이터 베이스에 저장
        res.status(201).json({
          status: 201,
          refresh_token,
          access_token
        })
    }else {
        return res.status(202).json({
          status : 202,
          message : "존재하지 않는 회원입나다."
        })
    }
  }catch (err) {
      console.log(err)
      return res.status(500).json({
        status : 500,
        message : "server error"
      })
    }
}