<template>
	<div class="modal-datepicker">
		<label>{{label}}</label>
		<input type="text" readonly="readonly" autocomplete="off" disableautocomplete :name="field" :id="field" :value="value" :placeholder="placeholder" @touchstart="startChoice" ref="input">
		<div class="modal-wrapper" v-show="panelIsShow">
			<div class="modal-mask" @touchstart="panelIsShow = false"></div>
			<div class="modal-container">
				<div class="modal-btn-wrapper">
					<div class="btn" @touchstart="panelIsShow = false">×</div>
					<div class="btn save" @touchstart="saveDate">√</div>
				</div>
				<div class="modal-content date">
					<div class="picker-date" @touchstart="touchstartYear" @touchmove="touchmoveYear" @touchend="touchendYear">
						<ul class="year" ref="year" :style="{transform: 'translate3d(0, ' + offset.year + 'px, 0)',transition: transition.year}">
							<li></li>
							<li></li>
							<li v-for="year in dateData.year" v-text="year"></li>
							<li></li>
							<li></li>
						</ul>
					</div>
					<div class="picker-date" @touchstart="touchstartMonth" @touchmove="touchmoveMonth" @touchend="touchendMonth">
						<ul class="month" ref="month" :style="{transform: 'translate3d(0, ' + offset.month + 'px, 0)',transition: transition.month}">
							<li></li>
							<li></li>
							<li v-for="month in dateData.month" v-text="month"></li>
							<li></li>
							<li></li>
						</ul>
					</div>
					<div class="picker-date" @touchstart="touchstartDay" @touchmove="touchmoveDay" @touchend="touchendDay">
						<ul class="day" ref="day" :style="{transform: 'translate3d(0, ' + offset.day + 'px, 0)',transition: transition.day}">
							<li></li>
							<li></li>
							<li v-for="day in dateData.day" v-text="day"></li>
							<li></li>
							<li></li>
						</ul>
					</div>
					<div class="up"></div>
					<div class="down"></div>
					<div class="line"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			label:{
				type: String,
				default: ''
			},
			field: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			},
			format: {
				type: String,
				default: 'yyyy-mm-dd'
			},
			// 向前看，只能选今天及以后
			forward: {
				default: false
			},
			// 向后看
			backward: {
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			conf: {
				type: Object,
				default: function () {
					return {};
				}
			}
		},
		data() {
			let nowDate=new Date();
			let years=[];
			let nowYear=nowDate.getFullYear();//当前年
			let nowMonth=nowDate.getMonth()+1;//当前月
			let nowDay=nowDate.getDate();//当前日
			let earlyYear=1900;//最早的年
			let dValueYear=nowYear-earlyYear;//差值年

			/****年***/
			let stepH=document.documentElement.style.fontSize.slice(0,-1)/625*8*10;//每块数字的高度
			let initOffsetYear=0;
			if(this.backward && !this.forward)//向后
			{
				for(let i=0;i<=dValueYear;i++){
					years[i]=i+earlyYear;
				}
				initOffsetYear=-stepH*dValueYear;
			}
			else if(!this.backward && this.forward){//向前
				for(let i=0;i<=dValueYear;i++){
					years[i]=i+nowYear;
				}
				initOffsetYear=-stepH*(0-1);
			}
			else if(this.backward && this.forward){//前后都没有
				years[0]=nowYear;
				initOffsetYear=-stepH*0;
			}
			else{//前后都有
				for(let i=0;i<=dValueYear*2;i++){
					years[i]=i+earlyYear;
				}
				initOffsetYear=-stepH*dValueYear;
			}
			/****月***/
			let months=[];
			let initOffsetMonth=0;
			for(let i=0;i<12;i++){
				months[i]=i+1;
			}
			initOffsetMonth=-stepH*(nowMonth-1);

			/****日***/
			let days=this.monthChangeDay(nowYear,nowMonth);
			let initOffsetDay=-stepH*(nowDay-1);

			/*初始位置*/
			let stepYear=Math.floor(Math.abs(initOffsetYear/stepH));
			let stepMonth=Math.floor(Math.abs(initOffsetMonth/stepH));
			let stepDay=Math.floor(Math.abs(initOffsetDay/stepH));

			return {
				panelIsShow:false,
				dateData:{//年月日数据:数组
					year:years,
					month:months,
					day:days
				},
				offset:{//年月日:滚动距离
					year:initOffsetYear,//初始年的位置
					month:initOffsetMonth,//初始月的位置
					day:initOffsetDay//初始日的位置
				},
				transition:{//年月日:是否动画
					year:"none",
					month:"none",
					day:"none"
				},
				dateStep:{//年月日:所在位置序号
					year:stepYear,
					month:stepMonth,
					day:stepDay
				},
				stepH:stepH//每块数字的高度
			}
		},
		computed: {
		},
		methods: {
			touchstart(e, type) {
				this[type]=this[type]==null?{}:this[type];
				this[type].node=this.$refs[type];//节点
				//console.log(this[type].node);
				this[type].startY = e.touches[0].clientY;

				this[type].speeds = [];
				this[type].startTime = Date.now();
			},
			touchmove(e, type) {
				e.preventDefault();
				if(this[type].moveOffset==null){
					this[type].initOffset=this.offset[type];
				}
				this[type].moveOffset = e.touches[0].clientY - this[type].startY;//移动距离
				this.transition[type]="none";
				this.offset[type] = this[type].initOffset+this[type].moveOffset;
			},
			touchend(e, type) {
				this[type].endTime = Date.now();
				let downFastBool=false;
				let upFastBool=false;
				//快速移动判断
				if(this[type].endTime-this[type].startTime<=100)
				{
					if(this[type].moveOffset>=this.stepH){//表示快速下移
						downFastBool=true;
					}
					else if(this[type].moveOffset<=-this.stepH){//表示快速上移
						upFastBool=true;
					}
				}
				this[type].moveOffset=null;

				this.transition[type]="transform .15s";
				let step=-Math.floor(this.offset[type]/this.stepH);//移动个数
				let endMoveBool=Math.abs(Math.round(this.offset[type]%this.stepH/this.stepH))==1?true:false;//上移还是下移
				
				//快速移动
				if(downFastBool){
					step-=10;
				}
				if(upFastBool){
					step+=10;
				}
				//判断有没超出
				if(step<=0){//到顶了
					step=0;
				}
				else{
					if(!endMoveBool){//下移
						step--;
					}
					if(step>=this.dateData[type].length){//到底了
						step=this.dateData[type].length-1;
					}
				}

				this.dateStep[type]=step;//位置更新
				//日会随着年获月改变而改变
				if(type=="year" || type=="month"){
					let arrStep=[];
					for(var i in this.dateStep){
						arrStep.push(this.dateData[i][this.dateStep[i]]);
					}
					this.dateData.day=this.monthChangeDay(arrStep[0],arrStep[1]);
					
					if(arrStep[2]-1>this.dateData.day.length-1){//超过日期
						this.offset.day=-this.stepH*(this.dateData.day.length-1)
					}
					else{//正常切换
						this.offset.day=-this.stepH*(arrStep[2]-1);
					}
				}
				
				this.offset[type] = -step*this.stepH;
			},
			touchstartYear(e) {
				this.touchstart(e,"year");
			},
			touchmoveYear(e) {
				this.touchmove(e,"year");
			},
			touchendYear(e) {
				this.touchend(e,"year");
			},
			touchstartMonth(e) {
				this.touchstart(e,"month");
			},
			touchmoveMonth(e) {
				this.touchmove(e,"month");
			},
			touchendMonth(e) {
				this.touchend(e,"month");
			},
			touchstartDay(e) {
				this.touchstart(e,"day");
			},
			touchmoveDay(e) {
				this.touchmove(e,"day");
			},
			touchendDay(e) {
				this.touchend(e,"day");
			},
			// 显示日期框
			startChoice(e) {
				this.panelIsShow = true;
			},
			saveDate() {
				this.panelIsShow = false
				let arrStep=[];
				for(var i in this.dateStep){
					arrStep.push(this.dateData[i][this.dateStep[i]]);
				}
				console.log(arrStep);
				let value=this.dateFormat(arrStep[0], arrStep[1], arrStep[2], this.format);
				this.$emit("input",value);//发送数据
			},
			//年月改变日
			monthChangeDay(nowYear,nowMonth){
				let days=[];
				let num=0;
				if([1,3,5,7,8,10,12].indexOf(nowMonth)!=-1){
					num=31;
				}
				else if([4,6,9,11].indexOf(nowMonth)!=-1){
					num=30;
				}
				else{//2月
					if(nowYear%4==0){//闰年
						num=29;
					}
					else{
						num=28;
					}
				}

				for(let i=0;i<num;i++){
					days[i]=i+1;
				}
				return days;
			},
			//	日期格式化输出
			dateFormat(y, m, d, fm) {
				if (!fm) {
					fm = 'yyyy-mm-dd';
				}
				m = ('0' + (parseInt(m))).slice(-2);
				d = ('0' + d).slice(-2);
				return fm.replace('yyyy', y)
						.replace('YYYY', y)
						.replace('mm', m)
						.replace('MM', m)
						.replace('DD', d)
						.replace('dd', d);
			},
			// 比较两个日期大小，返回 -1 0 1
			dateCompare(date1, date2) {
				if(date1.year == date2.year){
					if(date1.day && date2.day) {
						if(date1.month == date2.month){
							return date1.day > date2.day ? 1 : (date1.day == date2.day ? 0 : -1);
						}else {
							return date1.month > date2.month ? 1 : -1;
						}
					}else {
						return date1.month > date2.month ? 1 : (date1.month == date2.month ? 0 : -1);
					}
				}else {
					return date1.year > date2.year ? 1: -1;
				}
			}
		},
		mounted(){

		},
		activated(){

		},
		deactivated(){

		}
	}
</script>

<style lang="less" scoped>
@fz:100rem;
.modal-datepicker{ display:flex; margin-bottom: 12/@fz;
	label{ flex:1; line-height:40/@fz;font-family:Microsoft YaHei;font-size: 12px;}
	input{ flex:3; padding:6/@fz; border:#d8d8d8 1px solid;line-height:40/@fz; height: 40/@fz;font-family: Microsoft YaHei;font-size: 12px;}
	}
.modal-wrapper {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left:0;
	z-index: 99999;
	transition: opacity .2s;
}
.modal-mask {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	background-color: rgba(0, 0, 0, .4);
}
.modal-content {
	position: relative;
}
.modal-content.sex {
	width: 100%;
	position: absolute;
	bottom: 0;
	transition: all .3s;
	background-color: #F0F0F0;

	ul {
		padding: 0 .2rem;
		background-color: #FFF;
	}

	li {
		text-align: center;
		font-size: .32rem;
		line-height: .9rem;
	}

	li:first-child {
		border-bottom: 1px solid #EEE;
	}

	.btn {
		height: .9rem;
		margin-top: .1rem;
	}
}
.modal-enter .modal-content, .modal-leave .modal-content, .modal-enter .modal-container, .modal-leave .modal-container {
	transform: translateY(100%);
}

.modal-container {
	width: 100%;
	position: absolute;
	bottom: 0;
	background-color: #FFF;
	transition: all .2s;
}
.modal-btn-wrapper {
	display: flex;
	justify-content: space-between;

	.btn {
		width: .8rem;
		height: .8rem;
		text-align:center;
		line-height:.8rem;
		font-size:.6rem;
		font-family:Georgia;
	}

	.save {
		
	}
}

.modal-content.date {
	font-size: 0;

	.picker-date {
		display: inline-block;
		width: 33%;
		height: 4rem;
		overflow: hidden;
	}

	ul::-webkit-scrollbar {
		display: none;
	}

	li {
		height: .8rem;
		text-align: center;
		font-size: .28rem;
		line-height: .8rem;
	}

	.up, .down {
		width: 100%;
		height: 50%;
		position: absolute;
		pointer-events: none;
		background-image: linear-gradient(to bottom, #FFF, rgba(255, 255, 255, 0));
	}

	.up {
		top: 0;
	}

	.down {
		bottom: 0;
		background-image: linear-gradient(to top, #FFF, rgba(255, 255, 255, 0));
	}

	.line {
		width: 95%;
		height: .8rem;
		position: absolute;
		top: 50%;
		left: 50%;
		pointer-events: none;
		box-sizing: border-box;
		border-top: 1px solid #DCDCDC;
		border-bottom: 1px solid #DCDCDC;
		transform: translate(-50%, -50%);
	}
}
</style>
