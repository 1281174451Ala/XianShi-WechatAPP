// components/requestItem/requestItem.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        requestItem:{},
        userinfo:{},
        isEqual:false,
        who:0
    },

    judge(){
        if(this.data.requestItem.receiver==this.data.userinfo.nickName){
            this.setData({
                isEqual:true
            })
        }
    },

    //接受委托
    handleReceive(options){
        let requestItem=this.data.requestItem
        let userinfo=this.data.userinfo
        console.log('当前用户信息'+ userinfo)
        if(userinfo=={}){            
            wx.navigateTo({
              url: '../../pages/login/login',
            })
            wx.showToast({
                title: '请先登录',
                icon:'error'
              })
            return
        }
        wx.cloud.database().collection('request')
        .doc(this.data.requestItem._id)
        .update({
            data:{
                receiver: userinfo.nickName
            },
            success(res){
                console.log('接受成功',res)
                //刷新上一个页面 即分类页面
                const page=getCurrentPages()
                const beforePage=page[page.length-2]
                beforePage.onHide()
                //返回到上一个页面
                wx-wx.navigateBack({
                    delta: 1
                });
                wx.showToast({
                    title: '接受成功',
                  })  
            }
        })

    },
    //放弃委托
    handleGiveup(){
        const userinfo=this.data.userinfo
        wx.cloud.database().collection('request')
        .doc(this.data.requestItem._id)
        .update({
            data:{
                receiver: ''
            },
            success(res){
                console.log('放弃成功',res)
                //刷新上一页面
                const page=getCurrentPages()
                const beforePage=page[page.length-2]
                beforePage.onLoad(userinfo.nickName)
                //回到上一页
                wx-wx.navigateBack({
                    delta: 1
                });  
                wx.showToast({
                    title: '成功放弃',
                  })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('委托详情页接收到',options)
        this.setData({
            who: options.who
        })
        wx.cloud.database().collection('request')
        .doc(options.id)
        .get().then(res=>{
            console.log('委托详情页获取成功',res)
            this.setData({
                requestItem:res.data
            })
            this.judge()
            console.log(this.data.isEqual)
        })
        .catch(res=>{
            console.log('委托详情页获取失败',res)
        })
        const userinfo=wx.getStorageSync('userinfo')
        this.setData({userinfo})
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