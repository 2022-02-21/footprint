// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree:false
  },
  isAgree:function(e){
    this.setData({
      isAgree:!this.data.isAgree
    })
    console.log(this.data.isAgree);
  },
  /* 正则判断函数 */
  isPasswd(s) {
    var pat = /^(\w){6,20}$/
    if (!pat.exec(s)) {
      return false
    }
    return true
  },
  register(e) {
    if(this.data.isAgree == false){
      wx.showToast({
        title: '请同意协议',
        icon:'error'
      })
      return;
    }
    /* 小程序的异步请求 */
    let phone = e.detail.value.phone
    let password = e.detail.value.password
    let password2 = e.detail.value.password2

    let userForm = JSON.stringify({
      phone,
      password,
    })
    /* 判断用户不能输入为空 */
    if (phone == "" || password == "" || password2 == "") {
      wx.showModal({
        title: '不能输入为空',
      })
      return
    }
    /* 二次密码输入不一致 */
    if (password != password2) {
      wx.showModal({
        title: '二次密码输入不一致',
      })
    }
    /* 判断密码6-20包含字母，下划线，数字 */
    if (!this.isPasswd(password)) {
      wx.showModal({
        title: '格式不对',
      })
    }
    console.log(userForm);
    wx.request({
      url: 'http://127.0.0.1:3000/users/reg',
      method: 'POST',
      data: userForm,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        if (res.data.code == 200 && res.data.data[0] != null) {
          wx.reLaunch({
            url: '/pages/login/login',
          })
          wx.showModal({
            title: '注册成功',
          })
        }else{
          wx.showModal({
            title: res.data.msg,
          })
        }
      },
      fail:err =>{
        console.log("稍后重试");
      }
    })
    // /* 直接开始渲染添加一个数据 */
    // if (!e.detail.value == "") {
    //   /* 判断里面是否有数据有就+1 没有直接就是1 */
    //   let id = this.data.user.length > 0 ? this.data.user[0].id + 1 : 1
    //   let {
    //     name,
    //     password
    //   } = e.detail.value
    //   let obj = {
    //     id,
    //     name,
    //     password
    //   }
    //   this.data.user.unshift(obj)
    //   this.setData({
    //     user: this.data.user
    //   })
    //   wx.showModal({
    //     title: '注册成功，跳转登陆页面'
    //   })
    //   /* 设置一个定时器跳转页面加载一下 */
    //   setTimeout(() => {
    //     wx.navigateTo({
    //       url: '/pages/logs/logs',
    //     })
    //   }, 3000)

    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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