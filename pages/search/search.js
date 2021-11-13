// pages/search/search.js
let Timeid=-1 //防抖的定时器
import {RequestService} from '../../utils/monitor/requestService'
let requestService=new RequestService()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      checkboxList:[
        {
          id:0,
          name:'搜标题',
          value:'title',
          default:true
        },
        {
          id:1,
          name:'搜内容',
          value:'body',
          default:false
        }
      ],
      checkResult:['title'],
      requestList:[],
      isFocus:false, //是否隐藏清空按钮
      inputValue:'',
      userinfo:{}
    },

    //获取复选框的勾选情况
    handleChange(e){
      this.setData({
        checkResult: e.detail.value
      })
      console.log(this.data.checkResult)
    },

    // //判断字符串是否在列表内
    // isIn(str,list){
    //   console.log('__',list.length)
    //   for (var i=0;i<list.length;i++){
       
    //     if (list[i]==str){
    //       return true;
    //     }
    //   }
    //   return false
    // },

    // 获取用户输入的关键词
    getInput(options){
      let that=this
      const {value}=options.detail;
      let checkResult=that.data.checkResult;
      // console.log(checkResult)
      // let t='title'
      // console.log(t in checkResult)
      if (!value.trim() || checkResult.length==0){   //trim()检查输入合法性
        that.setData({
          requestList:[],
          isFocus:false
        })
        return;
      }
      that.setData({ //显示清空按钮
        isFocus:true
      })
      const _ = wx.cloud.database().command
      clearTimeout(that.Timeid) //清除定时器
      that.Timeid=setTimeout(()=>{
        if(checkResult.length==2){ //如果两个都选了，就同时检索标题和内容
          let where=(
            _.or({
              title: wx.cloud.database().RegExp({
                regexp: options.detail.value,  
                options:'i'
              })
            },
            {body: wx.cloud.database().RegExp({
              regexp: options.detail.value ,
              options:'i'
              })
            })
          )
          let res=requestService.dbSearch('request',where,'搜索成功')
          res.then(function(result){
            if(result!=false){
              that.setData({
                requestList:[...that.data.requestList,...result.data]
              })
            }
          })

          // wx.cloud.database().collection('request')
          // .where(_.or({
          //   title: wx.cloud.database().RegExp({
          //     regexp: options.detail.value,  
          //     options:'i'
          //   })
          // },
          // {body: wx.cloud.database().RegExp({
          //   regexp: options.detail.value ,
          //   options:'i'
          //   })
          // }
          // ))
          // .get().then(res=>{
          //   console.log('搜索成功',res)
          //   this.setData({
          //     requestList:[...this.data.requestList,...res.data]
          //   })
          // })
          // .catch(res=>{
          //   console.log('搜索失败',res)
          // })
        }
        else if(checkResult.length==1){ //如果只选了一个
          if(checkResult[0]=='title'){ //选了标题
            let where={
              title: wx.cloud.database().RegExp({
                regexp: options.detail.value,  
                options:'i'
              })
            }
            let res=requestService.dbSearch('request',where,'搜索成功')
            res.then(function(result){
              if(result!=false){
                that.setData({
                  requestList:[...that.data.requestList,...result.data]
                })
              }
            })
            
            // wx.cloud.database().collection('request')
            // .where({
            //   title: wx.cloud.database().RegExp({
            //     regexp: options.detail.value,  
            //     options:'i'
            //   })
            // })
            // .get().then(res=>{
            //   console.log('搜索标题成功',res)
            //   this.setData({
            //     requestList:[...this.data.requestList,...res.data]
            //   })
            // })
            // .catch(res=>{
            //   console.log('搜索标题失败',res)
            // })
          }
          if(checkResult[0]=='body'){ //选了内容
            let where={
              body: wx.cloud.database().RegExp({
                regexp: options.detail.value ,
                options:'i'
              })
            }
            let res=requestService.dbSearch('request',where,'搜索成功')
            res.then(function(result){
              if(result!=false){
                that.setData({
                  requestList:[...that.data.requestList,...result.data]
                })
              }
            })

            // wx.cloud.database().collection('request')
            // .where({
            //   body: wx.cloud.database().RegExp({
            //     regexp: options.detail.value ,
            //     options:'i'
            //   })
            // })
            // .get().then(res=>{
            //   console.log('搜索内容成功',res)
            //   this.setData({
            //     requestList:[...this.data.requestList,...res.data]
            //   })
            // })
            // .catch(res=>{
            //   console.log('搜索内容失败',res)
            // })
          }
        }
      },500) //0.5秒后发送请求，0.5秒内有新输入则刷新
    },
    //清空搜索框
    handleClear(){
      this.setData({
        requestList:[],
        isFocus:false,
        inputValue:''
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        userinfo:wx.getStorageSync('userinfo')
      })
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