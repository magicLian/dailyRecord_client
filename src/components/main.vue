<template>
    <el-container>
        <el-header>
            <my_header></my_header>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
import my_header from "./header.vue";

export default {
    data () {
        return {

        }
    },
	components : {
		my_header,
	}
}
</script>

<style scoped>
    .el-header{
        color: #333;
        text-align: center;
        line-height: 60px;
        padding: 0px;
        height: 20%;
        background: #545c64;
    }
    .el-main {
        text-align: center;
        height: 80%;
        padding: 0px;
    }
    .el-container {
        width: 100%;
        height: 100%;
    }
</style>