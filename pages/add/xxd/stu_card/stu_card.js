const app = getApp()
var config = (wx.getStorageSync("config"));
Page({
  data: {
    losterName: '',
    id: '',
    location: '',
    xxd: '',
    isSelect1: '',
    isSelect2: '',
    times: '1', //已废弃
    num: '', //提交个数
    count: '' //缓存数据计数
  },
  back: function () {
    wx.navigateTo({
      url: '/pages/add/xxd/home/home',
    })
  },
  //结束提交数据
  endSubmit: function () {
    var that = this
    //判断用户是否未提交过数据就结束提交
    if (this.data.times.length - 1 == 0) {
      wx.showModal({
        title: '提示',
        content: '确认返回吗？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确认结束提交吗？',
        success(res) {
          //console.log(res)
          if (res.confirm) {
            console.log('用户点击确定')
            wx.reLaunch({
              url: '/pages/add/feedback/feedback?times=' + that.data.times.length + '&isSelect=' + that.data.location,
            })
          }
        }
      })
    }
  },
  //小程序启动时接收location数据
  onLoad: function (options) {
    //console.log(options)
    if (options.isSelect == 1) {
      this.setData({
        isSelect1: options.isSelect,
        location: options.isSelect
      })
    }
    if (options.isSelect == 2) {
      this.setData({
        isSelect2: options.isSelect,
        location: options.isSelect
      })
    }

    if (options.times) {
      this.setData({
        times: options.times
      })
    }
    this.setData({
      num: this.data.times.length - 1,
      count: this.data.times.length
    })
    console.log(this.data.num)
  },
  //点击事件
  radioChange: function (e) {
    //console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      location: e.detail.value
    })
  },
  //获取当前时间函数
  getTime: function () {
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
  formSubmit: function (e) {
    //console.log('form发生了submit事件：', e.detail.value)
    this.setData({
      losterName: e.detail.value.losterName,
      id: e.detail.value.id,
    })
    var that = this;
    //计数
    this.setData({
      times: this.data.times + 1
    });


    if (this.data.losterName.length == 0 || this.data.id.length == 0 || this.data.location.length == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写完整数据'
      });
    } else {
      wx.showLoading({
        title: '正在提交...',
      })
      wx.request({
        url: config.xxd,
        data: {
          losterName: this.data.losterName,
          time: this.getTime(),
          id: this.data.id,
          xxd: 1,
          location: this.data.location,
          //finderName: this.data.finderName,
          //tel: this.data.tel,
          done: false,
          item:'stu_card'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data)
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000,
            success: function () {
              console.log(res)
              setTimeout(function () {
                //缓存提交数据到本地，以便于后期导出
                wx.setStorage({
                  key: that.data.count.toString(),
                  data: {
                    losterName: that.data.losterName,
                    id: that.data.id
                  },
                })
                wx.navigateTo({
                  url: '/pages/add/xxd/stu_card/stu_card?isSelect=' + that.data.location + "&times=" + that.data.times,
                  fail: function (res) {
                    console.log("开始调用wx.redirect")
                    wx.redirectTo({
                      url: '/pages/add/xxd/stu_card/stu_card?isSelect=' + that.data.location + "&times=" + that.data.times,
                    })
                  },
                }, 1000)
              })
            }
          })
          console.log(res)
        }
      })


      // const db = wx.cloud.database()
      // db.collection('stu_card').add({
      //   data: {
      //     losterName: this.data.losterName,
      //     due: this.getTime(),
      //     // 地理位置（113°E，23°N）
      //     //location: new db.Geo.Point(113, 23),
      //     id: this.data.id,
      //     location: this.data.location,
      //     xxd: true,
      //     done: false
      //   },
      //   success: function (res) {
      //     wx.hideLoading()
      //     wx.showToast({
      //       title: '提交成功',
      //       icon: 'success',
      //       duration: 1000,
      //       success: function () {
      //         console.log(res)
      //         // setTimeout(function () {
      //         //   //缓存提交数据到本地，以便于后期导出
      //         //   // wx.setStorage({
      //         //   //   key: that.data.num.toString(),
      //         //   //   data: {
      //         //   //     losterName: that.data.losterName,
      //         //   //     id: that.data.id
      //         //   //   },
      //         //   // })
      //         //   wx.redirectTo({
      //         //     url: '/pages/add/xxd/stu_card/stu_card?isSelect=' + that.data.location + "&times=" + that.data.times,
      //         //   })
      //         // }, 1000);
      //         setTimeout(function(){
      //           //缓存提交数据到本地，以便于后期导出
      //           wx.setStorage({
      //             key: that.data.count.toString(),
      //             data: {
      //               losterName: that.data.losterName,
      //               id: that.data.id
      //             },
      //           })
      //           wx.navigateTo({
      //             url: '/pages/add/xxd/stu_card/stu_card?isSelect=' + that.data.location + "&times=" + that.data.times,
      //             fail: function(res) {
      //               console.log("开始调用wx.redirect")
      //               wx.redirectTo({
      //               url: '/pages/add/xxd/stu_card/stu_card?isSelect=' + that.data.location + "&times=" + that.data.times,
      //             })},
      //           },1000)
      //         })
      //       }
      //     })
      //   },
      // })
    }
  }
})