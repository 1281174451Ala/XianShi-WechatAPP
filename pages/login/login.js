// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo: {},
      openid: '1',
      isExist: false //判断是否已分配账号
    },

    //云函数获取openid
    getOpenid(res){
      let that=this
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res=>{
          console.log('获取openid成功',res.result.openid)
          that.setData({
            openid: res.result.openid
          })
        }
      })
      const openid=this.data.openid
      console.log(openid)
    },

    //获取微信用户信息并保存到缓存中
    handleGetUserProfile(e){
      this.getOpenid()
      const openid=this.data.openid
      //获取用户信息 无法获取唯一的微信号或手机号
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            ['userInfo.openid']: openid
          })
          let userinfo=this.data.userInfo
          // 将用户信息储存到storage缓存中供user页面使用
          wx.setStorageSync('userinfo', userinfo);  
          console.log(userinfo)
          // //同时为微信用户分配一个账号并储存到user表中
          // const _ = wx.cloud.database().command
          // wx.cloud.database().collection('user').where({
          //   openid: _.eq(openid)
          // }).get().then(res=>{
          //   if(res.data.length!=0){
          //     this.setData({
          //       isExist: true 
          //     })
          //   }
            
          // })
          // if(!this.data.isExist){
          //   wx.cloud.database().collection('user').add({
          //     data:{
          //       openid: openid,
          //       name: userinfo.nickName,
          //       img: userinfo.avatarUrl,
          //       address: ''
          //     },
          //     success(res){
          //       console.log('添加账户成功', res)
          //     }
          //   })
          // }
          
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
      this.getOpenid()
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