// pages/info/info.js
Page({

     /**
     * 页面的初始数据
     */
    data: {
        imgUrl: '',
        nickname: 'cnldkp',
        phone:'.....'
    },
    changeAvatar: function () {
        wx.chooseMedia({
            count: 1, //最多选择9张
            mediaType: ['image'], //文件类型
            sizeType: ['original', 'compressed'], //图片尺寸  原图  压缩图
            sourceType: ['album', 'camera'], //图片来源  从相册选图，使用相机
            success: res => {
                console.log(res)
                // filePath可以作为img标签的src属性显示图片
                var filePath = res.tempFiles[0].tempFilePath;
                this.setData({
                    imgUrl: filePath
                })
            }
        })
    },

    jump:function () {
        wx.navigateTo({
          url: '/pages/modify/modify?username=' + encodeURIComponent(this.data.username) + "&gender=" + encodeURIComponent(this.data.gender),
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        var user = wx.getStorageSync('user')
        this.setData({
            nickname:user.nickname,
            phone:user.phone
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})