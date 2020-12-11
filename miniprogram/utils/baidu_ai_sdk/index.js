import {
  messages
} from './constant.js'

/**
 * Baidu 图像识别接口sdk
 */

class BaiduAISdk {
  static BAIDU_API_AUTH_URL = 'https://aip.baidubce.com/oauth/2.0/token'
  static BAIDU_API_CAR_URL = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/car'
  static BAIDU_API_OBJECT_URL = 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general'
  static BAIDU_API_PLANT_URL = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant'
  static BAIDU_API_REDWINE_URL = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/redwine'
  static BAIDU_API_ANIMAL_URL = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal'
  static BAIDU_API_FACE_DETECT_URL = 'https://aip.baidubce.com/rest/2.0/face/v3/detect'
  static CLIENT_CREDENTIALS = 'client_credentials'
  static API_KEY = '97GxokGdBVbcfMfI5EUmYKkr'
  static SECRET_KEY = 'F586jwbxaGBcE60aO2ntG8Gr8D1c0GUk'
  static APP_ID = '19575911'

  // baidusdk ajax
  static identify({
    url,
    data,
    success,
    fail,
    complete
  }) {
    wx.showLoading({
      title: messages.identifyLoadingMessage
    })
    wx.request({
      url: BaiduAISdk.BAIDU_API_AUTH_URL,
      data: {
        grant_type: BaiduAISdk.CLIENT_CREDENTIALS,
        client_id: BaiduAISdk.API_KEY,
        client_secret: BaiduAISdk.SECRET_KEY
      },
      method: 'GET',
      timeout: 5 * 1000,
      success: (res) => {
        const {
          access_token
        } = res.data
        wx.request({
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          url: `${url}?access_token=${access_token}`,
          data,
          success: (response) => {
            if (response.statusCode !== 200) {
              wx.showToast({
                title: response.errMsg,
              })
              return void 0
            }
            console.log(response.data)
            success && success(response.data)
          },
          fail: (error) => {
            fail && fail(error)
          },
          complete: () => {
            wx.hideLoading()
            complete && complete()
          }
        })
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: messages.baiduAuthError
        })
      }
    })
  }
  //  车型识别接口
  static identifyCar({
    image,
    top_num = 5,
    baike_num = 10,
    success,
    fail
  }) {
    BaiduAISdk.identify({
      url: BaiduAISdk.BAIDU_API_CAR_URL,
      data: {
        image,
        top_num,
        baike_num
      },
      success,
      fail
    })
  }
  //  通用物品识别
  static identifyObject({
    image,
    success,
    fail,
    baike_num = 10
  }) {
    BaiduAISdk.identify({
      url: BaiduAISdk.BAIDU_API_OBJECT_URL,
      data: {
        image,
        baike_num
      },
      success,
      fail
    })
  }
  //  植物识别
  static identifyPlant({
    image,
    success,
    fail,
    baike_num = 10
  }) {
    BaiduAISdk.identify({
      url: BaiduAISdk.BAIDU_API_PLANT_URL,
      data: {
        image,
        baike_num
      },
      success,
      fail
    })
  }
  //  红酒识别
  static identifyRedwine({
    image,
    success,
    fail
  }) {
    BaiduAISdk.identify({
      url: BaiduAISdk.BAIDU_API_REDWINE_URL,
      data: {
        image
      },
      success,
      fail
    })
  }

  //  动物识别
  static identifyAnimal({
    image,
    success,
    fail,
    top_num = 5,
    baike_num = 10
  }) {
    BaiduAISdk.identify({
      url: BaiduAISdk.BAIDU_API_ANIMAL_URL,
      data: {
        image,
        top_num,
        baike_num
      },
      success,
      fail
    })
  }

  //  人脸检测
  static identifyFace({
    image,
    success,
    fail,
    image_type = 'BASE64'
  }) {

    BaiduAISdk.identify({
      url: BaiduAISdk.BAIDU_API_FACE_DETECT_URL,
      data: {
        image,
        image_type,
        face_field: 'gender,glasses'
      },
      success,
      fail
    })
  }
}

export default BaiduAISdk