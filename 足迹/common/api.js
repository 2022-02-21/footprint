
const $http = require("./request")
export const _getScenicSpot = async () =>{
    let options = {
        url:"/268-1?showapi_appid=1253491&showapi_sign=fa4b667515b94f14b257b5ef5c306149"
    }
    return await $http(options)
}
export const _getScenicSpotByName = async (keyword) =>{
  let options = {
      url:"/268-1?showapi_appid=1253491&showapi_sign=fa4b667515b94f14b257b5ef5c306149",
      data:{
        keyword:keyword
      }
  }
  return await $http(options)
}
