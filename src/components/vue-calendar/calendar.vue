<style xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    * {
        margin: 0;
        padding: 0;
    }

    .wh_container {
        width: 100%;
        height: 100%;
        margin: auto;
    }

    li {
        list-style-type: none;
    }

    .wh_top_changge {
        display: flex;
    }

    .wh_top_changge li {
        cursor: pointer;
        display: flex;
        color: #252525;
        font-size: 18px;
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 50px;
    }

    .wh_top_changge .wh_content_li {
        cursor: auto;
        flex: 2.5;
    }

    .wh_content_all {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
        background-color: rgba(252, 252, 252, 0.99);
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .wh_content_weekday {
        display: flex;
        flex-wrap: wrap;
        padding: 0 3% 0 3%;
        width: 100%;
        height: 30px;
        font-size: 12px;
        color: #6f7180;
    }

    .wh_content {
        display: flex;
        flex-wrap: wrap;
        padding: 0 3% 0 3%;
        width: 100%;
    }

    .wh_content_item_weekday {
        height: 30px;
        width: 13.4%;
    }

    .wh_top_tag_weekday {
        width: 30px;
        height: 30px;
        line-height: 40px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wh_content_item {
        font-size: 15px;
        width: 13.5%;
        height: 55px;
        text-align: center;
        color: #252525;
        vertical-align: middle;
        display: inline-block;
    }

    .wh_item_date {
        width: 35px;
        height: 35px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wh_item_img{
        width: 100%;
        text-align: center;
        height: 20px;
    }

    .wh_item_img  img{
        height: 16px;
        width: 16px;
    }

    .wh_jiantou1 {
        width: 12px;
        height: 12px;
        border-top: 2px solid #252525;
        border-left: 2px solid #252525;
        transform: rotate(-45deg);
    }

    .wh_jiantou1:active,
    .wh_jiantou2:active {
        border-color: #ddd;
    }

    .wh_jiantou2 {
        width: 12px;
        height: 12px;
        border-top: 2px solid #252525;
        border-right: 2px solid #252525;
        transform: rotate(45deg);
    }

    .wh_content_item .wh_other_dayhide {
        color: #bfbfbf;
        border-radius: 100px;
    }

    .wh_content_item .wh_isToday {
        background: #ff836b;
        border-radius: 90px;
    }

    .wh_content_item .wh_chose_day {
        border-radius: 100px;
        border: 2px solid #6db6dd;
        width: 31px;
        height: 31px;
    }
</style>
<template>
    <section class="wh_container">
        <div class="wh_content_all">
            <div class="wh_top_changge">
                <li @click="preMonthFunc(myDate,false)">
                    <div class="wh_jiantou1"></div>
                </li>
                <li class="wh_content_li">{{dateTop}}</li>
                <li @click="nextMonthFunc(myDate,false)">
                    <div class="wh_jiantou2"></div>
                </li>
            </div>
            <div class="wh_content_weekday">
                <div class="wh_content_item_weekday" v-for="tag in textTop">
                    <div class="wh_top_tag_weekday">
                        {{tag}}
                    </div>
                </div>
            </div>
            <div class="wh_content" style="height: calc(100% - 87px);">
                <div class="wh_content_item" v-for="(item) in chooseMonth">
                    <div class="wh_item_date" @click="clickDay(item)"
                         v-bind:class="[{wh_other_dayhide:item.otherMonth!=='nowMonth'},
                         {wh_chose_day:item.chooseDay}
                         ,setClass(item)]">
                        {{item.id}}
                    </div>
                    <div class="wh_item_img" v-if="item.todayDetail.isEffective">
                        <img v-show="item.todayDetail.isPeriodStart" src="../../assets/images/periodHelper/startT.png"/>
                        <img v-show="item.todayDetail.isPeriodEnd" src="../../assets/images/periodHelper/endT.png"/>
                        <img v-show="item.todayDetail.hasLove" src="../../assets/images/periodHelper/love.png"/>
                    </div>
                    <div class="wh_item_img" v-else>
                        <img v-show="item.todayDetail.isPeriodStart" src="../../assets/images/periodHelper/startF.png"/>
                        <img v-show="item.todayDetail.isPeriodEnd" src="../../assets/images/periodHelper/endF.png"/>
                        <img v-show="item.todayDetail.hasLove" src="../../assets/images/periodHelper/love.png"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
	import timeUtil from './calendar';
	import utils from '../../util/utils';

	export default {
		data() {
			return {
				textTop: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				myDate: [],
				chooseMonth: [],
				dateTop: '',
				showMonthsHistory: {},
				todayDetail: {
					id: '',
					userId : '',
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
					isEffective : false
				}
			};
		},
		props: {
			sundayStart: {
				type: Boolean,
				default: () => false
			}
		},
		created() {
			this.intStart();
			this.myDate = new Date();
			this.dateTop = `${this.myDate.getFullYear()}-${this.myDate.getMonth() + 1}`;
		},
		methods: {
			intStart() {
				if (this.sundayStart) {
					this.textTop = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
				} else {
					this.textTop = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
				}
				timeUtil.sundayStart = this.sundayStart;
			},
			setClass(data) {
				let obj = {};
				obj[data.markClassName] = data.markClassName;
				return obj;
			},
			clickDay: function (item) {
				if (item.otherMonth === 'nowMonth') {
					this.getList(this.myDate, item.date);
				}
				if (item.otherMonth !== 'nowMonth') {
					item.otherMonth === 'preMonth'
						? this.preMonthFunc(item.date)
						: this.nextMonthFunc(item.date);
				}
			},
			preMonthFunc: function (date) {
				const newDateWithoutDay = timeUtil.dateFormatWithoutDay(date);
				this.clearMouthChoose(true,false);
				if (newDateWithoutDay === this.dateTop) { //点击的箭头切换
					this.dateTop = timeUtil.getOtherMonthFormatWithoutDay(date, 'preMonth');
					this.myDate = new Date(this.dateTop);
				} else { //点击的该月其他月日期切换
					this.myDate = new Date(newDateWithoutDay);
					this.dateTop = newDateWithoutDay;
				}
				this.getPre2AndCurrentAndAfter2(this.myDate);
				this.$emit('changeMonth', this.dateTop);
			},
			nextMonthFunc: function (date) {
				const newDateWithoutDay = timeUtil.dateFormatWithoutDay(date);
				this.clearMouthChoose(true,false);
				if (newDateWithoutDay === this.dateTop) { //点击的箭头切换
					this.dateTop = timeUtil.getOtherMonthFormatWithoutDay(date, 'nextMonth');
					this.myDate = new Date(this.dateTop);
				} else { //点击的该月其他月日期切换
					this.myDate = new Date(newDateWithoutDay);
					this.dateTop = newDateWithoutDay;
				}
				this.getPre2AndCurrentAndAfter2(this.myDate);
				this.$emit('changeMonth', this.dateTop);
			},
			getList: function (dateMouth, chooseDay) {
				let dateMouthStr = timeUtil.dateFormatWithoutDay(dateMouth);
				if (this.showMonthsHistory[dateMouthStr]) {
					if (dateMouthStr === this.dateTop) {
						this.chooseMonth = this.showMonthsHistory[dateMouthStr];
						if (chooseDay) {
							for (let i = 0; i < this.chooseMonth.length; i++) {
								if (chooseDay === this.chooseMonth[i].date) {
									this.chooseMonth[i].chooseDay = true;
									this.$emit('choseDay', chooseDay);
								} else {
									this.chooseMonth[i].chooseDay = false;
								}
							}
						}
					}
				} else {
					let arr = timeUtil.getMonthList(dateMouth);
					this.initMouthList(arr);
					this.showMonthsHistory[dateMouthStr] = arr;
					if (dateMouthStr === this.dateTop) {
						this.chooseMonth = arr;
					}
				}
			},
			initMouthList: function (arr) {
				for (let i = 0; i < arr.length; i++) {
					let k = arr[i];
					k.chooseDay = false;
					const nowTime = k.date;

					//标记选中某些天 设置class
					k.markClassName = "";

					//在list中加入数据绑定对象
					k.todayDetail = utils.clone(this.todayDetail);
					k.todayDetail.dayTime = nowTime;

					//最开始定义为没有修改
					k.isModifyFlag = false;
				}
				return arr;
			},
			getPre2AndCurrentAndAfter2: function (date) {
				//本月
				this.getList(date, false);
				//前2月
				this.getPre2(date);
				//后2月
				this.getAfter2(date);
			},
			getPre2: function (date) {
				let datePre1 = timeUtil.getOtherMonth(date, 'preMonth');
				this.getList(datePre1, false);
				let datePre2 = timeUtil.getOtherMonth(datePre1, 'preMonth');
				this.getList(datePre2, false);
			},
			getAfter2: function (date) {
				let dateAfter1 = timeUtil.getOtherMonth(date, 'nextMonth');
				this.getList(dateAfter1, false);
				let dateAfter2 = timeUtil.getOtherMonth(dateAfter1, 'nextMonth');
				this.getList(dateAfter2, false);
			},
            clearMouthChoose(isClearChoose,isClearClassName){
                let dateTop = this.dateTop;
                let mouthList = this.showMonthsHistory[dateTop];
                for(let i=0;i<mouthList.length;i++){
                	if(isClearChoose){
		                mouthList[i].chooseDay = false;
                    }
                    if(isClearClassName){
                		mouthList[i].className = "";
                    }
                }
            }
		},
		mounted() {
			this.getPre2AndCurrentAndAfter2(this.myDate);
		},
		watch: {
			sundayStart(val, oldVal) {
				this.intStart();
				this.getPre2AndCurrentAndAfter2(this.myDate);
			}
		}
	};
</script>