<template>
    <div class="main">
        <div class="calendarContainer">
            <div class="calendarContent">
                <Calendar ref="Calendar"
                          :sundayStart="true"
                          :markDateMore="arr"
                          v-on:choseDay="clickDay"
                          v-on:changeMonth="changeDate">
                </Calendar>
            </div>
        </div>
    </div>
</template>

<script>
	import $ from 'jquery';
	import Calendar from '../vue-calendar/index';
	import timeUtil from '../vue-calendar/calendar';
	import ElRow from "element-ui/packages/row/src/row";
	import ElCol from "element-ui/packages/col/src/col";

	export default {
		data() {
			return {
				dialogVisible: false,
				loading: false,
                message : "",
				arr: [{
                    date: '2018-8-6',
                    className: 'mark1'
                },{
                    date: '2018-8-1',
                    className: 'mark2'
                }]
			}
		},
		components: {
			ElCol,
			ElRow,
			Calendar
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
                }
			},
			clickToday(data) {
				console.log('跳到了本月今天', data);
			},
			changeDate(data) {
				this.$message('切换到的月份为' + data);
				console.log('左右点击切换月份', data); //左右点击切换月份
			}
// ,
//			demo() {
//				this.$refs.Calendar.ChoseMonth('2018-12-13'); //跳到12月12日选中12月12日
//			}
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

    .mark1 {
        background-color: #59ff4c;
        border-radius: 90px;
    }

    .mark2 {
        background-color: #ff83d3;
        border-radius: 90px;
    }
</style>
