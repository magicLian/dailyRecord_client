<template>
    <div>
        <div class="inputDiv">
            <el-input v-model="foodQuery"
                      placeholder="今天吃什么！"
                      @keyup.enter.native="queryFoodFunc"
                      clearable>
            </el-input>
            <el-button @click="queryFoodFunc()">查询美食</el-button>
        </div>
        <div>
            <el-row :gutter="10">
                <el-col :span="4" v-for="food in foodList">
                    <el-card>
                        <img :src="food.albums" class="image">
                        <div class="card-content">
                            <span>{{food.title}}</span>
                            <div class="clear"></div>
                            <div class="bottom clearfix" style="float: right;">
                                <el-button type="text" class="button">{{food.id}}</el-button>
                            </div>
                            <el-button type="text" @click="openNext(food.id,foodList)">详细做法</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <!--分页-->
        <div class="block" v-if="total!=0">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <!--详细做法-->
        <el-dialog title="提示" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%" top="3%">
            <div v-for="l in practice" style="width: 100%;margin-bottom: 10px;">
                <div style="float: left;width: 60%;height: 200px">
                    <img style="width:50%;height: 100%" :src="l.img" alt="">
                </div>
                <div style="float: left;width: 40%;">
                    {{l.step}}
                </div>
                <div class="clear"></div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
	import $ from 'jquery';
	export default {
		data() {
			return {
				foodQuery: '',
				foodList: [],
				practice:[],
				pageSize:12,
				total:0,
				currentPage:1,
				dialogVisible: false,
			}
		},

		methods: {
			queryFoodFunc: function () {
				let self = this;
				if(this.foodQuery.trim() !== ''){
					$.ajax({
						type: "get",
						dataType: 'jsonp',
						url: "http://apis.juhe.cn/cook/query.php?menu=" + self.foodQuery + "&dtype=&pn="+self.currentPage+"&rn="+self.pageSize+"&albums=&=&key=a9381db95a1fab2b1b54af914ff46ccc",
					}).done(function (data) {
						if(data.resultcode == 200){
							self.foodList = data.result.data;
							self.total = parseInt(data.result.totalNum);
							self.currentPage = data.result.pn === ''? 1 : parseInt(data.result.pn);
						}else{
							alert("查询菜谱失败，原因："+data.reason);
						}
					}).fail(function () {
						alert("查询菜谱失败");
					});
				}
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.queryFoodFunc();
			},
			openNext:function (id,data) {
				for(let i = 0;i < data.length; i++) {
					if (data[i].id === id){
						this.practice = data[i].steps;
					}
				}
				this.dialogVisible = true;
			},
		}
	}
</script>

<style scoped>
    .inputDiv {
        margin: 10px auto;
        width: 605px;
    }
    .el-input{
        width: 500px;
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
    .clear{
        clear: both;
    }
    .el-card{
        overflow: hidden;
        margin-bottom: 10px;
        height: 380px
    }
    .el-card__body img{
        transition:all .3s;
    }
    .el-card__body :hover{
        transform:scale(1.1) ;
    }
    .el-card__body{
        line-height: 0;
    }

    .card-content{
        padding: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 2vh;
        white-space: nowrap;
    }
</style>
