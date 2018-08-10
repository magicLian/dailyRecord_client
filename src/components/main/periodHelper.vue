<template>
    <div class="main">
        <div class="calendarContainer">
            <div class="calendarContent">
                <Calendar ref="Calendar"
                    :sundayStart="true"
                    :markDateMore="chooseDay"
                    v-on:choseDay="clickDay"
                    v-on:changeMonth="changeDate">
                </Calendar>
            </div>
        </div>
        <!--<div class="colorForWhat">-->
            <!--<li><span style="background: rgba(255,60,81,0.91)"></span>经期</li>-->
            <!--<li><span style="background: rgba(255,60,81,0.53)"></span>预测经期</li>-->
            <!--<li><span style="background: #ff83d3;"></span>排卵期</li>-->
        <!--</div>-->
        <!--<div class="todayDetailInfo" :visible.sync="todayDetailVisible">-->
            <!--<el-form ref="form" label-width="80px">-->
                <!--<el-form-item label="经期开始">-->
                    <!--<el-switch v-model="todayDetail.isPeriodStart"></el-switch>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="经期结束">-->
                    <!--<el-switch v-model="todayDetail.isPeriodEnd"></el-switch>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-collapse>-->
                        <!--<el-collapse-item title="月经详情">-->
                            <!--<el-checkbox-group v-model="todayDetail.periodHurt">-->
                                <!--<el-checkbox-button label="轻度" value="1"></el-checkbox-button>-->
                                <!--<el-checkbox-button label="中度" value="2"></el-checkbox-button>-->
                                <!--<el-checkbox-button label="重度" value="3"></el-checkbox-button>-->
                            <!--</el-checkbox-group>-->
                        <!--</el-collapse-item>-->
                    <!--</el-collapse>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="爱爱">-->
                    <!--<el-switch v-model="todayDetail.hasLove"></el-switch>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="爱爱">-->
                    <!--<el-switch v-model="todayDetail.hasLove"></el-switch>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="爱爱">-->
                    <!--<el-switch v-model="todayDetail.hasLove"></el-switch>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</div>-->
    </div>
</template>

<script>
	import $ from 'jquery';
	import Calendar from '../vue-calendar/index';
	import timeUtil from '../vue-calendar/calendar';

	export default {
		data() {
			return {
				todayDetailVisible: false,
				chooseDay: [],
				todayDetail : {}
			}
		},
		components: {
			Calendar
		},
        mounted : function () {
            this.chooseDay = [{
                date: '2018-8-6',
                className: 'mark1'
            },{
                date: '2018-8-1',
                className: 'mark2'
            }]
        },
		methods: {
			queryFoodFunc: function () {
				let self = this;
				self.loading = true;
				$.ajax({
					type: "get",
					dataType: 'jsonp',
					url: "",
				}).done(function (data) {

				}).fail(function () {

				});
			},
			openNext: function (id, data) {
				this.dialogVisible = true;
			},
			clickDay(data) {
				console.log('选中了', data);
				this.$message('选中了' + data);
				const today = new Date();
				if(timeUtil.compareDate(data,today)){
					this.$message('无法编辑未来');
                }else {
					this.todayDetailVisible = true;
                }
			},
			changeDate(data) {
				this.$message('切换到的月份为' + data);
				console.log('左右点击切换月份', data);
				//切换月份
			},
			jumpTo(date) {
				this.$refs.Calendar.ChoseMonth(date);
			}
		}
	}
</script>
<style>
    .main{
        width: 100%;
        height: 100%;
        background: #f05c7000;
    }

    .calendarContainer{
        width: 100%;
        max-width: 800px;
        height: 50%;
        min-height: 380px;
        margin: 0 auto;
    }

    .calendarContent{
        width: 100%;
        height: 100%;
        background: #dedede;
        float: left;
        margin: 0 auto;
    }

    .colorForWhat{
        width: 100%;
        height: 20px;
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        padding: 0 20px;
        background: #ffefe3;
    }

    .colorForWhat li{
        display: flex;
        width: 30%;
        height: 80%;
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

    .todayDetailInfo{
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .el-form{
        margin-top: 10px;
    }

    .el-form-item{
        margin-bottom: 0px;
        border-bottom: solid 1px #E4E7ED;
    }

    .mark1 {
        background-color: #59ff4c;
        border-radius: 90px;
    }

    .mark2 {
        background-color: #ff83d3;
        border-radius: 90px;
    }
</style>
