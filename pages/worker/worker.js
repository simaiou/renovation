// 引入封装请求
const request = require('../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
	data: {
		workerList: [],
		option1: [{
				text: '全市',
				value: '全市'
			},
			{
				text: '沙河口',
				value: '沙河口'
			},
			{
				text: '甘井子',
				value: '甘井子'
			},
			{
				text: '中山',
				value: '中山'
			},
			{
				text: '西岗',
				value: '西岗'
			},
			{
				text: '高新园区',
				value: '高新园区'
			},
			{
				text: '开发区',
				value: '开发区'
			}
		],
		option2:[{ text: '全部', value: '全部' },
				     { text: '水工', value: '水工' },
				     { text: '电工', value: '电工' },
				     { text: '瓦工', value: '瓦工' },
						 { text: '木工', value: '木工' },
						 { text: '油漆工', value: '油漆工' },
						 { text: '力工', value: '力工' },
						 { text: '其他', value: '其他' }] ,
		option3: [{
				text: '推荐排序',
				value: '推荐排序'
			},
			{
				text: '最新',
				value: '最新'
			},
		],
		value1: '全市',
		value2: '全部',
		value3: '推荐排序'
	},
	getSeekJobBySort() {
		var that = this
		request.sendRequest(config.getSeekJobBySort, 'GET', {
				area: this.data.value1,
				job: this.data.value2,
				sort: this.data.value3
			}, {
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
	search(e){
		var keyWord = e.detail.value
		var that = this
		request.sendRequest(config.searchWorker, 'GET', {
				keyWord: keyWord
			}, {
				'Accept': 'application/json'
			})
			.then(function(res) {
				if (res.data.code == 200) {
					that.setData({
						workerList: res.data.data,
					})
				}
			}, function(error) {
				console.log(error)
			})
	},
	searchChange(){
		this.setData({
		value1: '全市',
		value2: '全部',
		value3:'推荐排序'
		})
		this.getSeekJobBySort()
	},
	onLoad(){
		this.getSeekJobBySort()
		wx.stopPullDownRefresh()
	},
	// 地区切换
	areaToggle(e) {
		this.setData({
			value1: e.detail
		})
		this.getSeekJobBySort()

	},
	// 工种切换
	jobToggle(e) {
		this.setData({
			value2: e.detail
		})
		this.getSeekJobBySort()
	},
	// 排序切换
	sortToggle(e) {
		this.setData({
			value3: e.detail
		})
		this.getSeekJobBySort()
	},
	onPullDownRefresh: function() {
		this.onLoad()
	},
})
