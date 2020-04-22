// 引入封装请求
const request = require('../../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
	data: {
		active: 0,
		myCollectWork:[],
		myCollectWorker:[]
	},
	// 选项卡切换
  onChange(event) {
  
  },
	onLoad() {

	},
	onShow(){
		this.getMyCollectWork()
		this.getMyCollectWorker()
	},
	// 我收藏的工作
	getMyCollectWork() {
		var that = this
		request.sendRequest(config.getMyCollectWork, 'GET', {}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')
			})
			.then(function(res) {
				console.log(res)
				if (res.data.code == 200) {
				that.setData({
					myCollectWork:res.data.data
				})
				}
			}, function(error) {
				console.log(error)
			})
	},
	// 获得我收藏的工人
	getMyCollectWorker() {
		var that = this
		request.sendRequest(config.getMyCollectWorker, 'GET', {}, {
				'Accept': 'application/json',
				token:wx.getStorageSync('token')
			})
			.then(function(res) {
				console.log(res)
				if (res.data.code == 200) {
				that.setData({
					myCollectWorker:res.data.data
				})
				}
			}, function(error) {
				console.log(error)
			})
	}
})
