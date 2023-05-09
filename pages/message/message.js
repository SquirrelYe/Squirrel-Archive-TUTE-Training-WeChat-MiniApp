// pages/message/ message.js
const util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    //三则通讯信息
    time: [],
    message: [],
    all: [{ judge: 'tuling', message: '我是你们的小泫泫，欢迎撩哦~', time: '2018-10-11' }],
    send: '#e6e6e6',

    msg: '',
    toindex: 0,
    img_index: 0
  },

  btn: function (e) {
    console.log(e.currentTarget, this.data.toindex);
  },

  send: function () {
    var that = this;
    var time_now = util.formatTime(new Date());
    var newarray = [
      {
        judge: 'me',
        message: this.data.msg,
        time: time_now
      }
    ];
    //数据绑定
    var index = this.data.toindex + 1;
    this.setData({
      all: this.data.all.concat(newarray),
      toindex: index
    });
    //创建tuling_api需要的数据
    var sendMsg = {
      reqType: 0,
      perception: {
        inputText: {
          text: `${this.data.msg}`
        }
      },
      userInfo: {
        apiKey: '9b5bb51992da406fb4a90b3602a44a42',
        userId: '333594'
      }
    };
    wx.showLoading({
      title: 'send success...'
    });
    this.sendTulingApi(sendMsg);
  },

  sendTulingApi: function (data) {
    var msg = data;
    var that = this;
    var str = this.data.msg;
    wx.request({
      //连接后台服务器
      url: `${app.globalData.url}/tuling_api`,
      data: {
        judge: '1',
        data: msg
      },
      success: function (res) {
        wx.hideLoading();
        that.acceptCallBack(res.data.results[0].values.text, '');
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  acceptCallBack: function (acceptMsg, img_index) {
    var that = this;
    var time_now = util.formatTime(new Date());
    var newarray = [
      {
        judge: 'tuling',
        message: acceptMsg,
        time: img_index
      }
    ];
    //数据绑定
    this.setData({
      all: this.data.all.concat(newarray),
      msg: '',
      toindex: this.data.toindex + 1
    });
  },

  send_text: function (e) {
    this.setData({ msg: e.detail.value });
  },

  send_color: function (e) {
    this.setData({ send: 'green' });
  },

  send_color_1: function (e) {
    this.setData({ send: '#e6e6e6' });
  },

  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.closeSocket({});
    console.log('WebSocket 已关闭！');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
