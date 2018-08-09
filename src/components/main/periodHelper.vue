<template>
    <div class="calendarContainer">
        <div class="calendarContent">
            <Calendar ref="Calendar"
                      :sundayStart="true"
                      :markDateMore="arr"
                      :markDate="arr2"
                      v-on:isToday="clickToday"
                      v-on:choseDay="clickDay"
                      v-on:changeMonth="changeDate">
            </Calendar>
        </div>
    </div>
</template>

<script>
	import $ from 'jquery';
	import Calendar from '../vue-calendar/index';

	export default {
		data() {
			return {
				dialogVisible: false,
				loading: false,
                message : "",

				arr2: [],
				arr: [{
                    date: '2018/8/6',
                    className: 'mark1'
                },{
                    date: '2018/8/1',
                    className: 'mark2'
                }]
			}
		},
		components: {
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
    .calendarContainer{
        width: 100%;
        height: 40%;
    }

    .calendarContent{
        width: 30%;
        height: 100%;
        background: #dedede;
        float: left;
        /*margin: 0 auto;*/
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
