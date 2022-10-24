const { getConnection } = require('../../dbConnect')

module.exports = async (req, res) => {
  try{
      const dbConnect = await getConnection()
      const { policy_id } = req.query
      const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기 

      const dataCheck = await dbConnect.query("select user_ids, policy_ids from SCRAB_POLICIES_USERS where user_ids = ? and policy_ids = ?", [user_id, policy_id])

      if (dataCheck.length < 0) {
          return res.status(201).json({
            status : 201,
            message : "이미 삭제 되어있습니다."
          })
      }

      await dbConnect.query('delete from SCRAB_POLICIES_USERS where user_ids = ? and policy_ids = ?', [user_id, policy_id])
      
      dbConnect.query("delete from SCRAB_POLICIES where policy_id = ?" , [policy_id]).then(_ =>{
        return res.status(202).json({
          status : 202,
          message : "삭제 되었습니다."
        })
      })
  
    }catch(err){
      console.log(err)
      return res.status(500).json({
        status : 500,
        message : err
      })
  }
}