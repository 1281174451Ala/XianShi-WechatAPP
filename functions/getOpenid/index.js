// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数获取openid
exports.main = async(event,context) =>{
    return event.userInfo
}