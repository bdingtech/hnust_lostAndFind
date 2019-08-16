const app = getApp()
Page({
  data: {
    losterName: '',
    id: '',
    finderName: '',
    tel: ''
  },
  //获取当前时间函数
  getTime: function() {
    var myDate = new Date();
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1; //获取当前月份(1-12)
    var day = myDate.getDate(); //获取当前日(1-31)
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    //获取完整年月日
    var newDay = year + "/" + month + "/" + day + "  " + hours + ":" + minutes;
    return newDay;
  },
  //表单提交数据处理
  formSubmit: function(e) {
    console.log('form发生了submit事件：', e.detail.value)
    this.setData({
      losterName: e.detail.value.losterName,
      id: e.detail.value.id,
      finderName: e.detail.value.finderName,
      tel: e.detail.value.tel
    })
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
      const db = wx.cloud.database()
      db.collection('id_card').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          losterName: this.data.losterName,
          due: this.getTime(),
          // 为待办事项添加一个地理位置（113°E，23°N）
          //location: new db.Geo.Point(113, 23),
          id: this.data.id,
          finderName: this.data.finderName,
          tel: this.data.tel,
          done: false
        },
        success: function (res) {
          wx.hideLoading();
          wx.redirectTo({
            url: '../feedback/feedback',
          })
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        },
        fail: console.error
      })
    }
  },
  //数据库操作
  onAdd: function() {
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
      const db = wx.cloud.database()
      db.collection('id_card').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          losterName: this.data.losterName,
          due: this.getTime(),
          // 为待办事项添加一个地理位置（113°E，23°N）
          //location: new db.Geo.Point(113, 23),
          id: this.data.id,
          finderName: this.data.finderName,
          tel: this.data.tel,
          done: false
        },
        success: function(res) {
          wx.hideLoading();
          wx.redirectTo({
            url: '../feedback/feedback',
          })
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        },
        fail: console.error
      })
    }
  }

})