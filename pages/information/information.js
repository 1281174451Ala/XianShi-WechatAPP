// pages/information/information.js
let totalNum=-1
let utils=require('../../utils/util.js')
import {RequestService} from '../../utils/monitor/requestService'
let requestService=new RequestService()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        informationList:[], //存放消息数据
        isHidden:true, //是否隐藏复选框
        buttonText:['删除','取消'], //按钮显示文本
        checkResult:[], //存放选中结果
    },

    //切换复选框的显示与否
    handleCheck(){
        this.setData({
            isHidden:!this.data.isHidden,
            buttonText: this.data.buttonText.reverse()
        })
        if(this.data.isHidden){ //隐藏复选框时清除所有勾选
            this.setData({
                checkResult:[]
            })
        }
    },

    //获取勾选结果
    handleChange(e){
        console.log(e)
            this.setData({
                checkResult: e.detail.value
            })
        console.log(this.data.checkResult)
    },

    //长按消息
    handleLongpress(e){
        console.log(e)
        this.handleCheck()
        // this.handleChange(e)
    },

    //删除前提示窗口
    handleDelete(){
        let that=this
        wx.showModal({
            title: '提示',
            content: '是否确定删除',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.delete() //真正的删除操作
                that.onLoad() //刷新页面
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
    },
    //删除消息
    delete(){
        let that=this
        let checkResult=that.data.checkResult
        for(let i=0;i<checkResult.length;i++){
            let j=i

            let res=requestService.dbDelete('information',checkResult[j],'删除成功')
            res.then(function(result){
            if(result){
                if(j==that.data.informationList.length-1){ 
                    console.log('删除成功',res)
                    wx.showToast({
                        title: '删除成功',
                    })
                    that.handleCheck()
                    that.onLoad()
                } 
            }
            })

            // wx.cloud.database().collection('information').doc(checkResult[j])
            // .remove({
            //     success: function(res) {
            //         if(j==that.data.informationList.length-1){ 
            //             console.log('删除成功',res)
            //             wx.showToast({
            //                 title: '删除成功',
            //             })
            //             this.handleCheck()
            //         } 
            //     }
            // })
        }
    },

    // getDBList(){
    //     let informationList=this.data.informationList
    //     //参数分别为this指针，数据库表名，存放结果的列表名，存放结果的列表，数据库表总长度
    //    utils.getDBList(this,'information','informationList',informationList,totalNum)
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this
        const userinfo=wx.getStorageSync('userinfo')
        const _ = wx.cloud.database().command
        let where={
            receiver: _.eq(userinfo.openid)
        }
        let res=requestService.dbSearch('information',where,'个人消息页获取成功')
        res.then(function(result){
            if(result!=false){
                let reverse=result.data.reverse() //倒序，让时间最近的消息出现在最上方
                that.setData({
                    informationList:reverse
                })

                /*根据信息表中的委托id查找出对应委托标题和相关人
                  注意：委托放弃时接受人为空，此后再次被其他人接受后，此条消息会显示当前新的接受人
                  这样旧消息也会显示最新的委托信息，是好是坏？
                */
                let informationList=that.data.informationList
                for(let i=0;i<informationList.length;i++){ 
                    let j=i

                    let res=requestService.dbDocument('request',informationList[j].request_id,'获取消息相关信息成功')
                    res.then(function(result){
                        if(result!=false){
                            informationList[j]['title']=result.data.title, 
                            informationList[j]['receiver_name']=result.data.receiver_name,
                            informationList[j]['publisher_name']=result.data.publisher_name, 
                            that.setData({ // 需要重新setData 下才能js 和 wxml 同步，wxml才能渲染新数据
                                informationList: that.data.informationList
                            })
                        }
                    })
                }
                console.log(informationList)
            }
        })

        // wx.cloud.database().collection('information')
        // .where({
        //     receiver: _.eq(userinfo.openid)
        //     // receiver: _.eq('oB-9v5JfRBjatdErq8VTWCBdeFFc')
        // })
        // .get().then(res=>{
        //     console.log('个人消息页获取成功',res)
        //     let reverse=res.data.reverse() //倒序，让时间最近的消息出现在最上方
        //     that.setData({
        //         informationList:reverse
        //     })
        //     /*根据信息表中的委托id查找出对应委托标题和相关人
        //       注意：委托放弃时接受人为空，此后再次被其他人接受后，此条消息会显示当前新的接受人
        //       这样旧消息也会显示最新的委托信息，是好是坏？
        //     */
        //     let informationList=that.data.informationList
        //     for(let i=0;i<informationList.length;i++){ 
        //         let j=i
        //         wx.cloud.database().collection('request')
        //         .doc(informationList[j].request_id)
        //         .get().then(res=>{
        //             // informationList.forEach((r) => { 
        //             //     r.title = res.data.title,   //r = array[0]的所有数据，这样直接 r.新属性 = 属性值 即可
        //             //     r.receiver_name=res.data.receiver_name, //用于页面显示接收人
        //             //     r.publisher_name=res.data.publisher_name //用于页面显示发布人
        //             //   })

        //             //这里直接用i会报错，用j锁定住i的值才行，原因不明，猜测是代码乱序执行的结果
        //             informationList[j]['title']=res.data.title, 
        //             informationList[j]['receiver_name']=res.data.receiver_name,
        //             informationList[j]['publisher_name']=res.data.publisher_name, 
        //             that.setData({ // 需要重新setData 下才能js 和 wxml 同步，wxml才能渲染新数据
        //                 informationList: that.data.informationList
        //             })
                    
        //         })
        //     }
        //     console.log(informationList)
        // })
        // .catch(res=>{
        //     console.log('个人消息页获取失败',res)
        // })
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
        this.onLoad()
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