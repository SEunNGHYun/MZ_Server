const axios = require('axios');
const convert = require('xml-js');
const { getConnection } = require('../../dbConnect')
const { policyDataURL } = require('../../modules/utils')

module.exports = async (req, res) => {
  try{
    const {pageIndex } = req.query
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    const dbConnect = await getConnection()
    

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
  
    let policyData = await axios({
      method : "get",
      url : policyDataURL,
      params : {
        pageIndex : pageIndex || 1, openApiVlak : process.env.API_SECRET_KEY, 
        display : 10, bizTycdSel : types
      }
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