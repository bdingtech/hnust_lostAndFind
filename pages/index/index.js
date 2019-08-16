Page({
  data: {
    PageCur: 'basics'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  }
})
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
      title: '校园卡',
      name: 'ic Card',
      color: 'cyan',
      icon: 'card',
      nicname:'ic_card'
    },
    {
      title: '身份证',
      name: 'ID_Card',
      color: 'blue',
      icon: 'news',
      nicname:'id_card'
    },
    {
      title: '银行卡',
      name: 'Credit_Card',
      color: 'green',
      icon: 'vipcard',
      nicname:'credit_card'
    },
    // {
    //   title: '更多 ',
    //   name: '敬请期待...',
    //   color: 'red',
    //   icon: 'more',
    //   nicname: "more"
    // },
    ],
  },
  methods: {
    //bindMore  当点击更多时抛出提示  单独处理
    bindMore:function(){
      wx.showModal({
        title: '温馨提示',
        showCancel: false,
        content: '更多功能正在开发中，敬请期待...',
      })
    },
    nav: function () {
      wx.navigateTo({
        url: '/pages/about/home/home'
      })
    },
    onLoad() {
      let that = this;
      // 获取用户信息
      // wx.getSetting({
      //   success: res => {
      //     if (!res.authSetting['scope.userInfo']) {
      //       wx.redirectTo({
      //         url: '/pages/auth/auth'
      //       })
      //     }
      //   }
      // })
    },
      NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    toggleDelay() {
      var that = this;
      that.setData({
        toggleDelay: true
      })
      setTimeout(function () {
        that.setData({
          toggleDelay: false
        })
      }, 1000)
    },
    // onShareAppMessage() {
    //   return {
    //     title: 'ColorUI-高颜值的小程序UI组件库',
    //     imageUrl: 'https://image.weilanwl.com/color2.0/share2215.jpg',
    //     path: '/pages/basics/home/home'
    //   }
    // },
  },
})