const cloud = require('wx-server-sdk')
// const db = wx.cloud.database({
//   env: 'test-7grb81f4dad97692'
// })
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  // event.userInfo 是已废弃的保留字段，在此不做展示
  // 获取 OPENID 等微信上下文请使用 cloud.getWXContext()
  console.log(event.key, event.value)
  const stockRes = await db.collection('gift_stock_list').where({
    stockId: '1'
  }).update({
    data: {
      [event.key]: event.value
    }
  })
  return event
}