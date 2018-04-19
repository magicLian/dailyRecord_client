<template>
    <div>
        <!--密码确认-->
        <el-dialog title="你是？" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="dialogForm">
                <el-form-item label="手机密码" :label-width="dialogForm.formLabelWidth">
                    <el-input v-model="dialogForm.password" auto-complete="off" style="width: 80%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="passwordCancelFunc()">算了</el-button>
                <el-button type="primary" @click="passwordConfirmFunc()">好啦</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
	import $ from 'jquery';
	const md5 = require('js-md5');
	export default {
		name : 'privatePhoto',
		data () {
			return {
				photoList : [],
                ipassword : 'c6f057b86584942e415435ffb1fa93d4',
				dialogFormVisible : false,
				dialogForm: {
					password: '',
					formLabelWidth: '100px'
				},
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
                this.dialogFormVisible = false;
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

            }
        }
	}
</script>

<style scoped>

</style>