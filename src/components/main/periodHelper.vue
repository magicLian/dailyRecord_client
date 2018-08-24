<template>
    <div class="main" v-loading="loading">
        <div class="calendarContainer">
            <div class="calendarContent">
                <Calendar ref="Calendar"
                          :sundayStart="true"
                          v-on:choseDay="clickDay"
                          v-on:changeMonth="changeMouth">
                </Calendar>
            </div>
        </div>
        <div class="colorForWhat">
            <li><span style="background-color: rgba(255,60,81,0.91)"></span>经期</li>
            <li><span style="background-color: rgba(255,60,81,0.53)"></span>预测经期</li>
            <li><span style="background-color: #ff83d3;"></span>排卵期</li>
        </div>
        <div class="todayDetailInfo" v-show="todayDetailVisible">
            <el-form ref="form" :model="todayDetail" label-width="80px">
                <el-form-item label="经期开始">
                    <el-switch v-model="todayDetail.isPeriodStart" @change="startPeriodChangeFunc"></el-switch>
                </el-form-item>
                <el-form-item label="经期结束">
                    <el-switch v-model="todayDetail.isPeriodEnd" @change="endPeriodChangeFunc"></el-switch>
                </el-form-item>
                <el-form-item label="爱爱">
                    <el-switch v-model="todayDetail.hasLove"></el-switch>
                </el-form-item>
                <el-form-item label="月经详情">
                    <el-collapse>
                        <el-collapse-item>
                            <el-form-item label="痛经" style="border-bottom: 0px;">
                                <el-radio-group v-model="todayDetail.periodHurt" size="mini">
                                    <el-radio label="1">轻度</el-radio>
                                    <el-radio label="2">中度</el-radio>
                                    <el-radio label="3">重度</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="流量" style="border-bottom: 0px;">
                                <el-radio-group v-model="todayDetail.flowQuality" size="mini">
                                    <el-radio label="1">很少</el-radio>
                                    <el-radio label="2">较少</el-radio>
                                    <el-radio label="3">平均</el-radio>
                                    <el-radio label="4">较多</el-radio>
                                    <el-radio label="5">很多</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="血色" style="border-bottom: 0px;">
                                <el-radio-group v-model="todayDetail.bloodColor" size="mini">
                                    <el-radio label="1">很浅</el-radio>
                                    <el-radio label="2">较浅</el-radio>
                                    <el-radio label="3">中等</el-radio>
                                    <el-radio label="4">较深</el-radio>
                                    <el-radio label="5">很深</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="经血" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.periodShape" size="mini">
                                    <el-checkbox label="1">血块</el-checkbox>
                                    <el-checkbox label="2">异味</el-checkbox>
                                    <el-checkbox label="3">渣状</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-collapse-item>
                    </el-collapse>
                </el-form-item>
                <el-form-item label="身体状况">
                    <el-collapse>
                        <el-collapse-item>
                            <el-form-item label="头部" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.head" size="mini">
                                    <el-checkbox label="1">头痛</el-checkbox>
                                    <el-checkbox label="2">眩晕</el-checkbox>
                                    <el-checkbox label="3">粉刺</el-checkbox>
                                    <el-checkbox label="4">发热</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="身体" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.body" size="mini">
                                    <el-checkbox label="1">乳房胀痛</el-checkbox>
                                    <el-checkbox label="2">身体酸痛</el-checkbox>
                                    <el-checkbox label="3">小腹坠胀</el-checkbox>
                                    <el-checkbox label="4">腹痛</el-checkbox>
                                    <el-checkbox label="5">腰酸</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="私处" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.privateTh" size="mini">
                                    <el-checkbox label="1">瘙痒</el-checkbox>
                                    <el-checkbox label="2">异味</el-checkbox>
                                    <el-checkbox label="3">非经期出血</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="白带" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.whitePip" size="mini">
                                    <el-checkbox label="1">粘稠</el-checkbox>
                                    <el-checkbox label="2">拉丝</el-checkbox>
                                    <el-checkbox label="3">量多</el-checkbox>
                                    <el-checkbox label="4">渣状</el-checkbox>
                                    <el-checkbox label="5">块状</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="肠胃" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.stomach" size="mini">
                                    <el-checkbox label="1">贪冷饮</el-checkbox>
                                    <el-checkbox label="2">嗜辛辣</el-checkbox>
                                    <el-checkbox label="3">食欲不振</el-checkbox>
                                    <el-checkbox label="4">恶心</el-checkbox>
                                    <el-checkbox label="5">呕吐</el-checkbox>
                                    <el-checkbox label="6">腹泻</el-checkbox>
                                    <el-checkbox label="7">便秘</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="心理" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.tought" size="mini">
                                    <el-checkbox label="1">失眠</el-checkbox>
                                    <el-checkbox label="2">多梦</el-checkbox>
                                    <el-checkbox label="3">烦躁</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-collapse-item>
                    </el-collapse>
                </el-form-item>
                <el-form-item label="备注">
                    <el-collapse>
                        <el-collapse-item>
                            <el-input type="textarea" v-model="todayDetail.note" placeholder="记录点其它的"></el-input>
                        </el-collapse-item>
                    </el-collapse>
                </el-form-item>
                <el-button type="primary" round @click="" style="margin: 20px auto">保存当天信息</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
	import $ from 'jquery';
	import Calendar from '../vue-calendar/index';
	import timeUtil from '../vue-calendar/calendar';
	import config from '../../util/config';
	import utils from '../../util/utils';

	export default {
		data() {
			return {
				loading: false,
				todayDetailVisible: false,
				currMouthRecordList: [],
				todayDetail: {
					id: '',
					dayTime: '',
					dayType: '',
					hasLove: false,
					isPeriodStart: false,
					isPeriodEnd: false,
					periodHurt: '',
					flowQuality: '',
					bloodColor: '',
					periodShape: [],
					head: [],
					body: [],
					privateTh: [],
					whitePip: [],
					stomach: [],
					tought: [],
					note: ""
				}
			}
		},
		components: {
			Calendar
		},
		mounted: function () {
			//钩子函数在元素初始化时触发，保存历史对象和获取该月数据
			this.getMouthRecord();
		},
		methods: {
			//获取月历的数据库记录
			getMouthRecord: function () {
				let self = this;
				self.loading = false;
				let params = {
					start: self.$refs.Calendar.chooseMonth[0].date,
					end: self.$refs.Calendar.chooseMonth[self.$refs.Calendar.chooseMonth.length - 1].date,
					"dateTop": self.$refs.Calendar.dateTop
				};
				$.ajax({
					type: "get",
					url: config.baseUrl + "/api/record/getMouthRecord",
					data: params
				}).done(function (result) {
					self.loading = false;
					if (result.code === 200) {
						self.currMouthRecordList = result.data;
						self.storeMouthRecordInHistoryList();
					} else {
						self.$message({
							message: "加载数据失败",
							type: "error"
						});
					}
				}).fail(function () {
					self.loading = false;
					self.$message({
						message: "加载数据失败",
						type: "error"
					});
				});
			},
			//选中那天的触发事件
			clickDay(data) {
				this.$message('选中了' + data);
				const today = new Date();
				if (timeUtil.compareDate(data, today)) {
					this.$message('无法编辑未来');
					this.todayDetailVisible = false;
				} else {
					this.todayDetailVisible = true;
					this.getClickDayInfo(data);
				}
			},
			//月份改变的触发事件
			changeMouth(data) {
				this.$message('切换到的月份为' + data);
				const today = new Date();
				if (timeUtil.compareDate(data, today)) {
					this.todayDetailVisible = false;
					this.forcastFunture('afterMouth');
				} else {
					this.todayDetailVisible = true;
					this.getMouthRecord(data);
				}
			},
			//获取选中那天的信息从历史月历对象中
			getClickDayInfo: function (data) {
				//从对象中获取点击那天的记录
				let mouthShowList = this.$refs.Calendar.chooseMonth;
				for (let i = 0; i < mouthShowList.length; i++) {
					if (mouthShowList[i].date === data) {
						this.todayDetail = mouthShowList[i].todayDetail;
						break;
					}
				}
			},
			//转化数据类型（Java - Vue）
			formateJavaDayDataToVue: function (data) {
				let todayDetail = {};
				todayDetail.id = data.id;
				todayDetail.dayType = data.dayType;
				todayDetail.dayTime = timeUtil.dateFormat(data.dayTime);
				todayDetail.hasLove = data.hasLove === 1;
				todayDetail.isPeriodStart = data.isPeriodStart === 1;
				todayDetail.isPeriodEnd = data.isPeriodEnd === 1;
				todayDetail.periodHurt = data.periodHurt === null ? '' : data.periodHurt;
				todayDetail.flowQuality = data.flowQuality === null ? '' : data.flowQuality;
				todayDetail.bloodColor = data.bloodColor === null ? '' : data.bloodColor;
				todayDetail.periodShape = data.periodShape === null ? [] : JSON.parse(data.periodShape);
				todayDetail.head = data.head === null ? [] : JSON.parse(data.head);
				todayDetail.body = data.body === null ? [] : JSON.parse(data.body);
				todayDetail.privateTh = data.privateTh === null ? [] : JSON.parse(data.privateTh);
				todayDetail.whitePip = data.whitePip === null ? [] : JSON.parse(data.whitePip);
				todayDetail.stomach = data.stomach === null ? [] : JSON.parse(data.stomach);
				todayDetail.tought = data.tought === null ? [] : JSON.parse(data.tought);
				todayDetail.note = data.note === null ? '' : data.note;
				return todayDetail;
			},
			//转化数据类型（Vue - Java）
			formateVueDayDataToJava: function (data) {
				let returnData = utils.clone(data);
				returnData.periodShape = JSON.stringify(returnData.periodShape);
				returnData.head = JSON.stringify(returnData.head);
				returnData.body = JSON.stringify(returnData.body);
				returnData.privateTh = JSON.stringify(returnData.privateTh);
				returnData.whitePip = JSON.stringify(returnData.whitePip);
				returnData.stomach = JSON.stringify(returnData.stomach);
				returnData.tought = JSON.stringify(returnData.tought);
				returnData.hasLove = returnData.hasLove === true ? 1 : 0;
				returnData.isPeriodStart = returnData.isPeriodStart === true ? 1 : 0;
				returnData.isPeriodEnd = returnData.isPeriodEnd === true ? 1 : 0;
				return returnData;
			},
			//预测下月
			forcastFunture: function (mouthType) {

			},
			//合并数据库中的月历信息到历史月历对象中,显示月历的日期事件颜色
			storeMouthRecordInHistoryList: function () {
				const dateTop = this.$refs.Calendar.dateTop;
				const resultData = this.currMouthRecordList;
				let chooseMouthList = this.$refs.Calendar.chooseMonth;

				if (resultData.length != 0) {
					for (let i = 0; i < resultData.length; i++) {
						let dataToVue = this.formateJavaDayDataToVue(resultData[i]);
						for (let j = 0; j < chooseMouthList.length; j++) {
							if (chooseMouthList[j].date === dataToVue.dayTime) {
								if (dataToVue.dayType === 1) {
									chooseMouthList[j].markClassName = 'periodTime';
								}
								if (dataToVue.dayType === 2) {
									chooseMouthList[j].markClassName = 'forcastPeriodTime';
								}
								if (dataToVue.dayType === 3) {
									chooseMouthList[j].markClassName = 'ovulatoryTime';
								}
								chooseMouthList[j].todayDetail = dataToVue;
							}
						}
					}
					this.$refs.Calendar.chooseMonth = chooseMouthList;
					this.$refs.Calendar.showMonthsHistory[dateTop] = chooseMouthList;
				} else {
					this.$message('没有查询到本月的记录');
				}
			},
			//经期开始的触发事件
			startPeriodChangeFunc: function () {
				let isClickDayStartPeriod = this.todayDetail.isPeriodStart;
				let clickDay = this.todayDetail.dayTime;
				const dateTop = this.$refs.Calendar.dateTop;
				let today = new Date(clickDay);
				today.setDate(today.getDate() + 35);
                const endDay  = timeUtil.dateFormat(today);

				if (isClickDayStartPeriod) {
					console.log(clickDay + " peroid start");
					//先获取开始这天的后面（经期范围内）有没有经期结束
					const nearlyPeriodEnd = this.getNearlyPeriodEnd(dateTop,clickDay,endDay,'next');
					console.log(nearlyPeriodEnd);
					if (nearlyPeriodEnd) {
						this.setPeriodAndForcast(dateTop, clickDay, nearlyPeriodEnd);
					} else {
						this.todayDetail.isPeriodStart = true;
					}
				} else {
					console.log(clickDay + " peroid start");
					const nearlyPeriodStart = this.getNearlyPeriodStart(dateTop);
				}
			},
			//经期结束的触发事件
			endPeriodChangeFunc: function () {
				let isClickDayEndPeriod = this.todayDetail.isPeriodEnd;
				let clickDay = this.todayDetail.dayTime;
				const dateTop = this.$refs.Calendar.dateTop;

				if (isClickDayEndPeriod) {
					console.log(clickDay + " peroid end");
					const nearlyPeriodStart = this.getNearlyPeriodStart(dateTop,clickDay,'pre');
					console.log(nearlyPeriodStart);
					if (nearlyPeriodStart) {
						this.setPeriodAndForcast(dateTop, nearlyPeriodStart, clickDay);
					} else {
						this.todayDetail.isPeriodEnd = true;
					}
				} else {
					console.log(clickDay + " peroid start");
					const nearlyPeriodStart = this.getNearlyPeriodStart(dateTop);

				}
			},
			getNearlyPeriodStart: function (dateTop,start,towards='pre') {
				let flag = false;
				const currMouthList = this.$refs.Calendar.showMonthsHistory[dateTop];
				let towardsMonth = null;

				for (let i = 0; i < currMouthList.length; i++) {
					let canCompare = null;
					if(towards === 'pre'){
                        canCompare = timeUtil.compareDate(start,currMouthList[i].date);
                    }else if(towards === 'next'){
						canCompare = timeUtil.compareDate(currMouthList[i].date,start);
                    }

                    console.log("time:"+currMouthList[i].date + " & canCompare="+canCompare);

					if(canCompare){
						if(currMouthList[i].todayDetail.isPeriodEnd){
							console.log("find period end:"+currMouthList[i].date+" &flag="+flag);
							return flag;
						}
						if (currMouthList[i].otherMonth === 'nowMonth' && currMouthList[i].todayDetail.isPeriodStart) {
							flag = currMouthList[i].date;
							console.log("find period start:" +flag);
							return flag;
						}
					}
				}


				if(towards === 'pre'){
					towardsMonth = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "preMonth");
                }else if (towards === 'next'){
					towardsMonth = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "nextMonth");
                }
				if (!this.$refs.Calendar.showMonthsHistory[towardsMonth]) {
					console.log("find nothing &flag="+flag+" &towardsMonth="+towardsMonth);
					return flag;
				} else {
					this.getNearlyPeriodStart(towardsMonth,towardsMonth+'-1');
				}
			},
			getNearlyPeriodEnd: function (dateTop,start,end,towards='pre') {
				let flag = false;
				const currMouthList = this.$refs.Calendar.showMonthsHistory[dateTop];

				if (towards === 'pre') {
                    for (let i = currMouthList.length; i > 0; i--) {
						let canCompare = null;
						canCompare = timeUtil.compareDate(start, currMouthList[i].date);
						if (canCompare) {
							if (currMouthList[i].otherMonth === 'nowMonth' && currMouthList[i].todayDetail.isPeriodEnd) {
								flag = currMouthList[i].date;
								console.log("find period end :" + flag);
								return flag;
							}
						}
	                    console.log("time:"+currMouthList[i].date + " & canCompare:"+canCompare);
					}
					dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "preMonth");
				} else if (towards === 'next') {
					for (let j = 0; j < currMouthList.length; j++) {
						let canCompare = timeUtil.compareDate(currMouthList[j].date, start) && timeUtil.isDateBeyondToday(currMouthList[j].date) &&timeUtil.compareDate(end,currMouthList[j].date);
						if (canCompare) {
							if (currMouthList[j].otherMonth === 'nowMonth' && currMouthList[j].todayDetail.isPeriodEnd) {
								flag = currMouthList[j].date;
								console.log("find period end :" + flag);
								return flag;
							}
						}
						console.log("time:"+currMouthList[j].date + " & canCompare:"+canCompare);
					}
					dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "nextMonth");
                }

				if (timeUtil.isDateBeyondToday(dateTop) || !this.$refs.Calendar.showMonthsHistory[dateTop]) {
					console.log("find nothing &flag="+flag);
					return flag;
				} else {
					this.getNearlyPeriodEnd(dateTop,dateTop+'-1',end,towards);
				}
			},
			setPeriodAndForcast: function (dateTop, startDay, endDay) {
				this.setPeriodData(dateTop, startDay, endDay);
				this.setForcastData(dateTop, startDay, endDay);
			},
			setPeriodData: function (dateTop, startDay, endDay) {
				let monthList = this.$refs.Calendar.showMonthsHistory[dateTop];
				let flag = false;

				for (let i = 0; i < monthList.length; i++) {
					if (monthList[i].date === startDay) {
						monthList[i].todayDetail.isPeriodStart = true;
						monthList[i].markClassName = "periodTime";
						monthList[i].isModifyFlag = true;
					}
					if (monthList[i].date === endDay && monthList[i].otherMonth === 'nowMonth') {
						flag = true;
						monthList[i].todayDetail.isPeriodEnd = true;
						monthList[i].markClassName = "periodTime";
						monthList[i].isModifyFlag = true;
						break;
					}
					if (timeUtil.compareDate(monthList[i].date, startDay)) {
						monthList[i].todayDetail.isPeriodStart = false;
						monthList[i].markClassName = "periodTime";
						monthList[i].isModifyFlag = true;
					}
				}

				if (!flag) {
					let after = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "nextMonth");
					this.setPeriodData(after, startDay, endDay);
				}
			},
			setForcastData: function (dateTop, startDay, endDay) {

			}
		}
	}
</script>
<style>
    .main {
        width: 100%;
        height: 100%;
        background: #f05c7000;
    }

    .calendarContainer {
        width: 100%;
        max-width: 800px;
        height: 50%;
        min-height: 380px;
        margin: 0 auto;
    }

    .calendarContent {
        width: 100%;
        height: 100%;
        background: #dedede;
        float: left;
        margin: 0 auto;
    }

    .colorForWhat {
        width: 100%;
        height: 20px;
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        background: #ffefe3;
    }

    .colorForWhat li {
        display: flex;
        width: 30%;
        height: 80%;
        list-style: none;
        padding-left: 20px;
    }

    .colorForWhat li > span {
        height: 10px;
        width: 10px;
        background: #800080;
        border-radius: 80%;
        margin-top: 5px;
        margin-right: 3px;
        cursor: pointer;
    }

    .todayDetailInfo {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
    }

    .el-form {
        margin-top: 10px;
    }

    .el-form-item {
        margin-bottom: 0px;
        border-bottom: solid 1px #E4E7ED;
    }

    .el-collapse {
        text-align: left;
        border-top: 0px;
        border-bottom: 0px;
    }

    .el-collapse-item__content {
        padding: 0 20px;
        padding-bottom: 25px;
    }

    .el-collapse-item__wrap {
        margin-left: -99px;
    }

    .el-checkbox {
        margin-left: 10px;
    }

    .el-checkbox + .el-checkbox {
        margin-left: 10px;
    }

    .el-checkbox__label {
        font-size: 12px;
        padding-left: 0px;
    }

    .el-radio {
        margin-left: 10px !important;
    }

    .el-radio__label {
        font-size: 12px;
        padding-left: 0px;
    }

    .el-textarea {
        width: 84%;
        padding-left: 40px;
    }

    .el-textarea__inner {
        height: 150px;
    }

    /****不同类型的日期颜色不一样*****
    ****
    ****
    ******************************/
    .periodTime {
        background-color: rgba(255, 60, 81, 0.91);
        border-radius: 90px;
    }

    .forcastPeriodTime {
        background-color: rgba(255, 60, 81, 0.53);
        border-radius: 90px;
    }

    .ovulatoryTime {
        background-color: #ff83d3;
        border-radius: 90px;
    }
</style>
