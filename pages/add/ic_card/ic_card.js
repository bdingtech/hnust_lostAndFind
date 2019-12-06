const app = getApp()
var config = (wx.getStorageSync("config"));
Page({
  data: {
    losterName: '',
    id: '',
    finderName: '',
    tel: ''
  },
  //获取当前时间函数
  getTime: function() {
    var nowYear = new Date().getFullYear().toString()
    var nowMonth = (new Date().getMonth() + 1).toString()
    var nowDay = new Date().getDate().toString();
    var nowHours = new Date().getHours().toString();       //获取当前小时数(0-23)
    var nowMin = new Date().getMinutes().toString();     //获取当前分钟数(0-59)
    var nowSeconds = new Date().getSeconds().toString();     //获取当前秒数(0-59)
    function timeAdd0(str) {
      if (str.length <= 1) {
        str = '0' + str;
      }
      return str
    }
    nowYear = timeAdd0(nowYear)
    nowMonth = timeAdd0(nowMonth)
    nowDay = timeAdd0(nowDay)
    nowHours = timeAdd0(nowHours)
    nowMin = timeAdd0(nowMin)
    nowSeconds = timeAdd0(nowSeconds)
    //console.log(nowYear + nowMonth + nowDay + nowHours + nowMin + nowSeconds)
    //获取完整年月日
    var newDay = nowYear + "/" + nowMonth + "/" + nowDay + "  " + nowHours + ":" + nowMin + ":" + nowSeconds;
    console.log(newDay)
    return newDay;
  },
  //表单提交数据处理
  formSubmit: function(e) {
    //console.log('form发生了submit事件：', e.detail.value)
    //接收表单数据并写入data数组
    this.setData({
      losterName: e.detail.value.losterName,
      id: e.detail.value.id,
      finderName: e.detail.value.finderName,
      tel: e.detail.value.tel
    })

    //数据库操作
    if (this.data.losterName.length == 0 || this.data.id.length == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写完整数据'
      });
    } else {
      wx.showLoading({
        title: '正在提交...',
      })
      //const db = wx.cloud.database()
      wx.request({
        url: config.add,
        data: {
          losterName: this.data.losterName,
          time: this.getTime(),
          id: this.data.id,
          finderName: this.data.finderName,
          tel: this.data.tel,
          done: false,
          item:'ic_card'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data)
            wx.hideLoading();
            wx.redirectTo({
            url: '../feedback/feedback',
          })
          console.log(res)
        }
      })
      // db.collection('ic_card').add({
      //   data: {
      //     losterName: this.data.losterName,
      //     due: this.getTime(),
      //     id: this.data.id,
      //     finderName: this.data.finderName,
      //     tel: this.data.tel,
      //     done: false
      //   },
      //   success: function(res) {
      //     wx.hideLoading();
      //     wx.redirectTo({
      //       url: '../feedback/feedback',
      //     })
      //     console.log(res)
      //   },
      //   fail: console.error
      // })
    }
  }
})