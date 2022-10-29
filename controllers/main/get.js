const axios = require('axios');
const convert = require('xml-js');
const getConnection  = require('../../dbConnect')
const { placeDataURL, changeRegionCode, naverNewsURL} = require('../../modules/utils')

module.exports = async (req, res) => {
  try{
    const { user_id } = req //token복호화하여 앞에 저장해놓은 값을 꺼내기
    const dbConnect = await getConnection
    
    let userData = await dbConnect.query(`
        select USERS_TB.user_state, USERS_TB.user_city 
        from USERS_TB 
        where user_id = ?
      `, user_id)
      //유조의 관심분야를 불러온다.

      let { stateCode, cityCode } = changeRegionCode(userData[0]["user_state"], userData[0]["user_city"])
      //유저의 지역 정보를 api옵션에 해당하는 지역코드로 변경한다. 

      let place_params = {
        pageIndex : 1, openApiVlak : process.env.API_SECRET_KEY, 
        display : 10 , srchAreaCpvn : stateCode, 
      }
      //시, 군, 구 데이터가 존재할 때 params에 해당 도시의 코드를 넣어준다.
      if (cityCode != null) { place_params["srchAreaSggn"] = cityCode }

      //장소 코드 넣기 
      let placeData = await axios({
      method : "get",
      url : placeDataURL,
      params : place_params
    })// xml 파일 형식으로 온다.

    // var encodingTo_utf8 = Buffer.from('청년정책', 'utf-8').toString();
    // console.log(encodingTo_utf8)

    let changePlaceData = convert.xml2js(placeData.data, {compact: true})
      //xml 데이터를 js로 변환

    let newsData = await axios({
      method : "get",
      url : naverNewsURL,
      headers : {
        "X-Naver-Client-Id" : process.env.NEWSAPI_ID_KEY,
        "X-Naver-Client-Secret" : process.env.NEWSAPI_SECRET_KEY
      }, 
      params : {
        query : encodeURI("MZ"),
        display : 12,
        sort : "sim"
      }
    })

    return res.status(200).json({
      status : 200,
      place_data : changePlaceData,
      news_data : newsData.data
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