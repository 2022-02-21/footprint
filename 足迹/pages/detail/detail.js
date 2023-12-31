// pages/detail/detail.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk1.0/qqmap-wx-jssdk.min.js')
var key = '3SBBZ-L2ZKX-TMD4U-7XHY7-GQBMJ-7UBOB'
Page({
  qqmapsdk: new QQMapWX({
    key: key
  }),
  /**
   * 页面的初始数据
   */
  data: {
    viewed:[],//浏览记录
    spot:[],  // 景点
    // 左滑
    item: 0,
    tab: 0,
    // map
    mapw: '100%', // 地图宽度
    maph: '0', // 地图高度
    scale: '18', // 缩放
    longitude: null, // 地图中心点经度
    latitude: null, // 地图中心点纬度
    markers: null // 标记点
  },

  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    })
  },
  changeTab: function (e) {
    console.log(e)
    this.setData({
      tab: e.detail.current
    })
  },
  mapCtx: null,
  onLoad: function () {
    //创建map上下文MapContext对象，可以操作页面上的map组件
    this.mapCtx = wx.createMapContext('map')
    var mapw, maph
    // 获取窗口的宽度和高度
    wx.getSystemInfo({
      success: res => {
        mapw = res.windowWidth // 设备宽度
        maph = res.windowHeight // 设备高度
      }
    })
    this.setData({
      maph: maph + 'px'
    })
  },
  // 获取当前位置(经纬度)
  onReady: function () {
    var spot = wx.getStorageSync('spot')
    var viewed = wx.getStorageSync('viewed')
    console.log(viewed);
    viewed.push(spot)
    wx.setStorageSync('viewed', viewed)
    console.log(spot)
    this.setData({
      spot:spot,
      longitude: spot.location.lon,
      latitude: spot.location.lat
    })
},
bindRegionChange: function (e) {
  if (e.type === 'end') {
    this.mapCtx.getCenterLocation({
      success: res => {
        this.getFood(res.longitude, res.latitude)
      }
    })
  }
},
getFood: function (longitude, latitude) {
  this.qqmapsdk.search({
    keyword: '餐厅',
    location: {
      longitude: longitude,
      latitude: latitude
    },
    success: res => {
      console.log(res.data)
      var mark = []
      for (let i in res.data) {
        mark.push({
          iconPath: '/images/food.png', //标记点图片路径
          id: Number(i),
          latitude: res.data[i].location.lat, //标记点纬度
          longitude: res.data[i].location.lng, //标记点经度
          width: 2,
          height: 2
        })

      }
      mark.push({
        iconPath: '/images/center.png',
        id: res.data.length,
        latitude: latitude,
        longitude: longitude,
        width: 15,
        height: 15
      })
      // 将搜索结果显示在地图上
      this.setData({
        markers: mark
      })

    }

  })
},
})