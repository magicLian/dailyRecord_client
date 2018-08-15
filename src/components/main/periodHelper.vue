<template>
    <div class="main" v-loading="loading">
        <div class="calendarContainer">
            <div class="calendarContent">
                <Calendar ref="Calendar"
                          :sundayStart="true"
                          :markDateMore="showDay"
                          v-on:choseDay="clickDay"
                          v-on:changeMonth="changeDate">
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
                                    <el-radio label="轻度" value="1"></el-radio>
                                    <el-radio label="中度" value="2"></el-radio>
                                    <el-radio label="重度" value="3"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="流量" style="border-bottom: 0px;">
                                <el-radio-group v-model="todayDetail.flowQuality" size="mini">
                                    <el-radio label="很少" value="1"></el-radio>
                                    <el-radio label="较少" value="2"></el-radio>
                                    <el-radio label="平均" value="3"></el-radio>
                                    <el-radio label="较多" value="4"></el-radio>
                                    <el-radio label="很多" value="5"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="血色" style="border-bottom: 0px;">
                                <el-radio-group v-model="todayDetail.bloodColor" size="mini">
                                    <el-radio label="很浅" value="1"></el-radio>
                                    <el-radio label="较浅" value="2"></el-radio>
                                    <el-radio label="中等" value="3"></el-radio>
                                    <el-radio label="较深" value="4"></el-radio>
                                    <el-radio label="很深" value="5"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="经血" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.periodShape" size="mini">
                                    <el-checkbox label="血块" value="1"></el-checkbox>
                                    <el-checkbox label="异味" value="2"></el-checkbox>
                                    <el-checkbox label="渣状" value="3"></el-checkbox>
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
                                    <el-checkbox label="头痛" value="1"></el-checkbox>
                                    <el-checkbox label="眩晕" value="2"></el-checkbox>
                                    <el-checkbox label="粉刺" value="3"></el-checkbox>
                                    <el-checkbox label="发热" value="4"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="身体" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.head" size="mini">
                                    <el-checkbox label="乳房胀痛" value="1"></el-checkbox>
                                    <el-checkbox label="身体酸痛" value="2"></el-checkbox>
                                    <el-checkbox label="小腹坠胀" value="3"></el-checkbox>
                                    <el-checkbox label="腹痛" value="4"></el-checkbox>
                                    <el-checkbox label="腰酸" value="4"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="私处" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.privateTh" size="mini">
                                    <el-checkbox label="瘙痒" value="1"></el-checkbox>
                                    <el-checkbox label="异味" value="2"></el-checkbox>
                                    <el-checkbox label="非经期出血" value="3"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="白带" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.whitePip" size="mini">
                                    <el-checkbox label="粘稠" value="1"></el-checkbox>
                                    <el-checkbox label="拉丝" value="2"></el-checkbox>
                                    <el-checkbox label="量多" value="3"></el-checkbox>
                                    <el-checkbox label="渣状" value="4"></el-checkbox>
                                    <el-checkbox label="块状" value="4"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="肠胃" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.stomach" size="mini">
                                    <el-checkbox label="贪冷饮" value="1"></el-checkbox>
                                    <el-checkbox label="嗜辛辣" value="2"></el-checkbox>
                                    <el-checkbox label="食欲不振" value="3"></el-checkbox>
                                    <el-checkbox label="恶心" value="4"></el-checkbox>
                                    <el-checkbox label="呕吐" value="5"></el-checkbox>
                                    <el-checkbox label="腹泻" value="6"></el-checkbox>
                                    <el-checkbox label="便秘" value="7"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="心理" style="border-bottom: 0px;">
                                <el-checkbox-group v-model="todayDetail.tought" size="mini">
                                    <el-checkbox label="失眠" value="1"></el-checkbox>
                                    <el-checkbox label="多梦" value="2"></el-checkbox>
                                    <el-checkbox label="烦躁" value="3"></el-checkbox>
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
	import Calendar from '../vue-calendar/index';
	import timeUtil from '../vue-calendar/calendar';
	import config from '../../util/config';

	export default {
		data() {
			return {
				loading: false,
				todayDetailVisible: false,
				showDay: [],
				todayDetail: {
					id:'',
					dayTime:'',
                    dayType:'',
                    hasLove:false,
                    isPeriodStart:false,
					isPeriodEnd:false,
					periodHurt: [],
					flowQuality: [],
					bloodColor: [],
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
			this.getMouthRecord();
		},
		methods: {
			getMouthRecord: function (d) {
				let self = this;
				self.loading = false;
				let params = timeUtil.getOneMouthStartEnd(d);
				$.ajax({
					type: "get",
					url: config.baseUrl + "/api/record/getMouthRecord",
					data: params
				}).done(function (result) {
					self.loading = false;
                    if(result.code === 200){
	                    self.showDay = [];
	                    const resultData = result.data;
                        for(let i=0;i<resultData.length;i++){
                            //1经期 2预测经期 3排卵期 4爱爱 5自定义
                        	if(resultData[i].dayType === 1){
		                        self.showDay.push({
			                        "date": timeUtil.dateFormat(resultData[i].dayTime),
			                        "className": 'periodTime'
                                });
                            }
                        }
                    }else{
                        self.$message({
                            message : "加载数据失败",
                            type : "error"
                        });
                    }
				}).fail(function () {
					self.loading = false;
					self.$message({
						message : "加载数据失败",
						type : "error"
					});
				});
			},
			openNext: function (id, data) {
				this.dialogVisible = true;
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
					this.getClickDayInfo();
				}
			},
			changeDate(data) {
				this.$message('切换到的月份为' + data);
				console.log('左右点击切换月份', data);
				this.getMouthRecord(data);
			},
			jumpTo(date) {
				this.$refs.Calendar.ChoseMonth(date);
			},
            getClickDayInfo : function () {
	            let self = this;
	            self.loading = false;
	            $.ajax({
		            type: "get",
		            url: config.baseUrl + "/api/record/getDayTimeRecord",
		            data: {
		            	'dayTime' : self.todayDetail.dayTime
                    }
	            }).done(function (result) {
		            self.loading = false;
		            if(result.code === 200){
			            self.todayDetail = result.data;
			            self.formateJavaDayDataToVue(result.data);
                        console.log(self.todayDetail);
		            }else{
			            self.$message({
				            message : "查询数据失败",
				            type : "error"
			            });
		            }
	            }).fail(function () {
		            self.loading = false;
		            self.$message({
			            message : "查询数据失败",
			            type : "error"
		            });
	            });
            },
			saveClickDayInfo : function () {
				let self = this;
				self.loading = false;
				$.ajax({
					type: "get",
					url: config.baseUrl + "/api/record/setMouthRecord",
					data: {
						'record' : self.todayDetail
                    }
				}).done(function (result) {
					self.loading = false;
					if(result.code === 200){
						self.$message({
							message : "保存数据成功",
							type : "success"
						});
					}else{
						self.$message({
							message : "保存数据失败",
							type : "error"
						});
					}
				}).fail(function () {
					self.loading = false;
					self.$message({
						message : "保存数据失败",
						type : "error"
					});
				});
			},
            formateJavaDayDataToVue : function (data) {
                this.todayDetail.dayTime = timeUtil.dateFormat(data.dayTime);
	            this.todayDetail.hasLove = data.hasLove === 1;
	            this.todayDetail.isPeriodStart = data.isPeriodStart === 1;
	            this.todayDetail.isPeriodEnd = data.isPeriodEnd === 1;
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
        background-color: rgba(255,60,81,0.91);
        border-radius: 90px;
    }

    .forcastPeriodTime {
        background-color: rgba(255,60,81,0.53);
        border-radius: 90px;
    }

    .ovulatoryTime{
        background-color: #ff83d3;
        border-radius: 90px;
    }
</style>
