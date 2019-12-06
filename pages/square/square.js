Page({
  data: {
    TabCur: 0,
    scrollLeft: 0
  },
  onLoad:function(options){
    console.log("111");
    this.loadModal();
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  loadModal() {
    this.setData({
      loadModal: true
    })
    setTimeout(() => {
      this.setData({
        loadModal: false
      })
    }, 2000)
  }
})