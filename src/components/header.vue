<template>
    <div class="my-header">
        <el-menu
                router
                default-active="/index/home"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="/index/home">Home</el-menu-item>
            <el-submenu index="/index/project">
                <template slot="title">My-Project</template>
                <el-menu-item index="/index/project/searchFood">Search-Food</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="line"></div>
    </div>
</template>

<script>
	export default {
		name: 'my-header',
		data () {
			return {
			}
		}
	}
</script>

<style scoped>
    .my-header {
        float: right;
        padding-right: 16%;
        background: #545c64;
    }
</style>
