var xls = require("exceljs");
const data = require("./database_export-gift_20201228a.json");
const path = require('path');



function operation() {
    // 新建一个工作表
    var workbook = new xls.Workbook();
    // 创建日期
    workbook.created = new Date();
    // 修改日期
    workbook.modified = new Date();
    // 作者名称
    workbook.creator = 'test';
    // 最后修改人
    workbook.lastModifiedBy = 'test';
 
    // 添加sheet，并且初始化该sheet的名称
    let sheet = workbook.addWorksheet('测试报表');
    // "openId",
    // "奖品等级",
    // "奖品名称",
    // "中奖时间",
    // "奖品类型",
    // "收件地址",
    // "收件姓名",
    // "收件人宠物名",
    // "收件人电话",
    // 设置表头
    sheet.columns = [
        {header: 'openId', key: '_openid', width: 15},
        {header: '奖品等级', key: 'level', width: 15},
        {header: '奖品名称', key: 'name', width: 15},
        {header: '中奖时间', key: 'time', width: 15},
        {header: '奖品类型', key: 'type', width: 15},
        {header: '收件地址', key: 'userAddress', width: 15},
        {header: '收件姓名', key: 'userName', width: 15},
        {header: '收件人宠物名', key: 'userPetName', width: 15},
        {header: '收件人电话', key: 'userPhone', width: 15},
    ];
 
    // 添加多行，data1要是个数组类型(能用foreach遍历)
    sheet.addRows(data);
 
    // 单行添加，入参可以是一个对象，也可以是一个数组
    // sheet.addRow(data1[0]);
 
    // 写文件
    workbook.xlsx.writeFile(path.resolve(__dirname, './export-data.xlsx'))
    .then(function() {
        // done
        console.log('write done')
    });
 
};
 
operation();