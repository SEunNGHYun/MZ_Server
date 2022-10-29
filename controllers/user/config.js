const getConnection  = require('../../dbConnect')
const { cryptoPassword } = require('../../modules/auth');

module.exports = async (req, res) => {
  try {
    const dbConnect = getConnection
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    let {
      user_password,
      user_age,
      user_state,
      user_city,
      interest_ids
    } = req.body
    //유저정보를 수정할 데이터를 추출한다. 
    //id는 primary key이미로 변경이 불가능하다.
    

    user_password = cryptoPassword(user_password)
    //user_password를 암호화한다. 

    let signupData = [user_password, user_age, user_state, user_city, user_id]
    dbConnect.query("update USERS_TB set user_password = ?, user_age = ?, user_state = ?, user_city = ? where user_id = ?", signupData)
    .then(async _ => {
        //INTERESTES_USERS_TB에 넣을 데이터를 [[user_id. interest_id1],[], ...] 형식으로 포장함
        let insert_user_interest = interest_ids.map(ids => [user_id, ids])
        //관심분야들의 아이디값들과 유저의 아이디값을 묶어준다.
        
        //기존의 연경된 관계들을 지우고 새로 데이터를 추가하여 만듬
        await dbConnect.query('delete from INTERESTES_USERS_TB where user_ids = ? ', user_id)
        dbConnect.batch("insert into INTERESTES_USERS_TB(user_ids, interest_codes) values(?,?)", insert_user_interest)
        .then(_ => {
          //여러개의 값을 한꺼번에 넣는 방법
          return res.status(200).json({
            status: 200,
            message : "수정 성공"
          })
        })        
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status : 500,
      message : "Server Error"
    })    
  }
}

/*dbConnect.query(
  ' insert into INTERESTES_USERS_TB(user_ids, interest_ids) 
    values(?,?) on duplicate key 
    update user_ids = values(user_id), interest_ids = values(interest_ids)') 
    한꺼번에 수정할 수 있는 sql 찾아봤는데 
    아무래도 항상 존재하는 row의 수만큼 수정되는 것이 아니고 적을 수도 많을 수도 있어서 에러가 발생함
*/
