// 云函数入口文件
const cloud = require('wx-server-sdk')
const nodeExcel = require('excel-export')
const path = require('path');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  const tableHead = [
    "openId",
    "奖品等级",
    "奖品名称",
    "中奖时间",
    "奖品类型",
    "收件地址",
    "收件姓名",
    "收件人宠物名",
    "收件人电话"
  ]

  var tableMap = {
    styleXmlFile: path.join(__dirname, "styles.xml"),
    name: Date.now() + "-export",
    cols: [],
    rows: [],
  }

  // const prizeRes = await db
  //   .collection("prize_list")
  //   .get()
  // console.log(prizeRes)
  // return prizeRes
  // return prizeRes
  //添加表头  此处要注意格式type，会影响到rows
  tableMap.cols = [{
    caption: tableHead[0], //  _openId
    type: 'string'
  }, {
    caption: tableHead[1], //  level
    type: 'number'
  }, {
    caption: tableHead[2], //  name
    type: 'string'
  }, {
    caption: tableHead[3], //  time
    type: 'string'
  }, {
    caption: tableHead[4], //  type
    type: 'number'
  }, {
    caption: tableHead[5], //  userAddress
    type: 'string'
  }, {
    caption: tableHead[6], //  userName
    type: 'string'
  }, {
    caption: tableHead[7], //  userPetName
    type: 'string'
  }, {
    caption: tableHead[8], //  userPhone
    type: 'string'
  }]
  // console.log('prizeRes', prizeRes)

  const prizeRes = await db
  .collection("prize_list")
  .get()
  const output = prizeRes.data
  // const output = event.arr
  //添加每一行数据 此处字段数据需根据业务需求来重新定义
  for (var i = 0; i < output.length; i++) {
    tableMap.rows[tableMap.rows.length] = [
      output[i]._openid, output[i].level, output[i].name, output[i].time, output[i].type === 1 ? '实物' : '虚拟', output[i].userAddress, output[i].userName, output[i].userPetName, output[i].userPhone
    ]
  }
  console.log(tableMap);
  //保存excelResult到相应位置
  var excelResult = nodeExcel.execute(tableMap);
  var filePath = "outputExcels";
  var fileName = Date.now() + '.xlsx';
  return await cloud.uploadFile({
    cloudPath: path.join(filePath, fileName),
    fileContent: new Buffer(excelResult, 'binary')
  });
}