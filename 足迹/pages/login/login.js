// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAgree: false,
        isPlay: true

    },
    isAgree: function (e) {
        this.setData({
            isAgree: !this.data.isAgree
        })
        console.log(this.data.isAgree);
    },
    login(e) {
        console.log(e);
        if (this.data.isAgree == false) {
            wx.showToast({
                title: '请同意协议',
                icon: 'error'
            })
            return;
        }
        let phone = e.detail.value.phone
        let password = e.detail.value.password
        let userForm = JSON.stringify({
            phone,
            password
        })
        wx.request({
            url: 'http://127.0.0.1:3000/users/login',
            method: "POST",
            data: userForm,
            success: res => {
                console.log(res);
                if (res.data.code == 200 && res.data.data[0] != null) {
                    // 用户信息，存储到缓存中
                    wx.setStorageSync('user', res.data.data[0])

                    wx.reLaunch({
                        url: '/pages/index/index',
                    })
                    wx.showToast({
                        title: "登陆成功",
                        icon: "success"
                    })
                } else {
                    wx.showModal({
                        title: '账号不存在',
                    })
                    wx.navigateTo({
                        url: '/pages/register/register',
                    })
                }
            },
            fail: err => {
                console.log("密码输入错误");
            }
        })
    },
    onReady() {
        this.bgm = wx.getBackgroundAudioManager()
        this.bgm.title = "旅行" //音乐标题，必须写，否则不会播放
        // this.bgm.epname = '旅行'
        this.bgm.singer = "阿木" //演唱者
        this.bgm.coverImgUrl = "http://p2.music.126.net/rYiZ7Cl-sjwvEbLmHCF5Tg==/109951166171257812.jpg?param=130y130" //专辑封面
        this.bgm.src = 'https://music.163.com/song/media/outer/url?id=1867149666'
        this.bgm.onEnded(() => { //重新赋值时会自动播放
            this.bgm.src = 'https://music.163.com/song/media/outer/url?id=1867149666'
        })
        this.bgm.onPause(() => {
            this.setData({
                isPlay: false
            })
        })
        this.bgm.onPlay(() => {
            this.setData({
                isPlay: true
            })
        })
    },
    play() { //单击控制音乐的播放与暂停
        if (this.data.isPlay) {
            this.bgm.pause()
        } else {
            this.bgm.play()
        }
        this.setData({
            isPlay: !this.data.isPlay
        })
    },
})