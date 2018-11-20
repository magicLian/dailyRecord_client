<template>
    <div class="main" v-loading="loading">
        <div class="btnContainer">
            <el-row style="margin-left: 10px;float: left;">
                <el-button size="medium" round @click="returnToMain">返回</el-button>
            </el-row>
        </div>
        <div class="calendarContainer">
            <div class="calendarContent">
                <Calendar
                        ref="Calendar"
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
                <el-form-item
                        v-show="(todayDetail.isPeriodStart || todayDetail.isPeriodEnd) && !todayDetail.isEffective"
                        style="color: #3a8ee6">标记无效
                </el-form-item>
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
            </el-form>
        </div>
    </div>
</template>
<script>
	import $ from 'jquery';
	import moment from 'moment';
	import Calendar from '../vue-calendar/index';
	import timeUtil from '../vue-calendar/calendar';
	import config from '../../util/config';
	import utils from '../../util/utils';
	import debug from '../../util/debug';

	export default {
		data() {
			return {
				loading: false,
				todayDetailVisible: false,
				currMouthRecordList: [],
				//新增的信息记录，用于回填id
				currRecordInsertList: [],
				todayDetail: {
					id: '',
					userId: '',
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
					note: "",
					isEffective: false
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
			/**
			 * 获取月历的数据库记录
			 **/
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
						self.storeMouthRecordInHistoryList(false);
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

			/**
			 * 选中那天的触发事件
			 **/
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

			/**
			 *
			 * 月份改变的触发事件
			 **/
			changeMouth(data) {
				this.$message('切换到的月份为' + data);
				const today = new Date();
				if (timeUtil.compareDate(data, today)) {
					this.todayDetailVisible = false;
					this.forcastFunture('afterMouth');
				} else {
					this.todayDetailVisible = false;
					this.getMouthRecord(data);
				}
			},

			/**
			 * 获取选中那天的信息从历史月历对象中
			 **/
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

			/**
			 * 转化数据类型（Java - Vue）
			 **/
			formateJavaDayDataToVue: function (data) {
				let todayDetail = {};
				todayDetail.id = data.id;
				todayDetail.userId = data.userId;
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
				todayDetail.isEffective = data.isEffective === 1;
				return todayDetail;
			},

			/**
			 * 转化数据类型（Vue - Java）
			 **/
			formateVueDayDataToJava: function (data) {
				let returnData = utils.clone(data);
				returnData.id = returnData.id === "" ? null : returnData.id;
				returnData.userId = returnData.userId === "" ? null : returnData.userId;
				returnData.dayTime = new Date(returnData.dayTime);
				returnData.periodShape = returnData.periodShape.length === 0 ? null : JSON.stringify(returnData.periodShape);
				returnData.head = returnData.head.length === 0 ? null : JSON.stringify(returnData.head);
				returnData.body = returnData.body.length === 0 ? null : JSON.stringify(returnData.body);
				returnData.privateTh = returnData.privateTh.length === 0 ? null : JSON.stringify(returnData.privateTh);
				returnData.whitePip = returnData.whitePip.length === 0 ? null : JSON.stringify(returnData.whitePip);
				returnData.stomach = returnData.stomach.length === 0 ? null : JSON.stringify(returnData.stomach);
				returnData.tought = returnData.tought.length === 0 ? null : JSON.stringify(returnData.tought);
				returnData.hasLove = returnData.hasLove === true ? 1 : 0;
				returnData.isPeriodStart = returnData.isPeriodStart === true ? 1 : 0;
				returnData.isPeriodEnd = returnData.isPeriodEnd === true ? 1 : 0;
				returnData.isEffective = returnData.isEffective === true ? 1 : 0;
				returnData.note = returnData.note === "" ? null : returnData.note;
				returnData.periodHurt = returnData.periodHurt === "" ? null : returnData.periodHurt;
				returnData.flowQuality = returnData.flowQuality === "" ? null : returnData.flowQuality;
				returnData.bloodColor = returnData.bloodColor === "" ? null : returnData.bloodColor;
				return returnData;
			},

			/**
			 * 预测下月
			 **/
			forcastFunture: function (mouthType) {

			},

			/**
			 * 合并数据库中的月历信息到历史月历对象中,显示月历的日期事件颜色
			 **/
			storeMouthRecordInHistoryList: function () {
				const dateTop = this.$refs.Calendar.dateTop;
				const resultData = this.currMouthRecordList;
				let chooseMouthList = this.$refs.Calendar.chooseMonth;

				if (resultData.length !== 0) {
					for (let i = 0; i < resultData.length; i++) {
						let dataToVue = this.formateJavaDayDataToVue(resultData[i]);
						for (let j = 0; j < chooseMouthList.length; j++) {
							if (!chooseMouthList[j].isModifyFlag && chooseMouthList[j].date === dataToVue.dayTime) {
								//如果没有修改过，才进行回填
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

			/**
			 *
			 * 回填插入的record id
			 **/
			storeMouthRecordIdInHistoryList: function () {
				let self = this;
				const dateTop = self.$refs.Calendar.dateTop;
				const resultData = self.currRecordInsertList;

				if (resultData.length !== 0) {
					let monthDuringArr = self.getRecordMonthDuring(resultData);
					let currentMonth = monthDuringArr[0];
					let chooseMonthList = self.$refs.Calendar.showMonthsHistory[currentMonth];

					for (let i = 0; i < resultData.length; i++) {

						if (monthDuringArr.length > 1 && timeUtil.compareDate(timeUtil.dateFormatWithoutDay(resultData[i].dayTime), currentMonth)) {
							self.$refs.Calendar.showMonthsHistory[currentMonth] = chooseMonthList;
							currentMonth = timeUtil.dateFormatWithoutDay(resultData[i].dayTime);
							chooseMonthList = self.$refs.Calendar.showMonthsHistory[currentMonth];
						}

						//循环该月
						for (let j = 0; j < chooseMonthList.length; j++) {
							//回填id，只回填到正式日期上
							if (chooseMonthList[j].otherMonth === 'nowMonth'
								&& timeUtil.dateFormat(chooseMonthList[j].date) === timeUtil.dateFormat(resultData[i].dayTime)) {
								chooseMonthList[j].todayDetail.id = resultData[i].id;
								chooseMonthList[j].isModifyFlag = false;
								break;
							}
						}
					}
					self.$refs.Calendar.showMonthsHistory[currentMonth] = chooseMonthList;
					self.$refs.Calendar.chooseMonth = self.$refs.Calendar.showMonthsHistory[dateTop];
				}
			},
			/**
			 * 经期开始的触发事件
			 * 有4种逻辑 点亮2种 ，点灭2种
			 */
			startPeriodChangeFunc: function () {
				let isClickDayStartPeriod = this.todayDetail.isPeriodStart;
				let clickDay = this.todayDetail.dayTime;
				const dateTop = this.$refs.Calendar.dateTop;

				//输出今天的信息，以及向后最大周期数的日期
				debug.print(clickDay + " period start :" + isClickDayStartPeriod);

				/**
				 * 开始点亮.
				 * 如果今天是有效期，则需要找到该有效期内的开始（向前有效期内遍历），将开始到该天前一天重置，并将今天点亮
				 * 如果今天无效，则需要（向后)找非有效期的结束。如果有，连接点亮；没有则今天置灰
				 */
				if (isClickDayStartPeriod) {
					if (this.todayDetail.isEffective) {
						let beforePeriodStart = this.getNearlyPeriodStartInEffective(dateTop, clickDay, 'pre');
						debug.print("前开始：" + beforePeriodStart);

						const endDay = timeUtil.getDateAddOrMins(clickDay, -1);
						this.unsetDuringDate(timeUtil.dateFormatWithoutDay(clickDay), beforePeriodStart, endDay, false, false);
						this.todayDetail.isPeriodStart = true;
						this.$message({
							type: 'success',
							message: '设置经期开始成功!'
						});
					} else {
						const endDay = timeUtil.getDateAddOrMins(clickDay, 35);
						debug.print("end:" + endDay);
						const nearlyPeriodEnd = this.getNearlyPeriodEndWithoutEffective(dateTop, clickDay, endDay, 'next');
						debug.print("find day=" + nearlyPeriodEnd);
						if (nearlyPeriodEnd) {
							this.setPeriodAndForcast(dateTop, clickDay, nearlyPeriodEnd);
						} else {
							this.todayDetail.isPeriodStart = true;

							let monthList = this.$refs.Calendar.showMonthsHistory[dateTop];
							for (let i = 0; i < monthList.length; i++) {
								if (monthList[i].date === clickDay) {
									monthList[i].isModifyFlag = true;
									break;
								}
							}

							this.todayDetail.isEffective = false;
						}
					}
				} else {
					/**
					 *开始点灭.
					 * 如果今天是有效期，重置开始的下一天到结束的上一天，保留结束日
					 * 如果今天无效，则无需做什么操作直接点灭即可
					 */
					if (this.todayDetail.isEffective) {
						const afterNearlyPeriodEnd = this.getNearlyPeriodEndInEffective(timeUtil.dateFormatWithoutDay(clickDay), clickDay, 'next');
						debug.print("有效经期结束:" + afterNearlyPeriodEnd);

						const preNearlyPeriodStart = this.getNearlyPeriodStartWithoutEffective(dateTop, timeUtil.getDateAddOrMins(clickDay, -35), clickDay, 'pre');
						debug.print("前面无效的经期开始：" + preNearlyPeriodStart);

						if (preNearlyPeriodStart) {
							this.setPeriodAndForcast(timeUtil.dateFormatWithoutDay(preNearlyPeriodStart), preNearlyPeriodStart, afterNearlyPeriodEnd);
						} else {
							this.unsetDuringDate(dateTop, clickDay, afterNearlyPeriodEnd, false, true);
						}
					} else {
						//没找到经期结束,则先把今天标记为经期开始,已修改,无效
						this.todayDetail.isPeriodStart = false;

						let monthList = this.$refs.Calendar.showMonthsHistory[dateTop];
						for (let i = 0; i < monthList.length; i++) {
							if (monthList[i].date === clickDay) {
								monthList[i].isModifyFlag = true;
								break;
							}
						}

						this.todayDetail.isEffective = false;
					}
				}
			},
			/**
			 * 经期结束的触发事件
			 * 有4种逻辑 点亮2种 ，点灭2种
			 */
			endPeriodChangeFunc: function () {
				let isClickDayEndPeriod = this.todayDetail.isPeriodEnd;
				let clickDay = this.todayDetail.dayTime;
				const dateTop = this.$refs.Calendar.dateTop;

				debug.print(clickDay + " peroid end:" + isClickDayEndPeriod);

				if (isClickDayEndPeriod) {
					/** 结束点亮
					 *  如果当天是有效时间，则查找它后面的结束时间，并给之后的时间重置，给当天设置结束
					 *  如果不是有效时间,则需要查找它之前的开始时间，有则连接，无则点灰
					 */
					if (this.todayDetail.isEffective) {
						const nearlyPeriodEnd = this.getNearlyPeriodEndInEffective(dateTop, clickDay, 'next');
						debug.print("后结束：" + nearlyPeriodEnd);

						const tomorrow = timeUtil.getDateAddOrMins(clickDay, 1);
						this.unsetDuringDate(timeUtil.dateFormatWithoutDay(tomorrow), tomorrow, nearlyPeriodEnd, false, false);
						this.todayDetail.isPeriodEnd = true;
						this.$message({
							type: 'success',
							message: '设置经期结束成功!'
						});
					} else {
						const preDay = timeUtil.getDateAddOrMins(clickDay, -35);
						debug.print("clickday:" + clickDay);
						debug.print("pre:" + preDay);
						const nearlyPeriodStart = this.getNearlyPeriodStartWithoutEffective(dateTop, preDay, clickDay, 'pre');
						if (nearlyPeriodStart) {
							this.setPeriodAndForcast(timeUtil.dateFormatWithoutDay(nearlyPeriodStart), nearlyPeriodStart, clickDay);
						} else {
							this.todayDetail.isPeriodEnd = true;
						}
					}
				} else {
					/**
					 * 结束点灰
					 *  如果是有效时间，则寻找有效开始,重置开始的下一天到结束的上一天，保留开始日
					 *  如果不是有效时间，则撤销结束
					 */
					if (this.todayDetail.isEffective) {
						const nearlyPeriodStart = this.getNearlyPeriodStartInEffective(dateTop, clickDay, 'pre');
						debug.print("有效经期开始:" + nearlyPeriodStart);

						//找到经期开始，并计算不能超过经期周期
						const dayDistance = 35 - timeUtil.countDateDistance(nearlyPeriodStart, clickDay);
						const afterPeriodEnd = this.getNearlyPeriodEndWithoutEffective(dateTop, clickDay, timeUtil.getDateAddOrMins(clickDay, dayDistance), 'next');
						debug.print("后无效的结束：" + afterPeriodEnd);
						if (afterPeriodEnd) {
							this.setPeriodAndForcast(timeUtil.dateFormatWithoutDay(nearlyPeriodStart), nearlyPeriodStart, afterPeriodEnd);
						} else {
							this.unsetDuringDate(timeUtil.dateFormatWithoutDay(nearlyPeriodStart), nearlyPeriodStart, clickDay, true, false);
						}
					} else {
						this.todayDetail.isPeriodEnd = false;
					}
				}
			},

			/**
			 *
			 * @param dateTop
			 * @param start
			 * @param end
			 * @param towards
			 * @returns {*}
			 * 获取最近的经期开始，忽略是否有效
			 */
			getNearlyPeriodStartWithoutEffective: function (dateTop, start, end, towards = 'pre') {
				let flag = null;
				const currMouthList = this.$refs.Calendar.showMonthsHistory[dateTop];

				if (towards === 'pre') {
					for (let i = currMouthList.length - 1; i > 0; i--) {
						if (timeUtil.compareDate(currMouthList[i].date, end) || currMouthList[i].date === end) {
							debug.print("time : " + currMouthList[i].date + ",等于或者大于结束日期, 继续");
						} else if (timeUtil.compareDate(start, currMouthList[i].date)) {
							debug.print("time : " + currMouthList[i].date + "已经遍历小于开始日期,开始日期:" + flag);
							return flag;
						} else {
							if (currMouthList[i].todayDetail.isEffective) {
								debug.print("time : " + currMouthList[i].date + ",遇到有效的日期标记停止遍历,开始日期:" + flag);
								return flag;
							} else {
								debug.print("time:" + currMouthList[i].date + ",进入比较");
								if (currMouthList[i].otherMonth === 'nowMonth' && currMouthList[i].todayDetail.isPeriodStart) {
									flag = currMouthList[i].date;
									debug.print("find period start :" + flag);
									return flag;
								}
							}
						}
					}
					dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "preMonth");
				} else if (towards === 'next') {
					for (let j = 0; j < currMouthList.length; j++) {
						if (timeUtil.compareDate(start, currMouthList[j].date)) {
							debug.print("time : " + currMouthList[j].date + ",比起始日期前, 继续");
						} else if (timeUtil.isDateBeyondToday(currMouthList[j].date)) {
							debug.print("time : " + currMouthList[j].date + "已经超过今天,结束日期:" + flag);
							return flag;
						} else if (timeUtil.compareDate(currMouthList[j].date, end)) {
							debug.print("time : " + currMouthList[j].date + "已经超过遍历结束如期,结束日期:" + flag);
							return flag;
						} else {
							if (currMouthList[j].todayDetail.isEffective) {
								debug.print("time : " + currMouthList[j].date + ",遇到有效的日期标记停止遍历 , 结束日期:" + flag);
								return flag;
							} else {
								debug.print("time:" + currMouthList[j].date + ",进入比较");
								if (currMouthList[j].otherMonth === 'nowMonth' && currMouthList[j].todayDetail.isPeriodStart) {
									flag = currMouthList[j].date;
									debug.print("find period start :" + flag);
									return flag;
								}
							}
						}
					}
					dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "nextMonth");
				}

				if (timeUtil.isDateBeyondToday(dateTop + '-1') || !this.$refs.Calendar.showMonthsHistory[dateTop]) {
					debug.print("find nothing &flag=" + flag);
					return flag;
				} else {
					return this.getNearlyPeriodStartWithoutEffective(dateTop, dateTop + '-1', end, towards);
				}
			},

			/**
			 *
			 * @param dateTop
			 * @param start
			 * @param towards
			 * @returns {*}
			 * 获取最近的经期开始，遇到有效的经期时结束
			 */
			getNearlyPeriodStartInEffective: function (dateTop, start, towards = 'pre') {
				let flag = null;
				const currMouthList = this.$refs.Calendar.showMonthsHistory[dateTop];

				if (towards === 'pre') {
					debug.print("开始日期:" + start + ",向前遍历");
					for (let i = currMouthList.length - 1; i >= 0; i--) {
						if (timeUtil.compareDate(currMouthList[i].date, start)) {
							debug.print("日期:" + currMouthList[i].date + ",超过开始日期,跳过");
						} else {
							if (currMouthList[i].otherMonth === 'nowMonth') {
								if (currMouthList[i].todayDetail.isEffective) {
									debug.print("日期:" + currMouthList[i].date + ",进入比较");
									if (currMouthList[i].todayDetail.isPeriodStart) {
										flag = currMouthList[i].date;
										debug.print("找到经期开始日期:" + flag);
										return flag;
									} else {
										debug.print("不是经期开始");
									}
								} else {
									debug.print("日期:" + currMouthList[i].date + ",不是有效日期,结束遍历");
									return flag;
								}
							} else {
								debug.print("日期:" + currMouthList[i].date + ",不是本月日期,向前切换月份");
								dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "preMonth");
								break;
							}
						}
					}
				} else if (towards === 'next') {
					for (let j = 0; j < currMouthList.length; j++) {
						if (timeUtil.compareDate(start, currMouthList[j].date)) {
							debug.print("time : " + currMouthList[j].date + ",比起始日期前, 继续");
						} else if (timeUtil.isDateBeyondToday(currMouthList[j].date)) {
							debug.print("time : " + currMouthList[j].date + "已经超过今天,结束日期:" + flag);
							return flag;
						} else {
							if (currMouthList[j].otherMonth === 'nowMonth') {
								if (currMouthList[j].todayDetail.isEffective) {
									debug.print("time:" + currMouthList[j].date + ",进入比较");
									if (currMouthList[j].todayDetail.isPeriodStart) {
										flag = currMouthList[j].date;
										debug.print("find period start :" + flag);
										return flag;
									}
								} else {
									debug.print("日期:" + currMouthList[j].date + ",遇到有效的日期标记停止遍历 , 结束日期:" + flag);
									return flag;
								}
							} else {
								dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "nextMonth");
								break;
							}
						}
					}
				}

				//判断向前还是向后
				if (towards === 'pre') {
					if (!this.$refs.Calendar.showMonthsHistory[dateTop]) {
						debug.print("没有找到,日期:" + flag);
						return flag;
					} else {
						//向前需获取上月最后一天为开始
						let monthDayList = timeUtil.getMonthListNoOther(new Date(dateTop));
						return this.getNearlyPeriodStartInEffective(dateTop, monthDayList[monthDayList.length - 1].date, towards);
					}
				} else if (towards === 'after') {
					if (timeUtil.isDateBeyondToday(dateTop + '-1') || !this.$refs.Calendar.showMonthsHistory[dateTop]) {
						debug.print("没有找到,日期:" + flag);
						return flag;
					} else {
						//向后需指定下月1号为开始
						return this.getNearlyPeriodStartInEffective(dateTop, dateTop + '-1', towards);
					}
				}
			},

			/**
			 *
			 * @param dateTop
			 * @param start
			 * @param end
			 * @param towards
			 * @returns {*}
			 * 获取最近的经期结束，忽略有效经期
			 */
			getNearlyPeriodEndWithoutEffective: function (dateTop, start, end, towards = 'pre') {
				let flag = null;
				const currMouthList = this.$refs.Calendar.showMonthsHistory[dateTop];

				if (towards === 'pre') {
					for (let i = currMouthList.length; i > 0; i--) {
						if (timeUtil.compareDate(currMouthList[i].date, start)) {
							debug.print("time : " + currMouthList[i].date + ",比起始日期后, 继续");
						} else if (timeUtil.compareDate(currMouthList[i].date, end)) {
							debug.print("time : " + currMouthList[i].date + "已经超过遍历结束如期,结束日期:" + flag);
							return flag;
						} else {
							if (currMouthList[i].todayDetail.isEffective) {
								debug.print("time : " + currMouthList[i].date + ",遇到有效的日期标记停止遍历 , 结束日期:" + flag);
								return flag;
							} else {
								debug.print("time:" + currMouthList[i].date + ",进入比较");
								if (currMouthList[i].otherMonth === 'nowMonth' && currMouthList[i].todayDetail.isPeriodEnd) {
									flag = currMouthList[i].date;
									debug.print("find period end :" + flag);
									return flag;
								}
							}
						}
					}
					dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "preMonth");
				} else if (towards === 'next') {
					for (let j = 0; j < currMouthList.length; j++) {
						if (timeUtil.compareDate(start, currMouthList[j].date) || currMouthList[j].date === start) {
							debug.print("time : " + currMouthList[j].date + ",小于或等于起始日期, 继续");
						} else if (timeUtil.isDateBeyondToday(currMouthList[j].date)) {
							debug.print("time : " + currMouthList[j].date + "已经超过今天,结束日期:" + flag);
							return flag;
						} else if (timeUtil.compareDate(currMouthList[j].date, end)) {
							debug.print("time : " + currMouthList[j].date + "已经超过遍历结束如期,结束日期:" + flag);
							return flag;
						} else {
							if (currMouthList[j].todayDetail.isEffective) {
								debug.print("time : " + currMouthList[j].date + ",遇到有效的日期标记停止遍历 , 结束日期:" + flag);
								return flag;
							} else {
								debug.print("time:" + currMouthList[j].date + ",进入比较");
								if (currMouthList[j].otherMonth === 'nowMonth' && currMouthList[j].todayDetail.isPeriodEnd) {
									flag = currMouthList[j].date;
									debug.print("find period end :" + flag);
									return flag;
								}
							}
						}
					}
					dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "nextMonth");
				}

				if (timeUtil.isDateBeyondToday(dateTop + '-1') || !this.$refs.Calendar.showMonthsHistory[dateTop]) {
					debug.print("find nothing &flag=" + flag);
					return flag;
				} else {
					return this.getNearlyPeriodEndWithoutEffective(dateTop, dateTop + '-1', end, towards);
				}
			},

			/**
			 *
			 * @param dateTop
			 * @param start
			 * @param towards
			 * @returns {*}
			 * 获取最近的经期结束，遇到有效的经期时结束
			 */
			getNearlyPeriodEndInEffective: function (dateTop, start, towards = 'pre') {
				let flag = null;
				const currMouthList = this.$refs.Calendar.showMonthsHistory[dateTop];

				if (towards === 'pre') {
					for (let i = currMouthList.length; i > 0; i--) {
						if (timeUtil.compareDate(currMouthList[i].date, start)) {
							debug.print("time : " + currMouthList[i].date + ",比起始日期后, 继续");
						} else {
							if (currMouthList[i].otherMonth === 'nowMonth') {
								if (currMouthList[i].todayDetail.isEffective) {
									debug.print("time:" + currMouthList[i].date + ",进入比较");
									if (currMouthList[i].todayDetail.isPeriodEnd) {
										flag = currMouthList[i].date;
										debug.print("find period end :" + flag);
										return flag;
									}
								} else {
									debug.print("time : " + currMouthList[i].date + ",遇到无效的日期标记停止遍历 , 结束日期:" + flag);
									return flag;
								}
							} else {
								dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "preMonth");
								break;
							}
						}
					}
				} else if (towards === 'next') {
					for (let j = 0; j < currMouthList.length; j++) {
						if (timeUtil.compareDate(start, currMouthList[j].date) || currMouthList[j].date === start) {
							debug.print("time : " + currMouthList[j].date + ",比起始日期前或者等于, 继续");
						} else if (timeUtil.isDateBeyondToday(currMouthList[j].date)) {
							debug.print("time : " + currMouthList[j].date + "已经超过今天,结束日期:" + flag);
							return flag;
						} else {
							if (currMouthList[i].otherMonth === 'nowMonth') {
								if (currMouthList[j].todayDetail.isEffective) {
									debug.print("time:" + currMouthList[j].date + ",进入比较");
									if (currMouthList[j].todayDetail.isPeriodEnd) {
										flag = currMouthList[j].date;
										debug.print("find period end :" + flag);
										return flag;
									}
								} else {
									debug.print("time : " + currMouthList[j].date + ",遇到无效的日期标记停止遍历 , 结束日期:" + flag);
									return flag;
								}
							} else {
								dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "nextMonth");
								break;
							}
						}
					}
				}

				if (timeUtil.isDateBeyondToday(dateTop + '-1') || !this.$refs.Calendar.showMonthsHistory[dateTop]) {
					debug.print("find nothing &flag=" + flag);
					return flag;
				} else {
					return this.getNearlyPeriodEndInEffective(dateTop, dateTop + '-1', towards);
				}
			},

			setPeriodAndForcast: function (dateTop, startDay, endDay) {
				this.setPeriodData(dateTop, startDay, endDay);
				this.setForcastData(dateTop, startDay, endDay);
			},

			/**
			 * 设置经期
			 **/
			setPeriodData: function (dateTop, startDay, endDay) {
				let monthList = this.$refs.Calendar.showMonthsHistory[dateTop];
				let flag = false;

				for (var i = 0; i < monthList.length; i++) {
					//判断循环的日期时候大于等于起始日，并且小于等于终止日
					if (moment(monthList[i].date).isSameOrAfter(startDay) && moment(monthList[i].date).isSameOrBefore(endDay)) {
						if (monthList[i].date === startDay) {
							if (monthList[i].otherMonth === 'nowMonth') {
								monthList[i].todayDetail.isPeriodStart = true;
								monthList[i].todayDetail.isPeriodEnd = false;
								monthList[i].todayDetail.isEffective = true;
								monthList[i].todayDetail.dayType = 1;
								monthList[i].markClassName = "periodTime";
								monthList[i].isModifyFlag = true;
							} else {
								monthList[i].todayDetail.isPeriodStart = false;
								monthList[i].todayDetail.isPeriodEnd = false;
								monthList[i].markClassName = "periodTime";
								monthList[i].todayDetail.dayType = 1;
								monthList[i].todayDetail.isEffective = true;
								monthList[i].isModifyFlag = true;
							}
						} else if (monthList[i].date === endDay && monthList[i].otherMonth === 'nowMonth') {
							flag = true;
							monthList[i].todayDetail.isPeriodStart = false;
							monthList[i].todayDetail.isPeriodEnd = true;
							monthList[i].todayDetail.isEffective = true;
							monthList[i].todayDetail.dayType = 1;
							monthList[i].markClassName = "periodTime";
							monthList[i].isModifyFlag = true;
							break;
						} else {
							monthList[i].todayDetail.isPeriodStart = false;
							monthList[i].todayDetail.isPeriodEnd = false;
							monthList[i].markClassName = "periodTime";
							monthList[i].todayDetail.dayType = 1;
							monthList[i].todayDetail.isEffective = true;
							monthList[i].isModifyFlag = true;
						}
					}
				}

				if (!flag) {
					let after = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "nextMonth");
					this.setPeriodData(after, startDay, endDay);
				}
			},

			setForcastData: function (dateTop, startDay, endDay) {
//                let forcastPeriodStart = timeUtil.getDateAddOrMins(startDay,35);
//                let forcasePeriodEnd = timeUtil.getDateAddOrMins(endDay,35);
//                const
//                const lastPeriodStart = this.getAfterEffectivePeriodStart()
			},

			/**
			 * 取消设置
			 **/
			unsetDuringDate: function (dateTop, startDay, endDay, isSaveStart, isSaveEnd) {
				let monthList = this.$refs.Calendar.showMonthsHistory[dateTop];
				let flag = false;

				for (let i = 0; i < monthList.length; i++) {
					if (monthList[i].date === startDay) {
						if (isSaveStart && monthList[i].otherMonth === 'nowMonth') {
							monthList[i].todayDetail.isPeriodStart = true;
						} else {
							monthList[i].todayDetail.isPeriodStart = false;
						}

						monthList[i].todayDetail.isPeriodEnd = false;
						monthList[i].todayDetail.isEffective = false;
						monthList[i].todayDetail.dayType = "";
						monthList[i].markClassName = "";
						monthList[i].isModifyFlag = true;

					} else if (monthList[i].date === endDay) {
						monthList[i].todayDetail.isPeriodStart = false;
						monthList[i].todayDetail.isEffective = false;
						monthList[i].todayDetail.dayType = "";
						monthList[i].markClassName = "";
						monthList[i].isModifyFlag = true;

						if (isSaveEnd && monthList[i].otherMonth === 'nowMonth') {
							monthList[i].todayDetail.isPeriodEnd = true;
							flag = true;
						} else {
							monthList[i].todayDetail.isPeriodEnd = false;
						}

						if (monthList[i].otherMonth === 'nowMonth') {
							break;
						}
					}
					if (timeUtil.compareDate(monthList[i].date, startDay)) {
						monthList[i].todayDetail.isPeriodStart = false;
						monthList[i].todayDetail.isPeriodEnd = false;
						monthList[i].markClassName = "";
						monthList[i].todayDetail.dayType = "";
						monthList[i].todayDetail.isEffective = false;
						monthList[i].isModifyFlag = true;
					}
				}

				if (!flag) {
					let after = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "nextMonth");
					this.unsetDuringDate(after, startDay, endDay, false, isSaveEnd);
				}
			},

			/**
			 * 取消具体一天的设置
			 **/
			unsetSpecificDate: function (day, isAll) {
				const dateTop = timeUtil.dateFormatWithoutDay(day);
				let monthList = this.$refs.Calendar.showMonthsHistory[dateTop];
				if (monthList !== null) {
					for (let i = 0; i < monthList.length; i++) {
						if (monthList[i].date === day) {
							monthList[i].todayDetail.isEffective = false;
							monthList[i].isModifyFlag = true;
							monthList[i].markClassName = "";
							monthList[i].todayDetail.dayType = "";
							if (isAll) {
								monthList[i].todayDetail.isPeriodStart = false;
								monthList[i].todayDetail.isPeriodEnd = false;
							}
							break;
						}
					}
				}
			},

			/**
			 * 获取之后的有效经期开始
			 **/
			getAfterEffectivePeriodStart: function (dateTop, start, end) {
				let flag = null;
				const currMouthList = this.$refs.Calendar.showMonthsHistory[dateTop];

				for (let j = 0; j < currMouthList.length; j++) {
					if (timeUtil.compareDate(start, currMouthList[j].date) || currMouthList[j].date === start) {
						debug.print("time : " + currMouthList[j].date + ",比起始日期前或者等于, 继续");
					} else if (timeUtil.isDateBeyondToday(currMouthList[j].date)) {
						debug.print("time : " + currMouthList[j].date + "已经超过今天,结束日期:" + flag);
						return flag;
					} else {
						if (currMouthList[j].todayDetail.isEffective) {
							debug.print("time:" + currMouthList[j].date + ",进入比较");
							if (currMouthList[j].otherMonth === 'nowMonth' && currMouthList[j].todayDetail.isPeriodStart) {
								flag = currMouthList[j].date;
								debug.print("find period start :" + flag);
								return flag;
							}
						}
					}
				}
				dateTop = timeUtil.getOtherMonthFormatWithoutDay(new Date(dateTop), "nextMonth");

				if (timeUtil.isDateBeyondToday(dateTop + '-1') || !this.$refs.Calendar.showMonthsHistory[dateTop]) {
					debug.print("find nothing &flag=" + flag);
					return flag;
				} else {
					return this.getAfterEffectivePeriodStart(dateTop, dateTop + '-1', end);
				}
			},

			/**
			 * 保存
			 */
			saveAllMouthDateRecord: function () {
				let saveList = [];
				let self = this;
				self.loading = true;

				let showMouthHistory = self.$refs.Calendar.showMonthsHistory;
				Object.keys(showMouthHistory).forEach(function (mouth) {
					showMouthHistory[mouth].forEach(function (day, index) {
						if (day.isModifyFlag && day.otherMonth === 'nowMonth') {
							saveList.push(day.todayDetail);
						}
					});
				});

				for (let i = 0; i < saveList.length; i++) {
					saveList[i] = self.formateVueDayDataToJava(saveList[i]);
				}

				console.log("saveList :" + saveList);

				let params = {
					"recordList": JSON.stringify(saveList)
				};

				$.ajax({
					type: "post",
					url: config.baseUrl + "/api/record/saveDayRecordsList",
					data: params,
				}).done(function (result) {
					self.loading = false;
					if (result.code === 200) {
						self.currRecordInsertList = result.data;
						self.storeMouthRecordIdInHistoryList(result.data);
						self.$message({
							message: "保存数据成功",
							type: "success"
						});
					} else {
						self.$message({
							message: "保存数据失败",
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

			/**
			 * 返回
			 */
			returnToMain: function () {
				this.saveAllMouthDateRecord();
				//this.$routers
			},

			/**
			 *
			 * @param data
			 * @returns {*}
			 * 根据data，返回data arr的最小月份
			 */
			getRecordMinMonth: function (data) {
				let min = data[0].dayTime;
				for (let i = 1; i < data.length; i++) {
					if (timeUtil.compareDate(min, data[i].dayTime)) {
						min = data[i].dayTime;
					}
				}
				return timeUtil.dateFormatWithoutDay(min);

			},

			/**
			 *
			 * @param data
			 * @returns {*}
			 * 根据data，返回data arr的最大月份
			 */
			getRecordMaxMonth: function (data) {
				let max = data[0].dayTime;
				for (let i = 1; i < data.length; i++) {
					if (timeUtil.compareDate(data[i].dayTime, max)) {
						max = data[i].dayTime;
					}
				}
				return timeUtil.dateFormatWithoutDay(max);
			},

			/**
			 *
			 * @param data
			 * @returns {[null,null]}
			 * 根据data,返回Arr[最小月，最大月],如果只有1个月 则返回数组length=1
			 */
			getRecordMonthDuring: function (data) {
				let min = this.getRecordMinMonth(data);
				let max = this.getRecordMaxMonth(data);
				if (min === max) {
					return [min];
				} else {
					return [min, max];
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

    .btnContainer {
        width: 100%;
        max-height: 100px;
        float: left;
        margin-top: 10px;
    }

    .calendarContainer {
        width: 100%;
        max-width: 800px;
        min-height: 380px;
        margin: 0 auto;
    }

    .calendarContent {
        width: 100%;
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

    .el-message-box {
        width: 80%;
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

    .ovulatoryDayTime {
        background-color: #e47eff;
        border-radius: 90px;
    }
</style>
