const { getConnection } = require('../../dbConnect');
const { verifyAccessToken } = require('../../modules/auth');

module.exports = async (req, res) => {
  try {
    let { authorization } = req.headers;
    const dbConnect = await getConnection();

    let { user_id } = await verifyAccessToken(authorization);
    //토큰의 정보를 가지고 유저 파악 

    let interestData = await dbConnect.query(
      ` select INTERESTES_TB.interest_field from INTERESTES_USERS_TB
        left join INTERESTES_TB 
        on INTERESTES_USERS_TB.interest_ids = INTERESTES_TB.interest_id
        where INTERESTES_USERS_TB.user_ids = ? 
      `, user_id)
      //유저와 관심분야의 관계테이블에서 유저의 관심분야 데이터를 불러온다.
    let userData = await dbConnect.query(
      ` select  USERS_TB.user_id, USERS_TB.user_age, USERS_TB.user_state, USERS_TB.user_city
        from USERS_TB
        where USERS_TB.user_id = ?`, user_id)
    
    userData[0]["interests"] = interestData
    //설정해 놓은 형식에 맞게 데이터 

    return res.status(200).json({
      status: 200,
      info : userData[0]
    })
  }catch(err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      message : "server"
    })
  }
}