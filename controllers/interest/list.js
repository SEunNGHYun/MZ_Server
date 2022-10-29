const getConnection  = require('../../dbConnect')

module.exports = async (req, res) => {
  try {
    const dbConnect = getConnection
    //데이터 베이스와 연결

    const interestData = await dbConnect.query("select * from INTERESTES_TB")
    //관심분야 목록 가져오기
    
    return res.status(200).json({
      status : 200,
      data : interestData
    })
    //헤더에 있는 토믄을 가져온다.
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status: 500,
      message : "server error"
    })
  }
  
}