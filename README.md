## 1. 后端设计

#### 1.0 数据库环境
* [x] test1
* [ ] prod

#### 1.1 Cloud Serverless函数设计
   * [x] 录音文件上传云存储
   * [x] 查询活动是否结束
   * [x] 百度人脸识别

#### 1.2 Cloud DB表设计
* [x] 用户 user_list

| Key | 描述 | 数据类型 | 说明 |
|-----|----|------|--------|
|  _id   |  主键  |  string    |
|  openId   |  用户openId  |  string    |
|  cardId   |  制作贺卡id |  string    | 只保留最后一次贺卡id，关联表card_list
|  timestampTag${ts}   |  抽奖次数标记  |  int    | 规则为 timestampTag + YYYYMMDD( 当前日期时间戳)，如果前端调用抽奖前查询当日标记已添加，则无法再进行抽奖，查询的ts值必须在云函数中获取，ts取值为20201218 <= x <=20201231
|  prizeList   |  中奖礼品列表  |  Array\<object>    | { prizeId: 中奖纪录id(关联表prize_list),giftId: 奖品id(关联表gift_id), time: 中奖时间, type: 奖品类型, name: 奖品名称, command: 虚拟奖品口令, isCheckIn: 实物奖品是否登记过地址信息, userName: 实物奖品登记姓名, userPhone: 实物奖品登记电话, userAddress: 实物奖品登记地址, userPetName: 实物奖品登记宠物姓名 }


* [x] 贺卡 card_list

| Key | 描述 | 数据类型 | 说明
|-----|----|------|------|
|  _id   |  主键  |  string    |
|  openId   |  用户openId  |  string    |
|  backgroundId   | 背景id |  string    |
|  dressId   | 服饰id |  string    |
|  faceId   | 脸部id |  string    |
|  gender   | 性别 |  int    | 1: 男; 2: 女 
|  weatherId   | 天气id |  string    |
|  recordId   | 微信录音文件id |  string    |

* [x] 奖品配置管理 gift_list

| Key | 描述 | 数据类型 | 说明
|-----|----|------|------|
|  _id   |  主键  |  string    |
|  type   |  奖品类型  |  int    |1: 实物; 2: 虚拟
|  name   |  奖品名称  |  string    |
|   command | 虚拟奖品口令 | string |
|  probability   |  中奖概率 |  number    |
|  level   |  奖品等级 |  number    |

* [x] 活动列表 activity_list

| Key | 描述 | 数据类型 | 说明
|-----|----|------|------|
|  _id   |  主键  |  string    |
|  activityId   |  活动id  |  string    | 当前只有一个，表设计如此方便以后复用
| isOnline | 活动状态 | boolean | 

* [x] 中奖清单 prize_list

| Key | 描述 | 数据类型 | 说明
|-----|----|------|------|
|  _id   |  主键  |  string    |
|  openId   |  用户openId  |  string    |
|  giftId   |  奖品id  |  string    |
|  time   |  中奖时间  |  string    |
|  type   |  奖品类型  |  int    |
|  name   |  奖品名称  |  string    |
|  command   |  虚拟奖品口令  |  string    |
|  isCheckIn   |  实物奖品是否登记过地址信息  |  boolean    |
|  userName   |  实物奖品登记姓名  |  string    |
|  userPhone   |  实物奖品登记电话  |  string    |
|  userAddress   |  实物奖品登记地址  |  string    |
|  userPetName   |  实物奖品登记宠物姓名  |  string    |

## 2. 前端设计
#### 2.1 页面拆分
> **状态机status**

- [x] 主页面
    **发送者视角**
    - [x] 0 - Loading 页面资源加载中
    - [x] 1 - Init 初始状态
    - [x] 2 - Style 选择服饰、背景
    - [x] 3 - StartRecord 开始录音
    - [x] 4 - Recording 录音中
    - [x] 5 - StopRecoding 录音结束
    - [x] 6 - Packaged 贺卡打包中loading
    - [x] 7 - Complete 贺卡制作结束
    
    **接收者视角**
    - [x] 8 - Received 打开分享的页面
    
- [x] 抽奖页

#### 2.2 模态框拆分
- [x] 活动介绍
- [x] 虚拟奖品获得
- [x] 实物奖品获得
- [x] 实物奖品填写兑换信息
- [x] 我的奖品
- [x] 分享遮罩

#### 2.3 动效

- [x] 首页加载和打包loading动效
- [x] 背景音频icon动效
- [x] 录音中动画
- [x] 录音完成试听动画
- [x] 完成后听录音动画
- [x] 抽奖转盘动画


## 3. 发布部署
#### 3.1 小程序账号申请
- [x] 后台账号 ly4work@163.com
- [x] 小程序资料初始配置，包含名称、简称、头像、介绍、服务类目

#### 3.2 初版审核



## sql执行脚本 

#### 批量删表

```
// db.collection('card_list')
//   .where({
//     openId: db.command.exists(true)
//   })
//   .remove()
// db.collection('prize_list')
//   .where({
//     openId: db.command.exists(true)
//   })
//   .remove()

db.collection('user_list')
  .where({
    openId: db.command.exists(true)
  })
  .remove()
```
