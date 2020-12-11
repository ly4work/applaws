const {
  messages
} = require('./constant.js')
const axios = require('axios')
const qs = require('querystring')

axios.defaults.timeout = 3 * 1000
/**
 * Baidu 图像识别接口sdk
 */
const BaiduAISdkConst = {
  BAIDU_API_AUTH_URL: 'https://aip.baidubce.com/oauth/2.0/token',
  BAIDU_API_CAR_URL: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/car',
  BAIDU_API_OBJECT_URL: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general',
  BAIDU_API_PLANT_URL: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant',
  BAIDU_API_REDWINE_URL: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/redwine',
  BAIDU_API_ANIMAL_URL: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal',
  BAIDU_API_FACE_DETECT_URL: 'https://aip.baidubce.com/rest/2.0/face/v3/detect',
  CLIENT_CREDENTIALS: 'client_credentials',
  API_KEY: '5YA4cfTiH09eo2HTIb1GuQRE',
  SECRET_KEY: 'P85alwGGa1xGfsDh4vBQY703tRO4MHks',
  APP_ID: '19513807'
}
class BaiduAISdk {
  //  token
  async getToken() {
    return axios.get(BaiduAISdkConst.BAIDU_API_AUTH_URL, {
      params: {
        grant_type: BaiduAISdkConst.CLIENT_CREDENTIALS,
        client_id: BaiduAISdkConst.API_KEY,
        client_secret: BaiduAISdkConst.SECRET_KEY
      }
    })
  }
  //  通用identify
  async identify({
    url,
    params
  }) {
    const res = await this.getToken()
    const {
      access_token
    } = res.data
    return axios.post(`${url}?access_token=${access_token}`, qs.stringify({
      ...params
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
  }
  //  车型识别接口
  async identifyCar({
    image,
    top_num = 5,
    baike_num = 10
  }) {
    return this.identify({
      url: BaiduAISdkConst.BAIDU_API_CAR_URL,
      params: {
        image,
        baike_num,
        top_num
      }
    })
  }
  //  通用物品识别
  async identifyObject({
    image,
    baike_num = 10
  }) {
    return this.identify({
      url: BaiduAISdkConst.BAIDU_API_OBJECT_URL,
      params: {
        image,
        baike_num
      }
    })
  }
  //  植物识别
  async identifyPlant({
    image,
    baike_num = 10
  }) {
    return this.identify({
      url: BaiduAISdkConst.BAIDU_API_PLANT_URL,
      params: {
        image,
        baike_num
      }
    })
  }
  //  红酒识别
  async identifyRedwine({
    image
  }) {
    return this.identify({
      url: BaiduAISdkConst.BAIDU_API_REDWINE_URL,
      params: {
        image
      }
    })
  }
  //  动物识别
  async identifyAnimal({
    image,
    top_num = 5,
    baike_num = 10
  }) {
    return this.identify({
      url: BaiduAISdkConst.BAIDU_API_ANIMAL_URL,
      params: {
        image,
        top_num,
        baike_num
      }
    })
  }
  //  人脸检测
  async identifyFace({
    image,
    image_type = 'BASE64'
  }) {
    return this.identify({
      url: BaiduAISdkConst.BAIDU_API_FACE_DETECT_URL,
      params: {
        image,
        image_type
      }
    })
  }
}

module.exports = new BaiduAISdk()