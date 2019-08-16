wx.cloud.init()
const app = getApp()
Page({
  data: {
    // openid: '',
    queryResult: '',
    inputValue: '',
    losterName: '',
    id: '',
    finderName: '',
    tel: '',
    due: '',
    empty: '',
    xdd: '',
    location: '',
    markers1: [{
      id: 1,
      latitude: 27.895723,
      longitude: 112.924368,
      name: '湖南科技大学学生安全信息队一中队'
    }],
    markers2: [{
      id: 1,
      latitude: 27.904679,
      longitude: 112.910330,
      name: '湖南科技大学学生安全信息队二中队'
    }]
  },
  inputBind: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
    // console.log('bindInput' + this.data.inputValue)

  },
  //拨打电话
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.tel,
      success: function () {
        console.log('拨打电话成功')
      }
    })
  },

  // onLoad: function (options) {
  //   if (app.globalData.openid) {
  //     this.setData({
  //       openid: app.globalData.openid
  //     })
  //   }
  // },

  onQuery: function () {
    if (this.data.inputValue.length == 0) {
      console.log("输入数据为空");
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '输入数据不能为空',
      })

    } else {
      wx.showLoading({
        title: '搜索中...',
        icon: 'loading'
      })
      const db = wx.cloud.database()
      db.collection('id_card').where({
        id: this.data.inputValue
      }).get({
        success: res => {
          wx.hideLoading();
          //判断是否查找到数据
          if (!res.data.length) {
            this.setData({
              empty: true,
              queryResult: false,
              xxd: false
            })
            wx.showModal({
              title: '温馨提示！',
              content: '数据库中暂未找到你提交的数据，请耐心等待',
            })
            console.log('[数据库] [查询记录] 失败: ', res)
          }
          //判断是否为信息队提交
          else {
            console.log("找到数据了");
            if (res.data[0].xxd) {
              this.setData({
                xxd: true,
                queryResult: false,
                empty: false,
                losterName: res.data[0].losterName,
                id: res.data[0].id,
                finderName: res.data[0].finderName,
                tel: res.data[0].tel,
                due: res.data[0].due,
                location: res.data[0].location
              })
              console.log("信息队提交", res);
              console.log(this.data.location)
            } else {
              console.log("个人提交");
              this.setData({
                queryResult: true,
                empty: false,
                xxd: false,
                losterName: res.data[0].losterName,
                id: res.data[0].id,
                finderName: res.data[0].finderName,
                tel: res.data[0].tel,
                due: res.data[0].due,
              })
              console.log('[数据库] [查询记录] 成功: ', res)
            }
          }
        }
      })
    }
  }
})
