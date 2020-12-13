// miniprogram/pages/home/index.js
//  初始化数据库
const db = wx.cloud.database({
  env: 'test-7gniicn9893dca9d'
})

function format() {
  var d = new Date();
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1;
  var curr_year = d.getFullYear();
  String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
  String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
  var yyyyMMdd = curr_year + "" + curr_month + "" + curr_date;
  return yyyyMMdd;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {}, //初始动画数据
    Prize: [45, 90, 135], //45度安慰奖，90度二等奖，135度一等奖
    flag: false,
    gifts: [],
    openId: '',
    modalStatusMap: {
      reward: false,
      exchange: false,
      mygift: false,
      rule: false
    },
    currentPrize: {
      type: 1,
      command: 'testX))*@#@#*)!*@)#@'
    },
    myGiftList: []
  },
  start: async function () {
    //  先查询用户，当前这一天，是否抽过奖
    const userInfoRes = await db.collection('user_list').where({
      openId: this.data.openId
    }).get()
    const userInfo = userInfoRes.data[0]
    console.log('userInfo', userInfo)

    // 查询到说明已经抽过奖了
    const key = `timestampTag${format()}`
    console.log('key:', key)
    if (Boolean(userInfo[key]) >= 1) {
      wx.showToast({
        title: '今日已经抽过奖啦，明日再来吧！',
        icon: 'none'
      })
    } else {
      const luckyGift = this.handleRandom()
      const time = new Date().toLocaleDateString()
      //  将奖品插入user_list， 和prize_list
      console.log(luckyGift)
      //  先插入prize_list，返回prizeId
      const res = await db.collection('prize_list').add({
        data: {
          openId: this.data.openId,
          giftId: luckyGift._id,
          time,
          type: luckyGift.type,
          name: luckyGift.name,
          command: luckyGift.command || '',
          isCheckIn: false,
          userName: '',
          userPhone: '',
          userAddress: '',
          userPetName: ''
        }
      })
      console.log('插入prize_list => ', res)

      //  更新userinfo
      const newPrize = {
        prizeId: res._id,
        giftId: luckyGift._id,
        time,
        type: luckyGift.type,
        name: luckyGift.name,
        command: luckyGift.command || '',
        isCheckIn: false,
        userName: '',
        userPhone: '',
        userAddress: '',
        userPetName: ''
      }
      const userUpdateRes = await db.collection('user_list').doc(userInfo._id).update({
        data: {
          prizeList: db.command.push([newPrize]),
          [key]: 1
        }
      })
      console.log(userUpdateRes)

      //  动画转盘
      let animation = wx.createAnimation({ //创建动画实例
        duration: 5000,
        timingFunction: 'ease-in-out'
      })
      animation.rotate(360 * 12 + this.data.Prize[2]).step() //因为公司项目转盘分为8个区域，所以每个区域就是45°了.先设置必定转3圈，然后加上后台返回来的标识，假设这个是安慰奖，随意，这个旋转最后就是到45度这个位置。
      this.setData({
        currentPrize: newPrize,
        animationData: animation.export() //最后根据小程序文档说，这个参数需要export输出。
      })

      // 弹出中奖框
      setTimeout(() => {
        this.setData({
          modalStatusMap: {
            ...this.data.modalStatusMap,
            reward: true
          },
        })
      }, 5500);
    }

  },
  handleBackPage: function () {
    wx.navigateBack()
  },
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '口令复制成功'
            })
          }
        })
      }
    })
  },
  //  切换中奖modal
  handleCheckRewardModal: function () {
    // console.log(this.data.modalStatusMap.activity)
    this.setData({
      modalStatusMap: {
        ...this.data.modalStatusMap,
        reward: !this.data.modalStatusMap.reward
      }
    })
  },
  //  切换规则modal
  handleCheckRuleModal: function () {
    this.setData({
      modalStatusMap: {
        ...this.data.modalStatusMap,
        rule: !this.data.modalStatusMap.rule
      }
    })
  },
  //  切换我的奖品modal
  handleCheckMygiftModal: function () {
    this.setData({
      modalStatusMap: {
        ...this.data.modalStatusMap,
        mygift: !this.data.modalStatusMap.mygift
      }
    }, async () => {
      if (this.data.modalStatusMap.mygift) {
        //  查询user_list 获取用户奖品列表
        const queryUserRes = await db.collection('user_list').where({
          openId: this.data.openId
        }).get()
        const userInfo = queryUserRes.data[0]
        const prizeList = userInfo.prizeList
        console.log(prizeList)
        this.setData({
          myGiftList: prizeList
        })
      }
    })
  },
  handleCheckExchangeModal: function () {
    // console.log(this.data.modalStatusMap.activity)
    this.setData({
      modalStatusMap: {
        ...this.data.modalStatusMap,
        exchange: !this.data.modalStatusMap.exchange
      }
    })
  },
  //  关闭中奖modal，打开兑奖modal
  handleCheckDoubleModal: function () {
    this.handleCheckRewardModal()
    this.handleCheckExchangeModal()
  },
  //  关闭我的奖品modal，打开兑奖modal
  handleChangeToSubmitModal: function (e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      currentPrize: item
    }, () => {
      this.handleCheckExchangeModal()
      this.handleCheckMygiftModal()
    })
  },
  async formSubmit(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //  插入到prize_list和user_list
    wx.showLoading({
      title: '正在提交...',
    })
    const luckyGift = this.data.currentPrize
    const queryUserRes = await db.collection('user_list').where({
      openId: this.data.openId
    }).get()

    const userInfo = queryUserRes.data[0]
    console.log('userInfo::::,', userInfo)
    let oldPrizeInfoIndex = userInfo.prizeList.findIndex((item => item.prizeId === luckyGift.prizeId))

    const newPrizeList = queryUserRes.data[0].prizeList
    newPrizeList[oldPrizeInfoIndex] = {
      ...newPrizeList[oldPrizeInfoIndex],
      isCheckIn: true,
      ...e.detail.value
    }
    // update user prizeList
    await db.collection('user_list').doc(userInfo._id).update({
      data: {
        prizeList: newPrizeList
      }
    })

    //  update prize 
    await db.collection('prize_list').doc(luckyGift.prizeId).update({
      data: {
        isCheckIn: true,
        ...e.detail.value
      }
    })
    wx.hideLoading()
    wx.showToast({
      title: '提交成功！',
      icon: 'none'
    })
    this.handleCheckExchangeModal()
  },
  closeWin() {
    this.animation.rotate(0).step()
    this.animationData = this.animation.export()
    this.deg = 0
    // this.$apply()
  },
  // 中奖函数
  handleRandom: function () {
    const max = 100
    const min = 1
    const num = parseInt(Math.random() * (max - min + 1) + min)
    let probability = 0
    //  一等奖 虚拟2
    if (num >= 1 && num <= 2) {
      probability = 2
    } else if (num > 2 && num <= 89) {
      //  三等奖 虚拟1
      probability = 88
    } else {
      //  二等奖 实物1
      probability = 10
    }
    return this.data.gifts.find((item) => item.probability === probability)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log('options::', options)
    // wx.showToast({
    //   title: JSON.stringify(options),
    // })
    const res = await db.collection('gift_list').get()
    this.setData({
      gifts: res.data
    })

    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log('res:=>', res)
        this.setData({
          openId: res.result.openid
        })
      },
      fail: err => {
        console.log(err)
      }
    })
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
    return {
      title: '自定义转发标题',
      path: '/pages/home/index?card=123123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})