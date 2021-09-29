// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo:{}
    },
    //获取用户信息 无法获取唯一的微信号或手机号
    handleGetUserProfile(e){
        wx.getUserProfile({
          desc: '用于完善会员资料',
          success: (res) => {
            // 将用户信息储存到storage缓存中供user页面使用
            wx.setStorageSync('userinfo', res.userInfo);  
            // 登录后返回原页面
            wx-wx.navigateBack({
            delta: 1
            });  
          }
        });
    },
    // getUserInfo(e) {
    //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    //   this.setData({
    //     userInfo: e.detail.userInfo
    //   })
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {

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