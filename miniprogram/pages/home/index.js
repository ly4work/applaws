// miniprogram/pages/home/index.js
import Utils from './../../utils/index'
const Door = 15

//  录音实例
const recorderManager = wx.getRecorderManager()
// 背景音频实例
const backgroundAudioManager = wx.getBackgroundAudioManager()
// 添加音效
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = new Date().getDate() >= Door // 是否自动开始播放，12月18日开始，自动播放
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

innerAudioContext.src = 'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/applaws-music.mp3'; // 音频资源的地址
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
  env: 'test-6gbljcgx7c5a85df'
})


const cacheImageList = [
  './../../images/home/bell.png',
  './../../images/home/audio.png',
  './../../images/home/cabinet.png',
  './../../images/home/caidai.png',
  './../../images/home/cat_buou.png',
  './../../images/home/cat_yingduan.png',
  './../../images/home/complete.png',
  './../../images/home/music-icon.png',
  './../../images/home/cabinet.png',
  './../../images/home/slogan-1.png',
  './../../images/home/slogan-2.png',
  './../../images/home/slogan-3.png',
  './../../images/home/snow-foreground.png',
  './../../images/home/snow-large.png',
  './../../images/home/snow-tiny.png',
  './../../images/home/weather/w_1.png',
  './../../images/home/weather/w_2.png',
  './../../images/home/weather/w_3.png',
  './../../images/home/weather/snow.png',
  './../../images/home/background/1.png',
  './../../images/home/background/2.png',
  './../../images/home/background/1_active.png',
  './../../images/home/background/1_box.png',
  './../../images/home/background/2_box.png',
  './../../images/home/background/2_active.png',
  './../../images/home/buttons/bless.png',
  './../../images/home/buttons/close.png',
  './../../images/home/buttons/copy_command.png',
  './../../images/home/buttons/intro.png',
  './../../images/home/buttons/iwant.png',
  './../../images/home/buttons/lucky_wheel.png',
  './../../images/home/buttons/my_gift.png',
  './../../images/home/buttons/next.png',
  './../../images/home/buttons/prev.png',
  './../../images/home/buttons/re_create.png',
  './../../images/home/buttons/re_record.png',
  './../../images/home/buttons/recording.png',
  './../../images/home/buttons/start_record.png',
  './../../images/home/buttons/start.png',
  './../../images/home/buttons/submit.png',
  './../../images/home/buttons/to_exchange.png',
  './../../images/home/buttons/try_listen.png',
  './../../images/home/dress/1.png',
  './../../images/home/dress/1_hat.png',
  './../../images/home/dress/1_footer.png',
  './../../images/home/dress/1_body.png',
  './../../images/home/dress/1_active.png',
  './../../images/home/dress/2.png',
  './../../images/home/dress/2_hat.png',
  './../../images/home/dress/2_footer.png',
  './../../images/home/dress/2_body.png',
  './../../images/home/dress/2_active.png',
  './../../images/home/dress/2_decoration.png',
  './../../images/home/dress/3.png',
  './../../images/home/dress/3_hat.png',
  './../../images/home/dress/3_footer.png',
  './../../images/home/dress/3_body.png',
  './../../images/home/dress/3_active.png',
  './../../images/home/dress/4.png',
  './../../images/home/dress/4_hat.png',
  './../../images/home/dress/4_footer.png',
  './../../images/home/dress/4_body.png',
  './../../images/home/dress/4_active.png',
  './../../images/home/dress/4_decoration.png',
  './../../images/home/dress/5.png',
  './../../images/home/dress/5_hat.png',
  './../../images/home/dress/5_footer.png',
  './../../images/home/dress/5_body.png',
  './../../images/home/dress/5_active.png',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/modal-activity.png',
  './../../images/home/modal/rweta.png',
  './../../images/home/modal/exchange.png',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/type0.png',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/type1.png',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/type2.png',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/type3.png',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/loading.gif',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/人物头.gif',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/布偶.gif',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/树五角星.gif',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/水晶球装饰灯.gif',
  'cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/蓝猫.gif',
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
    Door,
    CurrentDate: new Date().getDate(),
    cacheImageList,
    animationData: {},
    status: 0,
    openId: '',
    gender: 'male',
    glass: 'no-glass',
    faceId: '',
    cardId: '',
    cloudStorageId: '7465-test-6gbljcgx7c5a85df-1304542776',
    bgMusicPlayStatus: new Date().getDate() >= Door,
    currentStatus2Tab: 0,
    fromShare: false,
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
    this.setData({
      preLoadCount: this.data.preLoadCount + 1,
      preLoadProgressPercent: (this.data.preLoadCount + 1) / this.data.cacheImageList.length * 100
    }, () => {

      //  3秒钟一定关闭loading
      setTimeout(() => {
        this.setData({
          preLoadProgressPercent: 100,
        })
        //  不是来源于分享则显示status 1
        if (!this.data.fromShare) {
          this.setData({
            status: 1
          })
        } else {
          //  否则显示贺卡页
          this.setData({
            status: 8
          })
        }
      }, 3000);
      if (this.data.preLoadCount === this.data.cacheImageList.length) {
        this.setData({
          preLoadProgressPercent: 100,
        })
        // //  进度层淡出 暂时取消掉
        // let animation = wx.createAnimation({ //创建动画实例
        //   duration: 800,
        //   timingFunction: 'ease'
        // })
        // animation.opacity(0).step()
        // this.setData({
        //   animationData: animation.export() 
        // })

        setTimeout(() => {
          //  不是来源于分享则显示status 1
          if (!this.data.fromShare) {
            this.setData({
              status: 1
            })
          } else {
            //  否则显示贺卡页
            this.setData({
              status: 8
            })
          }
        }, 500);
      }
    })
  },
  // 切换背景音乐状态
  handleCheckBgMusicStatus: function () {
    if (!this.data.bgMusicPlayStatus) {
      innerAudioContext.play()
    } else {
      innerAudioContext.pause()
    }
    this.setData({
      bgMusicPlayStatus: !this.data.bgMusicPlayStatus
    })
  },

  //  切换活动modal
  handleCheckActivityModal: function () {
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
    //  18号前不要开启上传照片人脸识别
    if (this.data.CurrentDate < Door) {
      const _faceId = randomId(1, 10)
      that.setData({
        gender: 'male',
        glass: 'no-glass',
        faceId: `no-glass-male-${_faceId}`
      }, () => {
        that.handleNext()
      })
    } else {
      this.handleChooseFace(() => {
        that.handleNext()
        innerAudioContext.play()
        this.setData({
          bgMusicPlayStatus: true
        })
      })
    }

  },
  //  换皮肤的下一步
  handleChangeSkin: function () {
    //  18号前不要开启录音
    if (this.data.CurrentDate < Door) {
      this.handleSubmit()
    } else {
      this.handleNext()
    }
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
    this.setData({
      status: Number(step)
    })
  },
  // 切换 status2换装衣柜tab
  handleCheckStatus2Tab: function (e) {
    this.setData({
      currentStatus2Tab: e.currentTarget.dataset.index
    })
  },
  //  切换服装 dress tab
  handleCheckDressTab: function (e) {
    let randomWeatherId = Number(this.data.currentWeatherId)
    if (randomWeatherId === 3) {
      randomWeatherId = 1
    } else {
      randomWeatherId += 1
    }
    this.setData({
      currentDressTab: e.currentTarget.dataset.item,
      currentWeatherId: String(randomWeatherId)
    })
  },
  //  切换背景 background tab
  handleCheckBackgroundTab: function (e) {
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
    //  先判断系统，ios直接调用chooseImage，安卓模拟先调起actionsheet
    let systemInfo = null
    try {
      systemInfo = wx.getSystemInfoSync()
    } catch (e) {}
    const self = this
    if (systemInfo.platform === 'ios') {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: function (res) {
          const base64Img = Utils.img2Base64({
            imgPath: res
          })
          self.identifyFace(base64Img, cb)
        },
        fail: function (err) {
          // wx.showModal({
          //   cancelColor: 'cancelColor',
          //   content: JSON.stringify(err)
          // })
        }
      })
    } else {
      wx.showActionSheet({
        itemList: ['拍照', '从手机相册选择'],
        success(res) {
          let sourceType = []
          if (res.tapIndex === 0) {
            sourceType.push('camera')
          } else {
            sourceType.push('album')
          }
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType,
            success: function (res) {
              const base64Img = Utils.img2Base64({
                imgPath: res
              })
              self.identifyFace(base64Img, cb)
            },
            fail: function (err) {
              // wx.showModal({
              //   cancelColor: 'cancelColor',
              //   content: JSON.stringify(err)
              // })
            }
          })
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    }


  },

  //开始录音
  openRecording: function () {
    let that = this;
    innerAudioContext.pause()
    this.setData({
      bgMusicPlayStatus: false
    })
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
    let that = this;
    //  录音上传完后才能到下一步试听
    this.handleNext()
    wx.showLoading({
      title: '正在生成...',
    })
    // 无论多长时间都要在5秒左右的时候隐藏loading
    setTimeout(() => {
      wx.hideLoading()
    }, 5000);
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
      let timestamp = +new Date();
      console.log('。。停止录音。。', res.tempFilePath)
      const {
        tempFilePath
      } = res;
      //  上传到云存储
      wx.cloud.uploadFile({
        cloudPath: "sounds/" + timestamp + '-' + this.randomNum(10000, 99999) + '.mp3',
        filePath: tempFilePath,
        // 成功回调
        success: res => {
          console.log('上传成功', res)
          //  路径转换规则
          // "https://7465-test-6gbljcgx7c5a85df-1304542776.tcb.qcloud.la/sounds"，为本项目所使用云开发环境所对应的路径将"cloud://newdj-d79af2.6e65-newdj-d79af2-1257790921/sounds"替换后即可使用
          that.setData({
            soundUrl: `https://${that.data.cloudStorageId}.tcb.qcloud.la/sounds${this.midstr(res.fileID)}`
          })
          wx.hideLoading()
        },
      })
    })
  },
  //录音播放
  recordingAndPlaying: function (eve) {
    wx.playBackgroundAudio({
      dataUrl: this.data.soundUrl
    })
  },
  //  分享者听录音
  listenToShareRecord: function () {
    innerAudioContext.pause()
    this.setData({
      bgMusicPlayStatus: false
    })
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: this.data.shareInfo.recordId
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
    const strnum = str.lastIndexOf('/')
    const ministr = str.substr(strnum)
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
      weatherId: this.data.currentWeatherId
    }
    // 插入表 card_list user_list
    const addCardRes = await db.collection('card_list').add({
      data: params,
    })
    console.log(addCardRes)
    this.setData({
      cardId: addCardRes._id
    })

    //  查询用户数据
    const queryUserRes = await db.collection('user_list').where({
      openId: self.data.openId
    }).get()

    console.log('insert user openI => ', self.data.openId)
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
      // let animation = wx.createAnimation({ //创建动画实例
      //   duration: 500,
      //   timingFunction: 'ease'
      // })
      // animation.opacity(0).step()
      // this.setData({
      //   animationData: animation.export() //最后根据小程序文档说，这个参数需要export输出。
      // })
      self.setData({
        status: 7
      })
    }, 5500);
  },
  toPageLuckyWheel: function () {
    wx.navigateTo({
      url: `/pages/luckywheel/index`,
      success: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (options.cardId) {
      this.setData({
        status: 8,
        fromShare: true
      })
      //  查询card_list表的数据
      const res = await db.collection('card_list').doc(options.cardId).get()
      console.log('card:::', res.data)
      this.setData({
        shareInfo: {
          ...res.data
        }
      })
    }

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
    // const cardId = this.data.cardId
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log('from button', `?cardId=${this.data.cardId || 123}`)
      return {
        title: 'Applaws圣诞把“爱”说出来，有好礼！有惊喜！录制语音祝福，定制只属于您的心愿水晶球！',
        path: `/pages/home/index?cardId=${this.data.cardId || 123}`,
        imageUrl: `cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/share.png`,
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
      title: 'Applaws圣诞把“爱”说出来，有好礼！有惊喜！录制语音祝福，定制只属于您的心愿水晶球！',
      path: '/pages/home/index',
      imageUrl: `cloud://test-6gbljcgx7c5a85df.7465-test-6gbljcgx7c5a85df-1304542776/static-imgs/share.png`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})