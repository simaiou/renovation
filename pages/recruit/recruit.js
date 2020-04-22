// 引入封装请求
const request = require('../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
	data: {
		list: ['水工','电工','瓦工','木工','油漆工','力工','其他'],
		result: [],
		show: false,
		title: '',
		job: '',
		addName: '', //地名
		address: '', //地址
		location: '', //经纬度
		contacts: '',
		tel: '',
		detail:'',
		salaryIndex:null,
		salaryPicker:['面议','100-150/天','150-200/天','200-300/天']
	},
	onChange(event) {
		this.setData({
			result: event.detail
		});
	},
	toggle(event) {
		const {
			index
		} = event.currentTarget.dataset;
		const checkbox = this.selectComponent(`.checkboxes-${index}`);
		checkbox.toggle();
	},
	noop() {},

	showPopup() {
		this.setData({
			show: true,
			detailFlag: false
		});
	},

	onClose() {
		this.setData({
			show: false,
			detailFlag: true
		});
	},

	titleInput(e) {
		this.setData({
			title: e.detail.value
		})
	},
	contactInput(e) {
		this.setData({
			contacts: e.detail.value
		})
	},
	// 选择地址
	chooseAddress() {
		var that = this;
		that.setData({
			addName: ''
		});
		wx.chooseLocation({
			success: function(res) {
				console.log(res)
				that.setData({
					addName: res.name,
					location: res.latitude + ',' + res.longitude,
					address:res.address,
				});
			}
		});
	},
	telInput(e) {
		this.setData({
			tel: e.detail.value
		})
	},
	salaryPickerChange(e){
		console.log(e);
		this.setData({
		  salaryIndex: e.detail.value,
		})
	},
	publishHandle() {
		if(this.data.title===''){
			wx.showToast({
				title:'输入标题',
				duration:2000,
				icon:'none',
				mask:true
			})
			return false
		}else if(this.data.result.length===0){
			wx.showToast({
				title:'选择所需工种',
				duration:2000,
				icon:'none',
				mask:true
			})
			return false
		}else if(this.data.addName===''){
			wx.showToast({
				title:'选择详细地址',
				duration:2000,
				icon:'none',
				mask:true
			})
			return false
		}else if(this.data.contacts===''){
			wx.showToast({
				title:'输入联系人',
				duration:2000,
				icon:'none',
				mask:true
			})
			return false
		}else if(this.data.tel===''){
			wx.showToast({
				title:'输入联系电话',
				duration:2000,
				icon:'none',
				mask:true
			})
			return false
		}
		else if(this.data.salaryIndex===null){
			wx.showToast({
				title:'选择意向工资',
				duration:2000,
				icon:'none',
				mask:true
			})
			return false
		}else if(this.data.detail===''){
			wx.showToast({
				title:'输入招工详情',
				duration:2000,
				icon:'none',
				mask:true
			})
			return false
		} else if(wx.getStorageSync('userInfo').id){
			request.sendRequest(config.publishRecruit, 'POST', {
					title: this.data.title,
					job: this.data.result.join('/'),
					addName: this.data.addName,
					contacts: this.data.contacts,
					tel: this.data.tel,
					salary:this.data.salaryPicker[this.data.salaryIndex],
					details: this.data.detail,
					uid: wx.getStorageSync('userInfo').id,
					time: Date.now(),
					location: this.data.location,
					address:this.data.address
				}, {
					"Content-Type": "application/x-www-form-urlencoded",
					token:wx.getStorageSync('token')
				})
				.then(function(res) {
					if (res.data.code === 200) {
					wx.switchTab({
						url: '../index/index',
					})
					}
				}, function(error) {
					console.log(error)
				})
		}

	},
	toDetail() {
		wx.navigateTo({
			url: `./detail/detail?value=${this.data.detail}`
		})
	},
	onShow(){
		if(!wx.getStorageSync('userInfo').id){
				wx.navigateTo({
				  url: '../login/login',//授权页面
				})
		}
	}
})
