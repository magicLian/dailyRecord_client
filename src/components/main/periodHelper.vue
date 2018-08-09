<template>
    <div>
        <div class="calendarContent">
            <Calendar ref="Calendar"
              :sundayStart="true"
              :markDateMore="arr"
              :markDate="arr2"
              v-on:isToday="clickToday" agoDayHide="1530115200"
              v-on:choseDay="clickDay"
              v-on:changeMonth="changeDate"></Calendar>
        </div>
    </div>
</template>

<script>
	import $ from 'jquery';
	import Calendar from '../vue-calendar/index';
	export default {
		data() {
			return {
				foodQuery: '',
				foodList: [],
				practice: [],
				pageSize: 12,
				total: 0,
				currentPage: 1,
				dialogVisible: false,
				loading: false,

				arr2: [],
				arr: [{
                    date: '2018/6/1',
                    className: 'mark1'
                },
                {
                    date: '2018/6/13',
                    className: 'mark2'
                }]
			}
		},
		components: {
			Calendar
		},
        mounted : function(){
	        function format(date, index) {
                date = new Date(date);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
            }

            this.arr = [{
                date: format(new Date(), 1),
                className: 'mark1'
            },
            {
                date: format(new Date(), 13),
                className: 'mark2'
            }];
        },
		methods: {
			queryFoodFunc: function () {
				let self = this;
				self.loading = true;
				if (self.foodQuery.trim() === '') {
					self.loading = false;
					return;
				}
				$.ajax({
					type: "get",
					dataType: 'jsonp',
					url: "http://apis.juhe.cn/cook/query.php?menu=" + self.foodQuery + "&dtype=&pn=" + self.currentPage + "&rn=" + self.pageSize + "&albums=&=&key=a9381db95a1fab2b1b54af914ff46ccc",
				}).done(function (data) {
					if (data.resultcode == 200) {
						self.foodList = data.result.data;
						self.total = parseInt(data.result.totalNum);
						self.currentPage = data.result.pn === '' ? 1 : parseInt(data.result.pn);
						self.loading = false;
					} else {
						self.loading = false;
						self.$message.error("查询菜谱失败，原因：" + data.reason);
					}
				}).fail(function () {
					self.loading = false;
					self.$message.error("查询菜谱失败");
				});
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.queryFoodFunc();
			},
			openNext: function (id, data) {
				for (let i = 0; i < data.length; i++) {
					if (data[i].id === id) {
						this.practice = data[i].steps;
					}
				}
				this.dialogVisible = true;
			},
			clickDay(data) {
				console.log('选中了', data); //选中某天
				this.$toast('选中了' + data);
			},
			clickToday(data) {
				console.log('跳到了本月今天', data); //跳到了本月
			},
			changeDate(data) {
				this.$toast('切换到的月份为' + data);
				console.log('左右点击切换月份', data); //左右点击切换月份
			},
			demo() {
				this.$refs.Calendar.ChoseMonth('2018-12-13'); //跳到12月12日选中12月12日
			}
		}
	}
</script>
<style scoped>
    .inputDiv {
        margin: 10px auto;
        width: 605px;
    }

    .el-input {
        width: 500px;
    }

    .el-row{
        width:100%;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        height: 80%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .clear {
        clear: both;
    }

    .el-card {
        overflow: hidden;
        margin-bottom: 10px;
        height: 380px
    }

    .el-card__body img {
        transition: all .3s;
    }

    .el-card__body :hover {
        transform: scale(1.1);
    }

    .el-card__body {
        line-height: 0;
    }

    .card-content {
        padding: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 2vh;
        white-space: nowrap;
    }

    .detail-content {
        height: 200px;
        margin-bottom: 10px;
    }

    .detail-content-left {
        float: left;
        width: 60%;
        height: 100%
    }

    .detail-content-left img {
        width: 85%;
        height: 100%
    }

    .detail-content-right {
        float: left;
        width: 40%;
        height: 100%
    }

    .detail-content-right span {
        float: left;
        width: 90%;
        height: 100%;
    }
    .calendarContent{
        width: 50%;
        height: 400px;
        background: #dedede;
        margin: 0 auto;
    }
</style>
