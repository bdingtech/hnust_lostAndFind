const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: [{
        title: '校园卡',
      img: 'https://bdimges.oss-cn-shenzhen.aliyuncs.com/miniProgram/sylb2244.jpg',
        url: '/pages/add/ic_card/ic_card'
    },
      {
        title: '身份证',
        img: 'https://bdimges.oss-cn-shenzhen.aliyuncs.com/miniProgram/wdh2236.jpg',
        url: '/pages/add/id_card/id_card'
      },
      {
        title: '银行卡',
        img: 'https://bdimges.oss-cn-shenzhen.aliyuncs.com/miniProgram/qpct2148.jpg',
        url: '/pages/add/credit_card/credit_card'
      },
      {
        title: '学生证',
        img: 'https://bdimges.oss-cn-shenzhen.aliyuncs.com/miniProgram/qpczdh2307.jpg',
        url: '/pages/add/stu_card/stu_card'
      }
    ]
  },
  methods: {
    toChild(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
  }
});