
function $http(options={}){
    return new Promise((resolve, reject)=>{
        wx.request({
          url: 'https://route.showapi.com/' + options.url,
            data:options.data || {},
            hander:options.hander || {'content-type': 'application/json'},
            success:res=>{
                resolve(res)
            },
            fail: err=>{
                reject(err)
            }
        })
    })
}
module.exports = $http