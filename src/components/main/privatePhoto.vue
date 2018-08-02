<template>
    <div>
        <!--密码确认-->
        <el-dialog title="你是？" :visible.sync="dialogForm.dialogFormVisible" width="30%">
            <el-form :model="dialogForm">
                <el-form-item label="手机密码" :label-width="dialogForm.formLabelWidth">
                    <el-input
                            v-model="dialogForm.password"
                            auto-complete="off"
                            style="width: 80%"
                            clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="passwordCancelFunc()">算了</el-button>
                <el-button type="primary" @click="passwordConfirmFunc()">好啦</el-button>
            </div>
        </el-dialog>

        <el-row :gutter="8">
            <span v-show="!dialogForm.dialogFormVisible" style="color: #cd0200;font-size: 20px;">{{photoQuery.haveNoData}}</span>
            <el-col :span="4" v-for="photo in photoQuery.photoList">
                <el-card>
                    <img :src="photo.url" class="image">
                </el-card>
            </el-col>
        </el-row>

        <!--分页-->
        <div class="block" v-if="photoQuery.photoList !=null">
            <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="photoQuery.total">
                    background
            </el-pagination>
        </div>


    </div>
</template>

<script>
	import $ from 'jquery';
	const md5 = require('js-md5');
	export default {
		name : 'privatePhoto',
		data () {
			return {
				dialogForm: {
					password: '',
					formLabelWidth: '100px',
					ipassword : 'c6f057b86584942e415435ffb1fa93d4',
					dialogFormVisible : true,
				},
                photoQuery :{
	                photoList : [],
	                loading : false,
	                currentPage : 1,
	                total:0,
                    haveNoData : "暂无数据"
                }
			}
		},
        mounted: function(){
            this.openComfirm();
        },
        methods : {
	        openComfirm : function () {
		        this.dialogFormVisible = true;
		        this.dialogForm.password='';
	        },
	        passwordCancelFunc :function () {
                this.dialogForm.password='';
                this.dialogForm.dialogFormVisible = false;
		        this.$message({
			        type: 'info',
			        message: '你放弃咧！'
		        });
            },
            passwordConfirmFunc : function () {
	        	let inputPassword = this.dialogForm.password;
	            if(inputPassword.trim() === ''){
		            this.$message({
			            type: 'error',
			            message: '你键盘坏了？'
		            });
		            this.dialogForm.password = "";
	            }else{
	            	console.log(this.ipassword);
		            if(md5(inputPassword) === this.ipassword){
		            	this.dialogFormVisible = false;
			            this.$message({
				            type: 'success',
				            message: '宝宝 爱你 么么哒！'
			            });
			            this.queryPhotoInfo();
		            }else{
			            this.$message({
				            type: 'error',
				            message: '你貌似不是自己人哦！'
			            });
		            }
	            }
            },
            queryPhotoInfo : function () {
	            let self = this;
	            self.photoQuery.loading = true;
	            $.ajax({
		            type: "get",
		            dataType: 'jsonp',
		            url: "http://apis.juhe.cn/cook/query.php?menu=" + self.foodQuery + "&dtype=&pn=" + self.currentPage + "&rn=" + self.pageSize + "&albums=&=&key=a9381db95a1fab2b1b54af914ff46ccc",
	            }).done(function (data) {
		            if (data.resultcode === 0) {
			            self.photoQuery.photoList = data.result.data;
			            self.total = parseInt(data.result.totalNum);
			            self.currentPage = data.result.page;
			            self.photoQuery.loading = false;
		            } else {
			            self.photoQuery.loading = false;
			            self.$message.error("查询照片失败，原因：" + data.message);
		            }
	            }).fail(function () {
		            self.photoQuery.loading = false;
		            self.$message.error("查询照片失败");
	            });
            },
	        handleCurrentChange(val) {
		        this.currentPage = val;
		        this.queryPhotoInfo();
	        }
        }
	}
</script>

<style scoped>

</style>