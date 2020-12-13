// miniprogram/pages/home/index.js
import Utils from './../../utils/index'

//  录音实例
const recorderManager = wx.getRecorderManager()
// const backgroundAudio = wx.getBackgroundAudioManager()
// 背景音频实例
const backgroundAudioManager = wx.getBackgroundAudioManager()
//添加音效
const innerAudioContext = wx.createInnerAudioContext()
// innerAudioContext.autoplay = true // 是否自动开始播放，默认为 false
innerAudioContext.loop = true // 是否循环播放，默认为 false
wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
  obeyMuteSwitch: false, // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
  success: function (e) {
    console.log(e)
    console.log('play success')
  },
  fail: function (e) {
    console.log(e)
    console.log('play fail')
  }
})
// wx.playBackgroundAudio({
//   dataUrl: 'https://7465-test-7gniicn9893dca9d-1304476931.tcb.qcloud.la/sounds/1607697380956-79354.mp3',
//   title: '',
//   coverImgUrl: ''
// })
innerAudioContext.src = 'https://7465-test-7gniicn9893dca9d-1304476931.tcb.qcloud.la/sounds/1607697380956-79354.mp3'; // 音频资源的地址
innerAudioContext.onPlay(() => { // 监听音频播放事件
  console.log('开始播放')
})
innerAudioContext.onError((res) => { // 监听音频播放错误事件
  console.log(res.errMsg)
  console.log(res.errCode)
})

//  生成[n,m]的随机数
function randomId(n = 1, m) {
  return parseInt(Math.random() * (m - n + 1) + n)
}

//  初始化数据库
const db = wx.cloud.database({
  env: 'test-7gniicn9893dca9d'
})


const cacheImageList = [
  './../../images/home/bell.png',
  './../../images/home/slogan-1.png',
  './../../images/home/slogan-2.png',
  './../../images/home/slogan-3.png',
  './../../images/home/weather/w_2.png',
  'cloud://test-7gniicn9893dca9d.7465-test-7gniicn9893dca9d-1304476931/face/no-glass-male-1.png',
  'cloud://test-7gniicn9893dca9d.7465-test-7gniicn9893dca9d-1304476931/face/no-glass-male-2.png',
  'cloud://test-7gniicn9893dca9d.7465-test-7gniicn9893dca9d-1304476931/face/no-glass-male-3.png',
  'cloud://test-7gniicn9893dca9d.7465-test-7gniicn9893dca9d-1304476931/face/no-glass-male-4.png',
  'cloud://test-7gniicn9893dca9d.7465-test-7gniicn9893dca9d-1304476931/face/no-glass-male-5.png',
  'cloud://test-7gniicn9893dca9d.7465-test-7gniicn9893dca9d-1304476931/face/no-glass-male-6.png',
  'cloud://test-7gniicn9893dca9d.7465-test-7gniicn9893dca9d-1304476931/face/no-glass-male-7.png',
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  -1 空页面
    // 0 - Loading 页面资源加载中
    // 1 - Init 初始状态
    // 2 - Style 选择服饰、背景
    // 3 - StartRecord 开始录音
    // 4 - Recording 录音中
    // 5 - StopRecoding 录音结束
    // 6 - Packaged 贺卡打包中loading
    // 7 - Complete 贺卡制作结束
    // 8 - Received 打开分享的页面
    cacheImageList,
    status: 0,
    openId: '',
    gender: 'male',
    glass: 'no-glass',
    faceId: 'no-glass-female-5',
    cardId: '',
    cloudStorageId: '7465-test-7gniicn9893dca9d-1304476931',
    bgMusicPlayStatus: true,
    currentStatus2Tab: 0,
    fromShare: true,
    shareInfo: {

    },
    status2Tabs: [{
        key: 'dress',
        title: '服饰装饰'
      },
      {
        key: 'background',
        title: '背景'
      }
    ],
    currentDressTab: {
      id: '1'
    },
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
    currentBackgroundTab: {
      id: '1'
    },
    backgroundList: [{
        id: '1'
      },
      {
        id: '2'
      }
    ],
    currentWeatherId: '1',
    modalStatusMap: {
      activity: false,
      share: false
    },
    openRecordingdis: "block", //显示录机图标
    shutRecordingdis: "none", //隐藏停止图标
    recordingTimeqwe: 0, //录音计时
    setInter: "", //录音名称
    soundUrl: "",
    preLoadCount: 0,
    preLoadProgressPercent: 0,
  },
  handleLoadImage: function (e) {
    // console.log(e.currentTarget.dataset)
    this.setData({
      preLoadCount: this.data.preLoadCount + 1,
      preLoadProgressPercent: (this.data.preLoadCount + 1) / this.data.cacheImageList.length * 100
    }, () => {
      console.log(this.data.preLoadProgressPercent)
      //  加载完，设置 init status 1
      if (this.data.preLoadCount === this.data.cacheImageList.length) {
        this.setData({
          preLoadProgressPercent: 100,
        })
        setTimeout(() => {
          //  不是来源于分享则显示status 1
          console.log('fromShare', this.data.fromShare)
          if (!this.data.fromShare) {
            this.setData({
              status: 1
            })
          } else {
            this.setData({
              status: 8
            })
          }
        }, 300);
      }
    })
  },
  // 切换背景音乐状态
  handleCheckBgMusicStatus: function () {
    if (!this.data.bgMusicPlayStatus) {
      innerAudioContext.play()
    } else {
      innerAudioContext.stop()
    }
    this.setData({
      bgMusicPlayStatus: !this.data.bgMusicPlayStatus
    })
  },

  //  切换活动modal
  handleCheckActivityModal: function () {
    console.log(this.data.modalStatusMap.activity)
    this.setData({
      modalStatusMap: {
        ...this.data.modalStatusMap,
        activity: !this.data.modalStatusMap.activity
      }
    })
  },
  // 开始制作
  handleStartCreate: function () {
    const that = this
    this.handleChooseFace(() => {
      that.handleNext()
      innerAudioContext.play()
    })
  },
  //  下一步
  handleNext: function () {
    this.setData({
      status: this.data.status + 1
    })
  },
  //  上一步
  handlePrev: function () {
    this.setData({
      status: this.data.status - 1
    })
  },
  //  指定步骤
  handleSetStep: function (e) {
    const step = e.currentTarget.dataset.step
    console.log(step)
    this.setData({
      status: Number(step)
    })
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
    let randomWeatherId = Number(this.data.currentWeatherId)
    if (randomWeatherId === 3) {
      randomWeatherId = 1
    } else {
      randomWeatherId += 1
    }
    console.log(randomWeatherId, 'randomWeatherId')
    this.setData({
      currentDressTab: e.currentTarget.dataset.item,
      currentWeatherId: String(randomWeatherId)
    })
  },
  //  切换背景 background tab
  handleCheckBackgroundTab: function (e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      currentBackgroundTab: e.currentTarget.dataset.item
    })
  },
  // 人脸检测，包含性别和眼镜
  identifyFace(base64Img, cb) {
    const self = this
    Utils.BaiduAISdk.identifyFace({
      image: base64Img,
      success: function (data) {
        console.log(data)
        let gender = 'male'
        let glass = 'no-glass'
        try {
          gender = data.result.face_list[0].gender.type
          glass = data.result.face_list[0].glasses.type === 'none' ? 'no-glass' : 'glass'
        } catch (error) {}
        self.setData({
          gender,
          glass
        })
        //  生成随机 卡通人头id
        const _faceId = randomId(1, 10)
        self.setData({
          faceId: `${glass}-${gender}-${_faceId}`
        })
        cb && cb()
      }
    })
  },
  handleChooseFace: function (cb) {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        const base64Img = Utils.img2Base64({
          imgPath: res
        })
        self.identifyFace(base64Img, cb)
      },
      fail: function (err) {}
    })
  },

  //开始录音
  openRecording: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          shutRecordingdis: "block",
          openRecordingdis: "none"
        })
      }
    })
    const options = {
      duration: 60000, //指定录音的时长，单位 ms，最大为10分钟（600000），默认为1分钟（60000）
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }
    //开始录音计时   
    // that.recordingTimer();
    //开始录音
    this.handleNext()
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('。。。开始录音。。。')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //结束录音
  shutRecording: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          shutRecordingdis: "none",
          openRecordingdis: "block"
        })
      }
    })
    recorderManager.stop();
    recorderManager.onStop((res) => {
      const that = this
      // let timestamp = util.formatTime2(new Date());
      let timestamp = +new Date();
      console.log('。。停止录音。。', res.tempFilePath)
      const {
        tempFilePath
      } = res;
      //结束录音计时  
      // clearInterval(that.data.setInter);
      wx.cloud.uploadFile({
        cloudPath: "sounds/" + timestamp + '-' + this.randomNum(10000, 99999) + '.mp3',
        filePath: tempFilePath,
        // 成功回调
        success: res => {
          console.log('上传成功', res)
          //  转换路径
          // "https://7465-test-7gniicn9893dca9d-1304476931.tcb.qcloud.la/sounds"，为本项目所使用云开发环境所对应的路径将"cloud://newdj-d79af2.6e65-newdj-d79af2-1257790921/sounds"替换后即可使用
          that.setData({
            soundUrl: `https://${that.data.cloudStorageId}.tcb.qcloud.la/sounds${this.midstr(res.fileID)}`
            // time: util.formatTime1(new Date())
          })
          //  录音上传完后才能到下一步试听
          this.handleNext()
        },
      })
    })
  },
  //录音播放
  recordingAndPlaying: function (eve) {
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: this.data.soundUrl
    })
  },
  //生成从minNum到maxNum的随机数
  randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  },
  midstr(str) {
    var strnum = str.lastIndexOf('/')
    var ministr = str.substr(strnum)
    return ministr
  },
  //  提交用户装扮数据
  handleSubmit: async function () {
    const self = this
    await self.setData({
      preLoadProgressPercent: 0
    })
    let timer = setInterval(() => {
      if (self.data.preLoadProgressPercent >= 100) {
        clearInterval(timer)
        // self.setData({
        //   preLoadProgressPercent: 0
        // })
      } else {
        self.setData({
          preLoadProgressPercent: self.data.preLoadProgressPercent + 10
        })
      }
    }, 500);
    await self.setData({
      status: 6
    })
    let params = {
      backgroundId: this.data.currentBackgroundTab.id,
      dressId: this.data.currentDressTab.id,
      faceId: this.data.faceId,
      gender: this.data.gender,
      openId: this.data.openId,
      recordId: this.data.soundUrl,
      weatherId: "1"
    }

    console.log(params)
    // 插入表 card_list user_list
    const addCardRes = await db.collection('card_list').add({
      data: params,
    })
    console.log(addCardRes)
    this.setData({
      cardId: addCardRes._id
    })

    const queryUserRes = await db.collection('user_list').where({
      openId: self.data.openId
    }).get()

    // 查询为空则插入一条数据，否则更新
    if (queryUserRes.data.length < 1) {
      await db.collection('user_list').add({
        data: {
          cardId: addCardRes._id,
          openId: self.data.openId,
          prizeList: []
        }
      })
    } else {
      let userId = queryUserRes.data[0]._id
      await db.collection('user_list').doc(userId).update({
        data: {
          cardId: addCardRes._id
        }
      })
    }
    setTimeout(() => {
      self.setData({
        preLoadProgressPercent: 0
      })
      self.setData({
        status: 7
      })
    }, 5500);
  },
  toPageLuckyWheel: function () {
    wx.navigateTo({
      url: `/pages/luckywheel/index?id=12313123`,
      events: {
        // // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        // acceptDataFromOpenedPage: function(data) {
        //   console.log(data)
        // },
        // someEvent: function(data) {
        //   console.log(data)
        // }
      },
      success: function (res) {
        console.log(res)
        // // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log('options::', options)
    wx.showToast({
      title: JSON.stringify(options),
    })
    if (options.cardId) {
      this.setData({
        status: 8,
        fromShare: true
      })
      //  查询card_list表的数据
      const res = db.collection('card_list').doc(options.cardId).get()
      console.log(res)
    }
    const res = await db.collection('card_list').doc('8ac0e22b5fd5b958001302411ee8eeb1').get()
    console.log('card:::', res.data)
    this.setData({
      shareInfo: {
        ...res.data
      }
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
  onShow: function (options) {

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
  onShareAppMessage: function (res) {
    const cardId = this.data.cardId
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('from button', `?cardId=${this.data.cardId || 123}`)
      return {
        title: '快来听听我的祝福吧',
        path: `/pages/home/index?cardId=${this.data.cardId || 123}`,
        success: function (res) {
          // 转发成功
          console.log(res)
        },
        fail: function (res) {
          // 转发失败
          console.log(res)
        }
      }

    }
    return {
      title: '自定义转发标题222',
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