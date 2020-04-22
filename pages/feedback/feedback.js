// 读取本地缓存接口地址
var config = (wx.getStorageSync("config"))
// 引入封装请求
const request = require('../../utils/request')
Page({
	data: {
		// 字数限制
		current: 0,
		max: 300,
		message: ''
	},
	// 文本框字数限制
	limit: function(e) {
		this.setData({
			message: e.detail.value
		})
		var value = e.detail.value;
		var length = parseInt(value.length);
		if (length > this.data.noteMaxLen) {
			return;
		}
		this.setData({
			current: length
		});
	},
	submit() {
		var that = this
		if (this.data.message !== '') {
			request.sendRequest(config.userFeedback, 'POST', {
					message: this.data.message,
					time: Date.now()
				}, {
					"Content-Type": "application/x-www-form-urlencoded",
					token:wx.getStorageSync('token')
				})
				.then(function(res) {
					if (res.data.code === 200) {
						that.setData({
							message:''
						})
						wx.showToast({
							title: '感谢反馈！',
							duration: 2000,
							mask:true,
							icon: 'none',
							success: function() {
								setTimeout(function() {
									wx.reLaunch({
										url: '../my/my'
									})
								}, 2000)
							}
						})
					}
				}, function(error) {
					console.log(error)
				})
		} else {
			wx.showToast({
				title: '请输入反馈内容！',
				duration: 3000,
				icon: 'none',
			})
		}
	},
	onShow() {
		if (!wx.getStorageSync('userInfo').id) {
			wx.navigateTo({
				url: '../login/login', //授权页面
			})
		}
	}
})
