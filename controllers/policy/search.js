const axios = require('axios');
const convert = require('xml-js');
const { getConnection } = require('../../dbConnect')
const { policyDataURL, changeRegionCode } = require('../../modules/utils')

module.exports = async (req, res) => {
  try{
    let { query, pageIndex } = req.query
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    const dbConnect = await getConnection()
    
    let userData = await dbConnect.query(`
        select USERS_TB.user_state, USERS_TB.user_city 
        from USERS_TB 
        where user_id = ?
      `, user_id)
      //유조의 관심분야를 불러온다.

      let { stateCode } = changeRegionCode(userData[0]["user_state"], userData[0]["user_city"])
      //유저의 지역 정보를 api옵션에 해당하는 지역코드로 변경한다. 

      // query = iconv.encode(query, 'euc-kr');

      let policy_params = {
        pageIndex : pageIndex || 1, openApiVlak : process.env.API_SECRET_KEY, 
        display : 10 , srchAreaCpvn : stateCode, query
      }
      //시, 군, 구 데이터가 존재할 때 params에 해당 도시의 코드를 넣어준다.

      console.log(policy_params);

      //장소 코드 넣기 
      let policyData = await axios({
      method : "get",
      url : policyDataURL,
      params : policy_params
    })// xml 파일 형식으로 온다.

    let changeData = convert.xml2js(policyData.data, {compact: true})
      //xml 데이터를 js로 변환

    return res.status(200).json({
      status : 200,
      search_data : changeData,
    })
    //xml을 json으로 변경
  }catch(err){
    console.log("err : ", err);
    return res.status(500).json({
      status: 500,
      message : "server error"
    })
  }
}
