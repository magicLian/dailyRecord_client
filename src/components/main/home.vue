<template>
    <div class="main">
        <!--banner-->
        <div class="my-banner">
            <el-row>
                <h1 class="title">· Intro</h1>
            </el-row>
            <el-row>
                <h2 class="title">{{intro.hello}}</h2>
            </el-row>
        </div>

        <!--product-->
        <div class="my-product">
            <el-row>
                <el-col :span="24">
                    <h1 class="title">· Func</h1>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12" v-for="product in products">
                    <el-card :body-style="{height: '150px',padding: '10px'}" style="margin-bottom:10px" shadow="hover">
                        <div @click="openApp(product.url)" style="width: 100%;height: 100%">
                            <img :src="product.img" class="image">
                            <div style="padding: 14px;height: 20%;font-size: 14px;">
                                <span>{{product.name}}</span>
                            </div>
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
            intro :{
            	hello : "bb && jj's house"
            },
            headerImages : {
            	item :[{
            		src : require('../../assets/banner.jpg')
            	}]
            },
            products : [{
	            name : 'Eat What？',
	            img: require('../../assets/images/eatWhat.jpg'),
                url : '/index/project/searchFood'
            },{
            	name : 'Period Helper',
                img: require('../../assets/images/dayimazhushou.jpg'),
	            url : '/index/project/periodHelper'
            },{
            	name : 'To Do List',
	            img: require('../../assets/images/todolist.png'),
	            url : '/index/project/todoList'
            }]
        }
    },
    mounted : function () {
    },
    methods :{
	    openApp :function (url) {
		    this.$router.push(url);
	    }
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
        padding-top: 20px;
    }
    .my-banner{
        height: 100px;
        width: 90%;
        margin: 0 auto;
    }
    .my-banner > h2 {
        float: left;
        color: #313131;
        font-size: 3.2em;
        line-height: 150px;
        position: absolute;
        z-index: 3;
        top: 16%;
        font-weight: normal;
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
        margin: 0 auto;
    }
    .title{
        font-size: 20px;
        float: left;
        font-weight: normal;
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