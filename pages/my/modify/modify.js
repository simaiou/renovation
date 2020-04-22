// 引入封装请求
const request = require('../../../utils/request')
// 请求接口地址
var config = wx.getStorageSync('config')
Page({
	data:{
		result: [],
		workerInfo:{},
		show: false,
		list: ['水工','电工','瓦工','木工','油漆工','力工','其他'],
		sexIndex: null,
		sexPicker: ['男', '女'],
		proIndex: null,
		proPicker: ['学徒工', '中级工','高级工'],
		name:'',
		age:'',
		job:'',
		seniority:'',
		position:'',
		tel:'',
		detail:'',
		addName:'',		//地址名称
		address:'',//详细地址
		location:''  //经纬度
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
			detailFlag:false
		});
	},
	
	onClose() {

		this.setData({
			show: false,
			detailFlag:true
		});
	},
		sexPickerChange(e) {
	    this.setData({
	      sexIndex: e.detail.value,
	    })
	  },
		proPickerChange(e) {
		  console.log(e);
		  this.setData({
		    proIndex: e.detail.value,
		  })
		},
	nameInput(e){
		this.setData({
			name:e.detail.value
		})
	},
	ageInput(e){
		this.setData({
			age:e.detail.value
		})
	},
	jobInput(e){
		this.setData({
			job:e.detail.value
		})
	},
	seniorityInput(e){
		this.setData({
			seniority:e.detail.value
		})
	},
	telInput(e){
		this.setData({
			tel:e.detail.value
		})
	},
	publishHandle(){
			request.sendRequest(config.modifyMyCard, 'POST', {
			name:this.data.name,
			sex:this.data.sexPicker[this.data.sexIndex],
			age:this.data.age,
			job:this.data.result.join('/'),
			seniority:this.data.seniority,
			proficiency:this.data.proPicker[this.data.proIndex],
			addName:this.data.addName,
			tel:this.data.tel,
			introduce:this.data.detail,
			time:Date.now(),
			location:this.data.location,
			address:this.data.address
				}, {
					"Content-Type": "application/x-www-form-urlencoded",
					token:wx.getStorageSync('token')
				})
				.then(function(res) {
					if (res.data.code === 200) {
						wx.showToast({
							title:'修改成功！',
							duration:2000,
							icon:'none',
							mask:true,
							success:function(){
								setTimeout(function(){
									wx.switchTab({
										url: '../../my/my',
									})
								},2000)
							}
						})
					}
				}, function(error) {
					console.log(error)
				})
		
	},
	chooseAddress() {
		var that = this;
		that.setData({
			addName: ''
		});
		wx.chooseLocation({
			success: function(res) {	
				console.log('获取位置了')
				that.setData({
					addName: res.name,
					location: res.latitude + ',' + res.longitude,
					address:res.address
				});	
			}
		});
	},
	toDetail() {
		wx.navigateTo({
			url: `./detail/detail?value=${this.data.detail}`
		})
	},
	// 获取原先找活信息
	getSeekJobByUid(){
		var that = this
			request.sendRequest(config.getSeekJobByUid, 'GET', {}, {
					'Accept': 'application/json',
					token:wx.getStorageSync('token')
				})
				.then(function(res) {
					console.log(res)
					if (res.data.code == 200) {
						that.setData({
							name:res.data.data[0].name,
							age:res.data.data[0].age,
							result:res.data.data[0].job.split('/'),
							seniority:res.data.data[0].seniority,
							addName:res.data.data[0].addName,
							tel:res.data.data[0].tel,
							detail:res.data.data[0].introduce
						})
					}
				}, function(error) {
					console.log(error)
				})
	},
	onShow(){
		if(!wx.getStorageSync('token')){
				wx.navigateTo({
				  url: '../../login/login',//授权页面
				})
		}
	},
	onLoad(){
		this.getSeekJobByUid()
	}
})