<template>
    <div>
        <div class="sky">
            <div class="asky">
                <div class="palne"></div>
                <div class="stone1"></div>
                <div class="stone2"></div>
                <div class="stone3"></div>
                <div class="yacht"></div>
                <div class="zyun">
                    <div class="yun1"></div>
                    <div class="yun2"></div>
                </div>
                <div class="syun">
                    <div class="yun1"></div>
                    <div class="yun2"></div>
                </div>
                <el-form :model="login" class="border">
                    <el-row>
                        <el-col :span="24"style="
                        text-align: center;
                        height: 50px;
                        line-height: 28px;
                        font-size: 30px;
                        color: #fff;
                    ">
                            <div class="grid-content bg-purple-dark">EzForFun</div>
                        </el-col>
                    </el-row>
                    <el-form-item prop="username">
                        <el-input
                                placeholder="请输入用户名"
                                prefix-icon="el-icon-service"
                                v-model="login.username"
                                clearable
                                @keyup.enter.native="Onlogin"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                placeholder="请输入密码"
                                prefix-icon="el-icon-menu"
                                style="margin-top: 20px;"
                                type="password"
                                v-model="login.password"
                                clearable
                                @keyup.enter.native="Onlogin">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                                type="primary"
                                style="float: right;
                            margin-top: 10px;"
                                @click="Onlogin">
                            登录</el-button>
                        <el-button
                                type="primary"
                                style="float: left;
                            margin-left: 0;
                            margin-top: 10px;"
                                @click="alertWindow">
                            注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="sun">
            <div class="kernel"></div>
            <div class="shine"></div>
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
        margin-bottom: 0!important;
    }
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
    }
</style>
<script>
	export default{
		data() {
			return {
				login: {
					username: '',
					password: ''
				},
				dialogVisible: false,
				account: '',
				cipher: '',
				mailbox: '',
			}
		},
		methods: {
			Onlogin: function () {
				var that = this;
				if (this.login.username == '' || this.login.password == '') {
					that.$message({
						message: '账号/密码必填哦！',
						center: true,
						type: 'error'
					});
				} else {
					that.$router.push('/index/home');
				}
			},
			alertWindow: function () {
				this.dialogVisible = true;
			}
		}
	}
</script>