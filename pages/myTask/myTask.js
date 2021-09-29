// pages/myTask/myTask.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        requestList:[],
        userinfo:{},
        who:0, //0表示接收者（默认），1表示发布者
        url:'../../components/requestItem/requestItem?id='
    },

    /**
     * 生命周期函数--监听页面加载
     */

/*  数据库条件查询方法
    const _ = db.command
    db.collection('todos').where({
       // gt 方法用于指定一个 "大于" 条件，此处 _.gt(30) 是一个 "大于 30" 的条件
       progress: _.gt(30)
       })
       .get({
        success: function(res) {
        console.log(res.data)
        }
    })*/
    onLoad: function (options) {
        const userinfo=wx.getStorageSync('userinfo')
        this.setData({userinfo})
        const who=options.who
        this.setData({who})
        const _ = wx.cloud.database().command
        if(who==0){ //如果操作者是接受人
            wx.cloud.database().collection('request')
            .where({
                receiver: _.eq(options.id)
                // receiver: _.eq('idxxx')
            })
            .get().then(res=>{
                console.log('个人任务页获取成功',res)
                this.setData({
                    requestList:res.data
                })
            })
            .catch(res=>{
                console.log('个人任务页获取失败',res)
            })
        }
        else if(who==1){ //如果操作者是发布人
            //修改跳转地址到添加委托的页面
            this.setData({
                url: '../../components/addRequest/addRequest?id='
            })
            //修改查询目标到发布者
            wx.cloud.database().collection('request')
        .where({
            publisher: _.eq(options.id)
        })
        .get().then(res=>{
            console.log('个人委托页获取成功',res)
            this.setData({
                requestList:res.data
            })
        })
        .catch(res=>{
            console.log('个人委托页获取失败',res)
        })
        }
        else  console.error();
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