// 引入封装请求
const request = require('../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
	data: {
		userInfo: {}
	},
	onShow() {
		if(!wx.getStorageSync('token')){
			wx.redirectTo({
				url: "../login/login"
			})
		}else{
			this.getUserInfo()
		}
	},
	getUserInfo() {
			var that = this
			request.sendRequest(config.getuserInfo, 'GET', {}, {
					'Accept': 'application/json',
					token:wx.getStorageSync('token')
				})
				.then(function(res) {
					console.log(res)
					if (res.data.code == 200) {
						wx.setStorageSync("userInfo", res.data.data[0])
						that.setData({
							userInfo: res.data.data[0]
						})
					}
				}, function(error) {
					console.log(error)
				})
	}
})
