const Observer=require('./observer')
import {RequestService} from './requestService'
// class Observer{
    
//     update(){
//         /* 接收到被监听对象传来的消息后进行更新操作
//         */
//         console.log('observer.update')
//     }
// }
class RequestObserver extends Observer{
    constructor(){
        super()
        this.service=new RequestService() //为了发送消息，需要通过service类从数据库中读出收件人openid

    }
    getReceiver(_id){ //根据service传来的id查出消息的接收人
        console.log('requestObserver.getReceiver',_id)
        let that=this
        let res=that.service.dbDocument('request',_id,'查找接收人成功')
        return res
        // res.then(function(reslut){
        //     if(reslut!=false){
        //         that.receiver=[result.data.publisher,reslut.data.receiver]
        //     }
            
        // })
    }
    cloudSend(content,_id,who){ //云函数向用户直接发通知（需要勾选允许通知）
        console.log('requestObserver.cloudSend')
        // console.log('pages/requestItem/requestItem?id='+_id+'&who='+who)
        let that=this
        let res=that.service.dbDocument('request',_id,'查找标题成功')
        res.then(function(reslut){
            if(reslut!=false){
                let item=reslut.data
                let publisher=item.publisher
                if(who==0){
                    publisher=item.receiver
                }
                console.log(item)
                wx.cloud.callFunction({
                    name:'sendMessage',
                    data:{
                      openid: publisher,
                    //   page:'components/requestItem/requestItem?id='+_id+'&who='+who, 这里是点击通知后要跳转的页面 让它跳到首页比较合适
                    page:'pages/index/index',
                      type:'委托',
                      title:item.title,
                      content:content,
                      templateId:'-ylCZtWdD92Pv5tWHtUkUm4YnglWw_szTQMHJ_90gJQ'
                    }
                  }).then(res=>{
                    console.log('云函数发送成功',res)
                  }).catch(res=>{
                    console.log('云函数发送失败',res)
                  })
            }
        })
    }
    makeData(content,_id,type){ //需要添加到消息数据库的新消息
        let that=this
        console.log('requestObserver.makeData')
        let userinfo=wx.getStorageSync('userinfo')
        let mData={
            content:content,
            receiver:that.receiver[0], //接收方是此委托的发布人
            request_id:_id,
            sender:userinfo.openid, //发送方是操作者，即此委托的接受人
            time:new Date().getTime(),
            type:type //消息类型 true表示发布人会收到此消息， false表示接受人会收到此消息
        }
        return mData
    }
    update(data,_id){ //对监听到的数据做更新
        let that=this
        console.log('RequestObserver.update')
        console.log(data)
        for(var key in data){
            if(key=='state'){ //如果监听到委托状态的改变
                let state=data[key]
                console.log(state)
                let res=that.getReceiver(_id) //根据service传来的id查出消息的接收人
                res.then(function(result){
                    if(result!=false){
                        that.receiver=[result.data.publisher,result.data.receiver]
                        console.log('then')
                        switch (state){
                            //1->0 委托被接受 
                            case 0: { 
                                console.log('case0')
                                //向消息数据库发送新消息
                                let mData=that.makeData(that.message[0],_id,true)
                                that.service.dbAdd('information',mData,'发送消息成功')
                                //发送通知到发布人微信
                                that.cloudSend(that.message[0],_id,1)
                                break
                            }
                            //0->1 委托被放弃 
                            case 1:{
                                console.log('case1')
                                //向消息数据库发送新消息
                                let mData=that.makeData(that.message[1],_id,true)
                                that.service.dbAdd('information',mData,'发送消息成功')
                                //发送通知到发布人微信
                                that.cloudSend(that.message[1],_id,1)
                                break
                                
                            }
                            //0->2 委托被完成 
                            case 2:{
                                //向消息数据库发送新消息
                                let mData=that.makeData(that.message[2],_id,true)
                                that.service.dbAdd('information',mData,'发送消息成功')
                                //发送通知到发布人微信
                                that.cloudSend(that.message[2],_id,1)
                                break
                            }
                            //2->-1 委托被确认 
                            case -1:{
                                //向消息数据库发送新消息
                                let mData=that.makeData(that.message[-1],_id,false)
                                that.service.dbAdd('information',mData,'发送消息成功')
                                //发送通知到发布人微信
                                that.cloudSend(that.message[2],_id,0)
                                break
                            }
                            default: console.error();
                        }
                    }
                })                                                        
                break
            }
        }
        // data.foreach((v,i)=>{
        //     console.log(v)
        //     console.log(i)
        //     if(v=='state'){
        //         console.log(v[i])
        //     }
        // })
    }
}

// module.exports={
//     RequestObserver:RequestObserver,
// }

//export导出写法一 在app.js导入
module.exports=RequestObserver