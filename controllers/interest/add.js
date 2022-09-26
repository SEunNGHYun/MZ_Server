const { getConnection } = require('../../dbConnect')

module.exports = async (req, res) => {
  const dbConnect = await getConnection()
    //데이터 베이스와 연결
  try {
    const { interest_field, interest_img } = req.body

    await dbConnect.query("insert into INTERESTES_TB(interest_field, interest_img) values (?, ?) ", [interest_field, interest_img])
    //관심분야 추가하기 
    return res.status(200).json({
      status : 200,
      message : "생성 성공"
    })
    //헤더에 있는 토믄을 가져온다.
  }catch(err){
    console.log(err)
    dbConnect.rollback()
    return res.status(500).json({
      status: 500,
      message : "server error"
    })
  }
  
}