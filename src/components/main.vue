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
import bg_img from '@/assets/bg.jpg';

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
    }
    .el-main {
        background: #e9e9e9;
        text-align: center;
        height: 80%;
    }
    .el-container {
        height: 100%;
        width: 100%;
    }
</style>