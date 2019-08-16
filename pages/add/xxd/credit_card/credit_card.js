const app = getApp()
Page({
  data: {
    id: '',
    location: '',
    xxd: '',
    isSelect1: '',
    isSelect2: '',
    times: '1',  //已废弃
    num: '' , //提交个数
    bank:''
  },
  //结束提交数据
  endSubmit: function () {
    var that = this
    //判断用户是否未提交过数据就结束提交
    if (this.data.times.length - 1 == 0) {
      wx.showModal({
        title: '提示',
        content: '你暂未提交数据',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确认结束提交吗？',
        success(res) {
          if (res.confirm) {
            //console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/add/feedback/feedback?times=' + that.data.times.length,
            })
          } else if (res.cancel) {
            //console.log('用户点击取消')
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
      num: this.data.times.length - 1
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
    var myDate = new Date();
    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1;       //获取当前月份(1-12)
    var day = myDate.getDate();        //获取当前日(1-31)
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    //获取完整年月日
    var newDay = year + "/" + month + "/" + day + "  " + hours + ":" + minutes;
    return newDay;
  },
  //表单提交数据处理
  formSubmit: function (e) {
    console.log('form发生了submit事件：', e.detail.value)
    this.setData({
      bank: e.detail.value.bank,
      id: e.detail.value.id,
    })
  },
  //数据库操作
  onAdd: function () {
    var that = this;
    //计数
    this.setData({
      times: this.data.times + 1
    });


    if (this.data.bank.length == 0 || this.data.id.length == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写完整数据'
      });
    } else {
      wx.showLoading({
        title: '正在提交...',
      })
      const db = wx.cloud.database()
      db.collection('credit_card').add({
        data: {
          bank: this.data.bank,
          due: this.getTime(),
          // 地理位置（113°E，23°N）
          //location: new db.Geo.Point(113, 23),
          id: this.data.id,
          location: this.data.location,
          xxd: true,
          done: false
        },
        success: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                //缓存提交数据到本地，以便于后期导出
                wx.setStorage({
                  key: that.data.num.toString(),
                  data: {
                    bank: that.data.bank,
                    id: that.data.id
                  },
                })
                wx.navigateTo({
                  url: '/pages/add/xxd/ic_card/ic_card?isSelect=' + that.data.location + "&times=" + that.data.times,
                })
              }, 2000);
            }
          });

          // wx.redirectTo({
          //   url: '/pages/add/xxd/ic_card/ic_card',
          //   // url: '/pages/add/feedback/feedback',
          // })
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id

        },
        fail: console.error
      })
    }
  }
})