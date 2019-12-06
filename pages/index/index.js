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
    {
      title: '学生证 ',
      name: 'Stu_card',
      color: 'red',
      icon: 'more',
      nicname: "stu_card"
    },
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
        // url: '/pages/square/square'
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

    onShow: function (e) {
      this.setData({
        msgList: [
          { title: "已帮助3412人找回离家出走的校园卡、身份证等物品" },
          { title: "交了20多年的国内漫游费将取消 你能省多少话费？" },
          { title: "北大教工合唱团出国演出遇尴尬:被要求给他人伴唱" }]
      });
    }
    // onShareAppMessage() {
    //   return {
    //     title: 'ColorUI-高颜值的小程序UI组件库',
    //     imageUrl: 'https://image.weilanwl.com/color2.0/share2215.jpg',
    //     path: '/pages/basics/home/home'
    //   }
    // },
  },
})