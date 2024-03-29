const getConnection  = require('../../dbConnect')

module.exports = async (req, res) => {
  try{
      const dbConnect = await getConnection
      const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
      let {
        policy_id, policy_name, policy_introduce, policy_scale, policy_date, policy_enable_age, policy_enable_status,
        policy_enable_edu, policy_enable_majr, policy_enable_spil, policy_sub_way, policy_sub_place, policy_result_date,
        policy_support
      } = req.body    

      const dataCheck = await dbConnect.query("select user_ids, policy_ids from SCRAB_POLICIES_USERS where user_ids = ? and policy_ids = ?", [user_id, policy_id])

      if (dataCheck.length > 0) {
          return res.status(201).json({
            status : 201,
            message : "이미 스크랩 되어있습니다."
          })
        }
      else {
        await dbConnect.query(`insert into SCRAB_POLICIES values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
          policy_id, policy_name, policy_introduce, policy_scale, policy_date, policy_enable_age, policy_enable_status,
          policy_enable_edu, policy_enable_majr, policy_enable_spil, policy_sub_way, policy_sub_place, policy_result_date, policy_support
        ])

        dbConnect.query('insert into SCRAB_POLICIES_USERS(user_ids, policy_ids) values (?,?) ', [user_id, policy_id]).then(_ => {
            return res.status(202).json({
              status : 202,
              message : "스크랩 되었습니다."
            })
          })
      }
  
    }catch(err){
      console.log(err)
      return res.status(500).json({
        status : 500,
        message : err
      })
  }
}