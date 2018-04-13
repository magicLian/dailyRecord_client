<template>
    <el-container>
        <el-header>{{header}}</el-header>
        <el-main></el-main>
    </el-container>
</template>

<script>
export default {
    name: 'mainPage',
    data () {
        return {
	        header: 'Welcome to Your Vue.js App',
            body :"body"
        }
    }
}
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }
</style>