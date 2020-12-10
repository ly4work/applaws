// miniprogram/pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 0 - Loading 页面资源加载中
    // 1 - Init 初始状态
    // 2 - Style 选择服饰、背景
    // 3 - StartRecord 开始录音
    // 4 - Recording 录音中
    // 5 - StopRecoding 录音结束
    // 6 - Packaged 贺卡打包中loading
    // 7 - Complete 贺卡制作结束
    // 8 - Received 打开分享的页面
    status: 8,
    currentStatus2Tab: 0,
    status2Tabs: [{
        key: 'dress',
        title: '服饰装饰'
      },
      {
        key: 'background',
        title: '背景'
      }
    ],
    currentDressTab: {id: '1'},
    dressList: [{
        id: '1'
      },
      {
        id: '2'
      },
      {
        id: '3'
      },
      {
        id: '4'
      },
      {
        id: '5'
      }
    ],
    currentBackgroundTab: {id: '1'},
    backgroundList: [{
        id: '1'
      },
      {
        id: '2'
      }
    ]
  },
  // 切换 status2换装衣柜tab
  handleCheckStatus2Tab: function (e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      currentStatus2Tab: e.currentTarget.dataset.index
    })
  },
  //  切换服装 dress tab
  handleCheckDressTab: function (e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      currentDressTab: e.currentTarget.dataset.item
    })
  },
  //  切换背景 background tab
  handleCheckBackgroundTab: function (e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      currentBackgroundTab: e.currentTarget.dataset.item
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})