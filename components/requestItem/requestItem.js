// components/requestItem/requestItem.js
let utils=require('../../utils/util.js')
// import {RequestObserver} from '../../utils/monitor/requestObserver'
// // let RequestObserver=require('../../utils/monitor/requestObserver')
// let obs=new RequestObserver()
const app=getApp()
let obs=app.globalData.obs
import {RequestService} from '../../utils/monitor/requestService'
let requestService=new RequestService()
requestService.addObs(obs)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        requestItem:{}, //委托具体信息
        chatList:[], //评论列表
        chat:'', //用户输入评论
        userInfo:{}, //用户信息
        who:'-1', //判断当前操作者 0表示接收者 1 表示发布者 默认-1表示其他人 控制wxml的标签显示
        isConfirm: false, //放弃委托前弹窗二次确认
        // who:0 
    },
    
    //接受委托
    handleReceive(){
        let that=this
        let requestItem=that.data.requestItem
        let userInfo=that.data.userInfo
        if(userInfo=={}){            
            wx.navigateTo({
              url: '../../pages/login/login',
            })
            wx.showToast({
                title: '请先登录',
                icon:'error'
              })
            return
        }
        let data={
            receiver: userInfo.openid,
            receiver_name: userInfo.nickName,
            state:0 //委托状态 0表示已接受
        }
        //为测试消息通知 暂时允许接受自己的委托

        // if(that.data.requestItem.publisher==that.data.userInfo.openid){
        //     wx.showToast({
        //         title: '不能接受\r\n自己的委托', //不会换行
        //         icon:'error'
        //       })
        //     return
        // }


        let res=requestService.dbUpdate('request',requestItem._id,data,'接受成功')
        res.then(function(result){
            if(result){
                //刷新上一个页面 即分类页面
                const page=getCurrentPages()
                const beforePage=page[page.length-2]
                beforePage.onHide()
                //返回到上一个页面
                wx.showToast({
                    title: '接受成功',
                })
                setTimeout(function(){
                    wx-wx.navigateBack({
                        delta: 1,
                    })
                },500)
            }
        })

        
        // wx.cloud.database().collection('request')
        // .doc(requestItem._id)
        // .update({
        //     data:{
        //         receiver: userInfo.openid,
        //         receiver_name: userInfo.nickName
        //     },
        //     success(res){
        //         console.log('接受成功',res)
        //         //发送消息给委托人
        //         that.send('您的委托已被接受',true)
        //         //刷新上一个页面 即分类页面
        //         const page=getCurrentPages()
        //         const beforePage=page[page.length-2]
        //         beforePage.onHide()
        //         //返回到上一个页面
        //         wx-wx.navigateBack({
        //             delta: 1
        //         });
        //         wx.showToast({
        //             title: '接受成功',
        //           })  
        //     }
        // })

    },

    //放弃前弹窗提示
    handleGiveup(){
        let that=this
        // utils.popup(that,'isConfirm','是否确定放弃此委托',that.giveup())
        wx.showModal({
            title: '提示',
            content: '是否确定放弃此委托',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.giveup()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
        })
     },

    //放弃委托
    giveup(){
       let that=this
    //    utils.popup(that,'isConfirm','是否确定放弃此委托')
    //    console.log(that.data.isConfirm)
    //    if(!that.data.isConfirm){
    //        return;
    //    } 
        let data={
            receiver: '',
            receiver_name: '',
            state:1 //委托状态 1表示可接受
        }
        const userInfo=that.data.userInfo

        let res=requestService.dbUpdate('request',that.data.requestItem._id,data,'放弃成功')
        res.then(function(result){
            if(result){

                /*对此用户施加惩罚*/

                //刷新上一页面
                const page=getCurrentPages()
                const beforePage=page[page.length-2]
                beforePage.onLoad(userInfo.openid)
                //回到上一页
                wx.showToast({
                    title: '已放弃此委托',
                  })
                setTimeout(function(){
                    wx-wx.navigateBack({
                        delta: 1,
                    })
                },500)
            }
        })

        // wx.cloud.database().collection('request')
        // .doc(that.data.requestItem._id)
        // .update({
        //     data:{
        //         receiver: '',
        //         receiver_name: ''
        //     },
        //     success(res){
        //         console.log('放弃成功',res)
        //          //发送消息给委托人
        //          that.send('您的委托已被接收人放弃',true)

        //         /*对此用户施加惩罚*/

        //         //刷新上一页面
        //         const page=getCurrentPages()
        //         const beforePage=page[page.length-2]
        //         beforePage.onLoad(userInfo.openid)
        //         //回到上一页
        //         wx-wx.navigateBack({
        //             delta: 1
        //         });  
        //         wx.showToast({
        //             title: '已放弃此委托',
        //           })
        //     }
        // })
    },
    //完成委托
    handleFinish(){
        let that=this
        //更新委托状态
        let data={
            state:2 //委托状态 2表示已完成
        }
        let res=requestService.dbUpdate('request',that.data.requestItem._id,data,'修改状态成功')
        res.then(function(result){
            if(result){
                //刷新上一页面
                const page=getCurrentPages()
                const beforePage=page[page.length-2]
                beforePage.onLoad(that.data.userInfo.openid)
                //回到上一页
                wx.showToast({
                    title: '已通知委托人，请耐心等待回应',
                    icon:'none'
                })
                setTimeout(function(){
                    wx-wx.navigateBack({
                        delta: 1,
                    })
                },500)  
                
            }   
        })
        

    },

    //确认完成前弹窗提示
    handleConfirm(){
        let that=this
        wx.showModal({
            title: '提示',
            content: '是否确认委托已完成',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.confirm()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
    },

    //确认委托已完成
    confirm(){
        let that=this
        let item=that.data.requestItem
        
        // //发送消息给接受人
        // wx.cloud.database().collection('information')
        // .add({
        //     data:{
        //         content:'委托人已确认，委托完成',
        //         receiver:item.receiver, //接收方是此委托的接受人
        //         request_id:item._id,
        //         sender:userinfo.openid, //发送方是操作者，即此委托的发布人
        //         time:new Date().getTime(),
        //         type:false //消息类型 true表示发布人会收到此消息，点击后跳转到addRequest页面， false表示接受人会收到此消息，点击后跳转到requestItem页面
        //     },
        //     success(res){
        //         console.log('发送消息成功', res)
        //     } 
        // })


        let data={
            state:-1 //委托状态 -1表示已确认 已确认的委托不会再出现在页面中，但数据库中依然保存着
        }
        let res=requestService.dbUpdate('request',that.data.requestItem._id,data,'修改状态成功')
        res.then(function(result){
            if(result){
                wx.showToast({
                  title: '已确认委托',
                })
            }
            /*系统支付报酬给接受人 完成委托*/
        })

        //从数据库删除委托
        // let res=requestService.dbDelete('request',item._id,'删除成功')
        // res.then(function(result){
        //     if(result){
        //         wx.showToast({
        //           title: '删除成功',
        //         })
        //     }
        // })
        
        // wx.cloud.database().collection('request').doc(item._id)
        // .remove({
        //     success: function(res) {
        //         console.log('删除成功',res)
        //         wx.showToast({
        //           title: '删除成功',
        //         })
        //     }
        // })
     },

    //获取用户输入评论
    getChatContent(e){
        this.setData({
            chat: e.detail.value
        })
    },

    //发表评论
    handlePublish(){
        let that=this
        let data={
            content: that.data.chat,
            request_id: that.data.requestItem._id,
            trade_id:-1,
            sender:that.data.userInfo.nickName,
            avatarUrl:that.data.userInfo.avatarUrl,
            send_time: new Date().getTime()
        }
        if(that.data.chat.length==0){ //检测输入合法性
            wx.showToast({
              title: '评论不能为空',
              icon:'none'
            })
            return
        }
        if(!that.data.userInfo.openid){ //检测输入合法性
            wx.navigateTo({
              url: '../../pages/login/login',
            })
            wx.showToast({
                title: '请先登录',
                icon:'error'
              })
            return
        }
        
        let res=requestService.dbAdd('chat',data,'发表评论成功')
        console.log(res)
        res.then(function(result){
            if(result){
                wx.showToast({
                    title: '发表评论成功',
                })
                let length=that.data.chatList.length
                that.data.chatList[length]=data
                that.setData({
                    chatList: that.data.chatList,
                    chat:''
                })
            }
        })
        // wx.cloud.database().collection('chat')
        // .add({
        //     data:{
        //         content: that.data.chat,
        //         request_id: that.data.requestItem._id,
        //         trade_id:-1,
        //         sender:that.data.userInfo.nickName,
        //         avatarUrl:that.data.userInfo.avatarUrl,
        //         send_time: new Date().getTime()
        //     },
        //     success(res){
        //         wx.showToast({
        //           title: '发表评论成功',
        //         })
        //         console.log('发表评论成功', res)
        //         let length=that.data.chatList.length
        //         that.data.chatList[length]=newChat
        //         that.setData({
        //             chatList: that.data.chatList,
        //             chat:''
        //         })
        //     } 
        // })
    },

    //获取所有评论
    getChat(){
        let that=this
        const _ = wx.cloud.database().command
        let where={
            request_id: _.eq(that.data.requestItem._id)
            // request_id: _.eq(1)
        }
        let res=requestService.dbSearch('chat',where,'评论获取成功')
        res.then(function(result){
            if(result!=false){
                that.setData({
                    chatList: that.data.chatList.concat(result.data)
                })
            }
        })

        // wx.cloud.database().collection('chat')
        // .where({
        //     request_id: _.eq(that.data.requestItem._id)
        //     // request_id: _.eq(1)
        // })
        // .get().then(res=>{
        //     console.log('评论获取成功',res)
        //     this.setData({
        //         chatList: that.data.chatList.concat(res.data)
        //     })
        // })
        // .catch(res=>{
        //     console.log('评论获取失败',res)
        // })
    },

    //点击图片放大
    handleImg(){
        /* data里设置一个属性 
        用于wx:if 切换样式 */

        /*或者跳转到新页面 
        在新页面全屏显示图片 */
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this
        console.log('委托详情页接收到',options)
        requestService.setId(options.id) //伪监听者提供此委托id
        if(options.who==0 ||options.who==1){
            this.setData({
                who: options.who
            })
        }

        let res=requestService.dbDocument('request',options.id,'委托详情页获取成功')
        res.then(function(result){
            if(result!=false){
                that.setData({
                    requestItem:result.data
                })
                that.getChat()
            }
        })

        // wx.cloud.database().collection('request')
        // .doc(options.id)
        // .get().then(res=>{
        //     console.log('委托详情页获取成功',res)
        //     this.setData({
        //         requestItem:res.data
        //     })
        //     this.getChat()
        // })
        // .catch(res=>{
        //     console.log('委托详情页获取失败',res)
        // })

        const userInfo=wx.getStorageSync('userinfo')
        this.setData({userInfo})
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
