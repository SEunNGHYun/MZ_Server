const { getConnection } = require('../../dbConnect');

module.exports = async (req, res) => {
  try {
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    const dbConnect = await getConnection();

    //토큰의 정보를 가지고 유저 파악 

    let interestData = dbConnect.query(
      ` select INTERESTES_TB.interest_field from INTERESTES_USERS_TB
        left join INTERESTES_TB 
        on INTERESTES_USERS_TB.interest_codes = INTERESTES_TB.interest_code
        where INTERESTES_USERS_TB.user_ids = ? 
      `, user_id)
      //유저와 관심분야의 관계테이블에서 유저의 관심분야 데이터를 불러온다.
    let userData = dbConnect.query(
      ` select USERS_TB.user_id, USERS_TB.user_age, USERS_TB.user_state, USERS_TB.user_city
        from USERS_TB
        where USERS_TB.user_id = ?`, user_id)

    let scrabData = dbConnect.query(`
      select * from SCRAB_POLICIES_USERS 
      left join SCRAB_POLICIES 
      on SCRAB_POLICIES_USERS.policy_ids = SCRAB_POLICIES.policy_id
      where SCRAB_POLICIES_USERS.user_ids = ?`, user_id)

    let userAllData = await Promise.all([
      userData,
      interestData,
      scrabData
    ])
    
    userAllData[0][0]["interests"] = userAllData[1]
    userAllData[0][0]["scrabs"] = userAllData[2]

    const userInfo = userAllData[0][0]
    //설정해 놓은 형식에 맞게 데이터 

    return res.status(200).json({
      status: 200,
      info : userInfo
    })
  }catch(err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      message : "server"
    })
  }
}