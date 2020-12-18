// 云函数入口文件
const cloud = require('wx-server-sdk')
const baiduAISDK = require('./baiduAISDK.js')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  //  funcName可取值范围 identifyCar, identifyObject, identifyPlant

  const {
    funcName,
    image
  } = event
  const res = await baiduAISDK[funcName]({
    image: image
  })
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res.data)
    }, 0)
  })
}