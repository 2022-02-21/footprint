// pages/me/me.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: null,
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onLoad() {
        var user = wx.getStorageSync('user')
        console.log(user)
        this.setData({
            user
        })
        if (this.data.user == '') {
            wx.showToast({
                title: '点击头像登录',
                icon: 'error'
            })
        }
    },
    viewed: function () {
        if (this.data.user == '') {
            wx.showToast({
                title: '请先登录',
                icon: 'loading'
            })
            return;
        }
        wx.navigateTo({
            url: '/pages/viewed/viewed',
        })
    },
    login: function () {
        if (this.data.user == '') {
            wx.navigateTo({
                url: '/pages/login/login',
            })
        } else {
            wx.navigateTo({
                url: '/pages/info/info',
            })
        }

    },
    info: function () {
        wx.navigateTo({
            url: '/pages/info/info',
        })
    },
    quit: function () {
        wx.removeStorageSync('user')
        wx.removeStorageSync('viewed')
        wx.reLaunch({
            url: '/pages/login/login',
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