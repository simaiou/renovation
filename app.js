// 引入封装请求
const request = require('./utils/request')
// 引入请求接口地址
var config = require("./config.js")
App({
	globalData: {

	},
	onLaunch: function() {
		var that = this
		wx.setStorageSync("config", config)
		this.getOpenId()
	},
	getOpenId() {
		var config = (wx.getStorageSync("config"))
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				if (res.code) {
					var that = this
					request.sendRequest(config.getOpenId, 'POST', {
						code: res.code
					}, {
							"Content-Type": "application/x-www-form-urlencoded"
						})
						.then(function(res) {
							if (res.data.code == 200) {
								//把openId存本地缓存
								wx.setStorageSync('openId', res.data.body.openid)
							}
						}, function(error) {
							console.log(error)
						})
				}
			}
		})
	},
	onHide: function() { 
		console.log("小程序完全退出了")

	},
	onShow: function(options) {
		console.log('进来了');
}
})
