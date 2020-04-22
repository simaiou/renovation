// 引入封装请求
const request = require('../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
	data: {
		recruitList: [],
		seekJobList: [],
	},
	// 获取所有招工信息
	getAllRecruit() {
		var that = this
		request.sendRequest(config.getAllRecruit, 'GET', {}, {
				'Accept': 'application/json'
			})
			.then(function(res) {
				if (res.data.code == 200) {
					that.setData({
						recruitList: res.data.data
					})
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 获取所有找活信息
	getAllSeekJob() {
		var that = this
		request.sendRequest(config.getAllSeekJob, 'GET', {}, {
				'Accept': 'application/json'
			})
			.then(function(res) {
				if (res.data.code == 200) {
					that.setData({
						workerList: res.data.data
					})
				}
			}, function(error) {
				console.log(error)
			})
	},
	toWork() {
		wx.switchTab({
			url: '../work/work'
		})
	},
	toWorker() {
		wx.switchTab({
			url: '../worker/worker'
		})
	},
	moreJob() {
		wx.switchTab({
			url: '../work/work'
		})
	},
	moreWorker() {
		wx.switchTab({
			url: '../worker/worker'
		})
	},
	onLoad: function() {
		this.getAllRecruit()
		this.getAllSeekJob()
		wx.stopPullDownRefresh()
	},
	onPullDownRefresh: function() {
	this.onLoad()
	},
})
