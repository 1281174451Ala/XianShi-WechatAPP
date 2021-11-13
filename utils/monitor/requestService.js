//具体的被观察者
// class ObservableImpl extends Observable{ 
//     doSomething(){
//         /*
//         do something 
//         */
//     //    super.notifyObservers()
//     }
// }

const Service=require('./service')

class RequestService extends Service{  
    constructor(){
        super()
    }
    //监听所有的对数据库的写操作
    dbAdd(db,data,log){
        let that=this
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db)
            .add({
                data,
                success(res){
                    console.log(log, res)
                    reslove(true)
                    that.notifyObservers(data) //为被监听的函数加上父类的notifyObservers()
                },
                fail(res){
                    console.log('添加数据失败',res)
                    reslove(false)
                }
            })
        })
        
    }
    dbDelete(db,_id,log){
        let that=this
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db).doc(_id)
            .remove({
            success(res){
                console.log(log, res)
                reslove(true)
                // that.notifyObservers(_id)
            },
            fail(res){
                console.log('删除数据失败',res)
                reslove(false)
            }
        })
        })
        
    }
    /*js不能直接重载函数，只能在原函数里添加新的判断条件和分支实现
    修改起来比较麻烦，所以决定直接写新的函数 */
    dbDelete_where(db,where,log){ //批量删除
        let that=this
        return new Promise((reslove, reject) =>{
        wx.cloud.database().collection(db).where(where)
        .remove({
            success(res){
                console.log(log, res)
                reslove(true)
                that.notifyObservers(where)
            },
            fail(res){
                console.log('批量删除数据失败',res)
                reslove(false)
            }
        })
        })
    }
    dbUpdate(db,_id,data,log){
        let that=this
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db).doc(_id)
            .update({
                data,
                success(res){
                console.log(log, res)
                reslove(true)
                that.notifyObservers(data)
                },
                fail(res){
                console.log('删除数据失败',res)
                reslove(false)
                }
            })
        })
        
    }
  }

//export导出写法二 在requestItem.js导入 
  module.exports={
      RequestService:RequestService
  }
  