<template>
    <div class="main">
        <div class="sky">
            <div class="asky">
                <div class="palne"></div>
                <div class="stone1"></div>
                <div class="stone2"></div>
                <div class="stone3"></div>
                <div class="yacht"></div>
                <el-form :model="login" class="border">
                    <el-row>
                        <el-col :span="24"
                                style="text-align: center;height: 50px;line-height: 28px;font-size: 30px;color: #fff;">
                            <div class="grid-content bg-purple-dark">BB&JJ</div>
                        </el-col>
                    </el-row>
                    <el-form-item prop="username">
                        <el-input
                                placeholder="用户名"
                                prefix-icon="el-icon-service"
                                v-model="login.loginName"
                                clearable
                                @keyup.enter.native="Onlogin"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                placeholder="密码"
                                prefix-icon="el-icon-menu"
                                style="margin-top: 20px;"
                                type="password"
                                v-model="login.password"
                                clearable
                                @keyup.enter.native="Onlogin">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="margin-top: 10px;background-color: #73a2ff;" @click="Onlogin">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="sea">
            <div class="bubble bubble1"></div>
            <div class="bubble bubble2"></div>
            <div class="bubble bubble3"></div>
            <div class="bubble bubble4"></div>
            <div class="bubble bubble5"></div>
            <div class="bubble bubble6"></div>
            <div class="bubble bubble7"></div>
            <div class="jellyfish jellyfish1">
                <div class="jellyfish_head"></div>
                <div class="jellyfish_tail">
                    <div class="jellyfish_tail_in"></div>
                </div>
            </div>


            <div class="jellyfish jellyfish2">
                <div class="jellyfish_head"></div>
                <div class="jellyfish_tail">
                    <div class="jellyfish_tail_in"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style type="text/css">
    @import "../assets/css/login.css";
    @import "../assets/css/system.css";
    .el-form-item {
        margin-bottom: 0 !important;
    }
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
    }
</style>
<script>
	import $ from 'jquery';
	import config from '../util/config';

	export default {
		data() {
			return {
				login: {
					loginName: '',
					password: ''
				},
				loading: false
			}
		},
		methods: {
			Onlogin: function () {
				var that = this;
				if (this.login.loginName == '' || this.login.password == '') {
					that.$message({
						message: '账号/密码必填哦！',
						center: true,
						type: 'error'
					});
				} else {
					that.loading = true;
					$.ajax({
						type: "post",
						dataType: 'json',
						url: config.baseUrl+"/api/index/checkLogin",
						data: that.login,
					}).done(function (result) {
						that.loading = false;
						if (result.code === 200) {
							that.$router.push('/index/home');
						} else {
							that.$message.error(result.message);
						}
					}).fail(function () {
						that.loading = false;
						that.$message.error("登录失败");
					});
				}
			}
		}
	}
</script>