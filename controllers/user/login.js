const { getConnection } = require('../../dbConnect')
const { cryptoPassword } = require('../../utils')

module.exports = async (req, res) => {
  const dbConnect = await getConnection()

  let {
    user_id,
    user_password
  } = req.body

  user_password = cryptoPassword(user_password)

  dbConnect.query("select * from USERS_TB where user_id = ? and user_password = ? ;", [user_id, user_password])
  .then(val => {
    if (val.length > 0) {

    }else {
      return res.status(200).json({
        status : 200,
        message : "존재하지 않는 회원입나다."
      })
    }
  })
  .catch(err => {
    console.log(err)
    return res.status(500).json({
      status : 500,
      message : "server error"
    })
  })
}