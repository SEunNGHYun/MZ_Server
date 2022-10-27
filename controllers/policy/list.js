const axios = require('axios');
const convert = require('xml-js');
const { getConnection } = require('../../dbConnect')
const { policyDataURL, changeRegionCode } = require('../../modules/utils')

module.exports = async (req, res) => {
  try{
    const { pageIndex } = req.query
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    const dbConnect = await getConnection()
    
    let interestData = await dbConnect.query(`
      select INTERESTES_USERS_TB.interest_codes
      from INTERESTES_USERS_TB
      where INTERESTES_USERS_TB.user_ids = ?
    `, user_id)
    //유조의 관심분야를 불러온다.

    let userData = await dbConnect.query('select USERS_TB.user_age, USERS_TB.user_state, USERS_TB.user_city from USERS_TB where user_id = ?', user_id)
  
    let types = ""
    for (var i = 0; i < interestData.length; i++ ){
      types = types + interestData[i]["interest_codes"] + ","
    }
    types = types.slice(0, -1)
    //관심 분야를 요청보낼 서버의 기주에 맞추어 편집

    let reginCode =  changeRegionCode(userData[0]["user_state"], userData[0]["user_city"])

    reginCode = reginCode["stateCode"] +","+ reginCode["cityCode"]

    let params =  {
      pageIndex : pageIndex || 1, openApiVlak : process.env.API_SECRET_KEY, 
      display : 10, bizTycdSel : types, srchPolyBizSecd : reginCode
    }
    let policyData = await axios({
      method : "get",
      url : policyDataURL,
      params : params
    })

    //xml 데이터를 js로 변환
    let changeData = convert.xml2js(policyData.data, {compact: true})

    return res.status(200).json({
      status : 200,
      data : changeData
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