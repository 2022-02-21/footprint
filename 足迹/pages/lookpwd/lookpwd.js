const app = getApp();
//倒计时
function countdown(that) {
    var second = that.data.second
    if (second == 0) {
        that.setData({
            disabled: true
        });
        return;
    }
    var time = setTimeout(function () {
        that.setData({
            second: second - 1
        });
        countdown(that);
    }, 1000)
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        no: null,
        form_index: 0,
        second: 30,
        disabled: false,
        mask: true
    },
    switchChange: function (e) {
        // console.log(e.detail.value)
        this.setData({
            mask: !e.detail.value
        })
    },
    submit_email: function (e) {
        // console.log(e);
        var no = e.detail.value.no;
        var email = e.detail.value.email;
        if (email == null || email == '') {
            wx.showToast({
                title: '请输入邮箱',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        wx.showLoading({
            title: '加载中...',
        })
        wx.request({
            url: app.globalData.url.forgotpwd,
            method: 'POST',
            data: {
                no: no,
                email: email
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                wx.hideLoading();
                console.log(res.data);
                if (res.data.error) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                    })
                } else {
                    this.setData({
                        no: no,
                        second: res.data.expire
                    });
                    countdown(this);
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                    })
                    setTimeout(() => {
                        this.setData({
                            form_index: 1
                        });
                    }, 2000)
                }
            }
        })

    },
    //重设密码
    submit_password: function (e) {
        // console.log(e);
        var pwd = e.detail.value.pwd;
        var validcode = e.detail.value.validcode;
        if (validcode == '' || validcode == null || pwd == '' || pwd == null) {
            wx.showToast({
                title: '验证码和密码不能为空',
                icon: 'none',
                duration: 2000
            })
        } else {
            wx.request({
                url: app.globalData.url.initpassword,
                method: 'POST',
                data: {
                    no: this.data.no,
                    pwd: pwd,
                    validcode: validcode
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
                    // wx.hideLoading();
                    console.log(res.data);
                    if (res.data.error) {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'success',
                            duration: 2000
                        })
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 2000)
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})