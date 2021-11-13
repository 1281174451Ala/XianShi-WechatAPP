// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    // try {
      console.log(event.openid)
        const result = await cloud.openapi.subscribeMessage.send({
            "touser": event.openid,
            "page": event.page,
            "lang": 'zh_CN',
            "data": {
              "thing2": {
                "value": event.type
              },
              "thing15": {
                "value": event.title
              },
              "thing4": {
                "value": event.content
              }
            },
            templateId: event.templateId,
            "miniprogramState": 'developer'
          })
          console.log(result)
        return result
      // } catch (err) {
      //   return err
      // }
}