// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo:{}
    },
    //注销
    handleLogout(){
        console.log(this.data.userinfo)
        let info=JSON.stringify(this.data.userinfo) 

        if( info== '{}' ){
            console.log('注销前'+this.data.userinfo)
            wx.showToast({
              title: '请先登录',
              icon:'error'
            })
            return
        }
        //清除系统缓存
        wx.setStorageSync('userinfo', {});
        //清除页面数据
        this.setData({
            userinfo:{}      
        })
        wx.showToast({
          title: '已注销',
        })
    },
    //未登录状态试图操作时提示错误
    handleUnlog(){
        wx.showToast({
          title: '请先登录',
          icon:'error'
        })
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
        // 获取缓存中的用户信息并保存到data的userinfo中
        const userinfo=wx.getStorageSync('userinfo')
        this.setData({userinfo})
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