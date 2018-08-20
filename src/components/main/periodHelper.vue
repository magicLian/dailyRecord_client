<template>
    <div class="main" v-loading="loading">
        <div class="calendarContainer">
            <div class="calendarContent">
                <Calendar ref="Calendar"
                          :sundayStart="true"
                          :markDateMore="showDay"
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
                    <el-switch v-model="todayDetail.isPeriodStart"></el-switch>
                </el-form-item>
                <el-form-item label="经期结束">
                    <el-switch v-model="todayDetail.isPeriodEnd"></el-switch>
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
				showDay: [],
				showDaysHistory: {},
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
			this.addShowMouthHistory();
			this.getMouthRecord();
		},
		methods: {
			getMouthRecord: function (d) {
				let self = this;
				self.loading = false;
				let params = {
					start: self.$refs.Calendar.list[0].date,
					end: self.$refs.Calendar.list[self.$refs.Calendar.list.length - 1].date,
					"dateTop": self.$refs.Calendar.dateTop
				};
				$.ajax({
					type: "get",
					url: config.baseUrl + "/api/record/getMouthRecord",
					data: params
				}).done(function (result) {
					self.loading = false;
					if (result.code === 200) {
						self.showDay = [];
						self.currMouthRecordList = result.data;
						self.displayChooseMouthClassName(result.data);
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
			clickDay(data) {
				this.$message('选中了' + data);
				this.todayDetail.dayTime = data;
				const today = new Date();
				if (timeUtil.compareDate(data, today)) {
					this.$message('无法编辑未来');
					this.todayDetailVisible = false;
				} else {
					this.todayDetailVisible = true;
					this.getClickDayInfo(data);
				}
			},
			changeMouth(data) {
				this.$message('切换到的月份为' + data);
				this.addShowMouthHistory();
				const today = new Date();
				if (timeUtil.compareDate(data, today)) {
					this.todayDetailVisible = false;
					this.forcastFunture('afterMouth');
				} else {
					this.todayDetailVisible = true;
					this.getMouthRecord(data);
				}
			},
			getClickDayInfo: function (data) {
				//从大历史对象中获取点击那天的记录
				let dateTop = this.$refs.Calendar.dateTop;
				let mouthShowList = this.showDaysHistory[dateTop];
				for (let i = 0; i < mouthShowList.length; i++) {
					if (mouthShowList[i].date === data) {
						this.todayDetail = mouthShowList[i].todayDetail;
						break;
					}
				}
			},
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
			addShowMouthHistory: function () {
				let dateTop = this.$refs.Calendar.dateTop;
				if (!this.showDaysHistory.dateTop) {
					this.showDaysHistory[dateTop] = [];
					let dateTopList = this.$refs.Calendar.list;
					this.showDaysHistory[dateTop].push.apply(this.showDaysHistory[dateTop], this.$refs.Calendar.list);
				}
			},
			displayChooseMouthClassName: function (mouthType) {
                this.doShowClassName();
                this.storeMouthRecordInHistoryList();
			},
			forcastFunture: function (mouthType) {

			},
			doShowClassName: function () {
				//1经期 2预测经期 3排卵期 4自定义
				const resultData = this.currMouthRecordList;
				for (let i = 0; i < resultData.length; i++) {
					if (resultData[i].dayType === 1) {
						this.showDay.push({
							"date": timeUtil.dateFormat(resultData[i].dayTime),
							"className": 'periodTime'
						});
					}
					if (resultData[i].dayType === 2) {
						this.showDay.push({
							"date": timeUtil.dateFormat(resultData[i].dayTime),
							"className": 'forcastPeriodTime'
						});
					}
					if (resultData[i].dayType === 3) {
						this.showDay.push({
							"date": timeUtil.dateFormat(resultData[i].dayTime),
							"className": 'ovulatoryTime'
						});
					}
				}
			},
			storeMouthRecordInHistoryList: function () {
				let dateTop = this.$refs.Calendar.dateTop;
				let mouthRecordList = this.currMouthRecordList;
				let mouthShowList = this.showDaysHistory[dateTop];

				if (mouthRecordList.length != 0) {
					for (let i = 0; i < mouthRecordList.length; i++) {
						let dataToVue = this.formateJavaDayDataToVue(mouthRecordList[i]);
						for (let j = 0; j < mouthShowList.length; j++) {
							if (mouthShowList[j].date === dataToVue.dayTime) {
								mouthShowList[j].todayDetail = dataToVue;
								break;
							}
						}
					}
				} else {
					this.$message('没有查询到本月的记录');
				}
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
