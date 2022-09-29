const { getConnection } = require('../../dbConnect');

module.exports = async (req, res) => {
  try {
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    const dbConnect = await getConnection()

    let scrabs = await dbConnect.query("select policy_id from SCRAB_POLICIES where user_id = ? ", user_id)
  
    return res.status(200).json({
      status :200,
      data : scrabs
    })
  }catch(err){
    return res.status(200).json({
      status :200,
      message : "Server Error"
    })
  }
}