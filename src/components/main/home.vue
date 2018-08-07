<template>
    <div class="main">
        <!--banner-->
        <div class="my-banner">
            <el-row>
                <h1 class="title">· Intro</h1>
            </el-row>
            <el-row>
                <h2 class="title">bb && jj's house</h2>
            </el-row>
        </div>

        <!--product-->
        <div class="my-product">
            <el-row>
                <el-col :span="24">
                    <h1 class="title">· Func</h1>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" v-for="product in products">
                    <el-card :body-style="{height: '200px',padding: '10px'}" shadow="hover">
                        <img :src="product.img" class="image">
                        <div style="padding: 14px;height: 20%;font-size: 14px;">
                            <span>{{product.name}}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            me :{
            	hello : "Hello,I'm Magic Lian",
                major : "Fullstack Web Programmer"
            },
            headerImages : {
            	item :[{
            		src : require('../../assets/banner.jpg')
            	}]
            },
            products : [{
	            name : 'Eat What？',
	            img: require('../../assets/images/eatWhat.jpg')
            },{
            	name : 'Period Helper',
                img: require('../../assets/images/dayimazhushou.jpg')
            },{
            	name : 'To Do List',
	            img: require('../../assets/images/todolist.png')
            }]
        }
    },
    mounted : function () {

    },
    methods :{

	}
}
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .main{
        width: 100%;
        height: 100%;
        background: #fcfcfc;
    }
    .my-banner{
        height: 200px;
        width: 90%;
        position: absolute;
        padding: 10px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .my-banner > h2 {
        float: left;
        color: #313131;
        font-size: 3.2em;
        line-height: 150px;
        position: absolute;
        z-index: 3;
        top: 16%;
    }
    .my-banner > img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .my-product {
        height: 500px;
        width: 90%;
        position: absolute;
        padding: 10px;
        top: 260px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .title{
        font-size: 20px;
        float: left;
    }

    .image{
        width: 100%;
        height: 80%;
        overflow: hidden;
    }
    .el-card :hover{
        cursor: pointer;
        color: #ff9069;
    }
</style>