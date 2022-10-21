const { getConnection } = require('../../dbConnect')
const { cryptoPassword } = require('../../modules/auth');

module.exports = async (req, res) => {

  try {
    const dbConnect = await getConnection()
    //데이터 베이스와 연결
    let {
      user_id,
      user_password,
      user_age,
      user_state,
      user_city,
      interest_ids
    } = req.body
    //유저의 데이터를 정렬한다.
    
    user_password = cryptoPassword(user_password)
    //user_password를 암호화한다. 
    let signupData = [user_id, user_password, user_age, user_state, user_city]
    dbConnect.query("insert into USERS_TB(user_id, user_password, user_age, user_state, user_city) values(?,?,?,?,?)", signupData)
    .then( _ => {
      //INTERESTES_USERS_TB에 넣을 데이터를 [[user_id. interest_id1],[], ...] 형식으로 포장함
      let insert_user_interest = interest_ids.map(ids => [user_id, ids])
      //관심분야들의 아이디값들과 유저의 아이디값을 묶어준다.
      try{
        dbConnect.batch("insert into INTERESTES_USERS_TB(user_ids, interest_ids) values(?,?)", insert_user_interest).then(_ => {
          //여러개의 값을 한꺼번에 넣는 방법
          dbConnect.end()
          return res.status(201).json({
            status: 201,
            message : "회원가입 성공"
          })
        })        
      }catch (err) {
        dbConnect.rollback();
        throw err
      }
    })
  }catch (err) {
    dbConnect.rollback()
    dbConnect.end()
    if (err.errorno == 1062) {
      //user_id가 unique로 설정이 되어있어 중복된 값이 발생하면 에러가 1062 sql에러가 발생한다.
      return res.status(200).json({
        status : 200,
        json : "아이디 중복"
      })
    }

    return res.status(500).json({
      status : 500,
      message : "Server Error"
    })    
  }
}

