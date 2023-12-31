// pages/search/search.js
const {_getScenicSpotByName} = require("../../common/api")
let recordStartX = 0, currentOffsetX = 0, curIndex = 0;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        spots: [], //多个景点
        category: false, //筛选
        offsetNum:-160,
        spot:[], //景点详情
        keyword:''
    },
    // 根据关键字查询
    async getScenicSpotByName(keyword){
      let response = await _getScenicSpotByName(keyword)
      console.log(response);
      wx.setStorageSync('spot', response.data.showapi_res_body.pagebean.contentlist[0])
      if(this.data.keyword != ''){
        this.setData({
          spots: response.data.showapi_res_body.pagebean.contentlist
        })
      }
     
    },
    // search
    input:function (e) {
      console.log(e);
      this.setData({
        keyword:e.detail.value
      })
    },
    search:function (e) {
      this.getScenicSpotByName(this.data.keyword)

    },
    // 查看详情
    detail:function(e){
      console.log(e);
      let keyword = e.currentTarget.dataset.name
      console.log(keyword);
      this.getScenicSpotByName(keyword)
      wx.navigateTo({
        url: '/pages/detail/detail',
      })
      // let response = await _getScenicSpotByName()
      // console.log(response);
    },
    // 筛选
    category: function () {
        this.setData({
            category: !this.data.category
        })
    },
     /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let spots = wx.getStorageSync('spots')
        console.log(spots);
        this.setData({
            spots: spots
        })
    },

    touchStart: function (e) { //触摸开始，记初始值，并记录当前触摸的下标
        console.log(e);
        recordStartX = e.touches[0].clientX;
        curIndex = e.currentTarget.dataset.index;
        // currentOffsetX = this.data.spots[curIndex].offsetX;
        // console.log(this.data.spots[curIndex]);
        // console.log(currentOffsetX);
    },
    touchMove: function (e) { //移动手指
        let spots = this.data.spots;
        let x = e.touches[0].clientX;
        // console.log("x---" + x);
        let mx = recordStartX - x;
        // let result = currentOffsetX - mx;
        // console.log("result--;"+ spots[curIndex].offsetX );

        if (mx / (wx.getSystemInfoSync().windowWidth / 750) >= -this.data.offsetNum) {
            spots[curIndex].offsetX = this.data.offsetNum;
            // console.log("okoko----"+spots[curIndex].offsetX);
        } else {
            spots[curIndex].offsetX = -mx / (wx.getSystemInfoSync().windowWidth / 750);
        }
        this.setData({
            spots
        });
    },
    touchEnd: function (e) { //手指抬起来(触摸结束)
        let spots = this.data.spots;
        let item = spots[curIndex];
        // console.log(item);
        let halfOffset = this.data.offsetNum * (wx.getSystemInfoSync().windowWidth / 750) * 2.3; /*滑过一半就直接滑到终点，滑不到一半就再回去*/
        console.log("hos--" + halfOffset + "--" + item.offsetX);
        if (item.offsetX < halfOffset) { //这里要做判断，总不能滑一半扔那儿不管了吧
            item.offsetX = this.data.offsetNum;
        } else {
            item.offsetX = 0;
        }
        this.setData({
            spots
        });
    }
})