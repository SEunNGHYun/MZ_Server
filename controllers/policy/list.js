const axios = require('axios');
const { getConnection } = require('../../dbConnect')
const { verifyAccessToken } = require('../../modules/auth');
const { policyDataURL } = require('../../modules/utils')

module.exports = async (req, res) => {
  try{
    const dbConnect = await getConnection()
    let { authorization } = req.headers;
    //페이지 갯수도 넣어야 할 듯    
    let { user_id } = await verifyAccessToken(authorization);

    let data = await dbConnect.query(`
        select INTERESTES_TB.interest_code 
        from INTERESTES_USERS_TB 
        left join INTERESTES_TB
        on INTERESTES_TB.interest_id = INTERESTES_USERS_TB.interest_ids
        where INTERESTES_USERS_TB.user_ids = ?
      `, user_id)
    //유조의 관심분야를 불러온다.

    let types = ""
    for (var i = 0; i < data.length; i++ ){
      types = types + data[i]["interest_code"] + ","
    }
    types = types.slice(0, -1)
    //관심 분야를 요청보낼 서버의 기주에 맞추어 편집
  
    console.log(types)
    let policyData = await axios({
      method : "get",
      url : policyDataURL,
      params : {
        pageIndex : 1, openApiVlak : process.env.API_SECRET_KEY, 
        display : 10, bizTycdSel : types
      }
    })

    return res.status(200).json({
      status : 200,
      data : "구현중..sdasd."
    })
    //xml을 json으로 변경
  }catch(err){
    console.log(err);
    return res.status(500).json({
      status: 500,
      message : "server error"
    })
  }
}