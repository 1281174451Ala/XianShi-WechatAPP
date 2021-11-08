//被观察者
// class observerable{
//     constructor(){
//         this.obsArr=[]
//     }
//     addObs(obs){
//         this.obsArr.push(obs)
//     }
//     delObs(obs){
//         this.obsArr.forEach((v,i)=>{
//             if(v==obs){
//                 this.obsArr.splice(i,1)
//             }
//         })
//     }
//     notifyObservers(){
//         console.log('notifyObservers')
//         this.obsArr.forEach((v,i)=>{
//             v.update()
//         })
//     }
// }

class Service{
    constructor(){ 
        this.obsArr=[] //观察者列表
        this.id='' //发送消息用到的委托或交易id
    }
    setId(_id){ //设置id
        console.log('service.setId')
        this.id=_id
    }
    addObs(obs){ //添加观察者
        console.log('addObs')
        this.obsArr.push(obs)
    }
    delObs(obs){ // 删除观察者
        this.obsArr.forEach((v,i)=>{
            if(v==obs){
                this.obsArr.splice(i,1)
            }
        })
    }
    notifyObservers(data){ //将变化的数据通知给所有观察者 
        console.log('sercive.notifyObservers')
        this.obsArr.forEach((v,i)=>{
            v.update(data,this.id)
        })
    }
    //监听所有的对数据库的写操作
    // //向数据库添加新数据
    // dbAdd(db,data,log){
    //     let that=this
    //     return new Promise((reslove, reject) =>{
    //         wx.cloud.database().collection(db)
    //         .add({
    //             data,
    //             success(res){
    //                 console.log(log, res)
    //                 reslove(true)
    //                 that.notifyObservers(data) //为被监听的函数加上父类的notifyObservers()
    //             },
    //             fail(res){
    //                 console.log('添加数据失败',res)
    //                 reslove(false)
    //             }
    //         })
    //     })
        
    // }
    // //根据_id删除数据库数据
    // dbDelete(db,_id,log){
    //     let that=this
    //     return new Promise((reslove, reject) =>{
    //         wx.cloud.database().collection(db).doc(_id)
    //         .remove({
    //         success(res){
    //             console.log(log, res)
    //             reslove(true)
    //             that.notifyObservers(data)
    //         },
    //         fail(res){
    //             console.log('删除数据失败',res)
    //             reslove(false)
    //         }
    //     })
    //     })
        
    // }
    // //更新数据库数据
    // dbUpdate(db,_id,data,log){
    //     let that=this
    //     return new Promise((reslove, reject) =>{
    //         wx.cloud.database().collection(db).doc(_id)
    //         .update({
    //             data,
    //             success(res){
    //             console.log(log, res)
    //             reslove(true)
    //             that.notifyObservers(data)
    //             },
    //             fail(res){
    //             console.log('删除数据失败',res)
    //             reslove(false)
    //             }
    //         })
    //     })
        
    // }
    //向数据库添加新数据
    dbAdd(db,data,log){
       
    }
    //根据_id删除数据库数据
    dbDelete(db,_id,log){
        
    }
    //更新数据库数据
    dbUpdate(db,_id,data,log){
    
    }
    //where查询
    dbSearch(db,where,log){
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db)
            .where(
                where
            )
            .get().then(res=>{
                console.log(log, res)
                reslove(res)
            })
            .catch(res=>{
                console.log('查找失败',res)
                reslove(false)
            })
        })
        
    }
    //根据_id查询
    dbDocument(db,_id,log){
        let that=this
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db)
            .doc(_id)
            .get().then(res=>{
                console.log(log, res)
                reslove(res)
            })
            .catch(res=>{
                console.log('查找失败',res)
                reslove(false)
            })
        })
        
    }
    //读所有数据 每次读20条 尝试着用非promise形式封装
    getDBList(that,DB,listName,list,totalNum){//参数分别为this指针，数据库表名，存放结果的列表名，存放结果的列表，数据库表总长度
        let len=list.length //获取数组长度 用来跳过
        if (len==totalNum){
            wx.showToast({ //显示小弹窗提示用户
              title: '已经到底啦',
              icon:'none'
            })
            return
        }
        wx.showLoading({ //提示用户目前正加载下一页
          title: '加载中',
        })
        wx.cloud.database().collection(DB).skip(len).get()
        .then(res=>{ //箭头函数可以直接用this 不需要that
            console.log('获取成功',res)
            that.setData({
                [listName]: list.concat (res.data) //concat 拼接
            })
            wx.hideLoading() //加载完成后隐藏加载窗口
        })
        .catch(res=>{
            console.log('获取失败',res)
            wx.showToast({
              title: '加载失败',
              icon:'error'
            })
        })
    }
}


//export导出写法一 被requestService继承
module.exports=Service