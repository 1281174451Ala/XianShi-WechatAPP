const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime
}

//获取数据库列表 pages/request 和 交易页面使用
// const getDBList=function getDBList(that,DB,listName,list,totalNum){//参数分别为this指针，数据库表名，存放结果的列表名，存放结果的列表，数据库表总长度
//   let len=list.length //获取数组长度 用来跳过
//   if (len==totalNum){
//       wx.showToast({ //显示小弹窗提示用户
//         title: '已经到底啦',
//         icon:'none'
//       })
//       return
//   }
//   wx.showLoading({ //提示用户目前正加载下一页
//     title: '加载中',
//   })
//   wx.cloud.database().collection(DB).skip(len).get()
//   .then(res=>{ //箭头函数可以直接用this 不需要that
//       console.log('获取成功',res)
//       // list=[...list,...res.data]
//       // console.log(list)
//       // return list
//       that.setData({
//           [listName]: list.concat (res.data) //concat 拼接
//       })
//       wx.hideLoading() //加载完成后隐藏加载窗口
//   })
//   .catch(res=>{
//       console.log('获取失败',res)
//       wx.showToast({
//         title: '加载失败',
//         icon:'error'
//       })
//   })
  
// }
// module.exports={
//   getDBList:getDBList
// }

//弹窗
const popup=function popup(that,isConfirm,content,functionName){
  wx.showModal({
    title: '提示',
    content: content,
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定',res)
        // that.setData({
        //   [isConfirm]:true
        // })
        functionName()
      } else if (res.cancel) {
        console.log('用户点击取消',res)
        that.setData({
          [isConfirm]:false
        })
      }
    }
})
}

module.exports={
  // getDBList:getDBList,
  popup:popup,
}


