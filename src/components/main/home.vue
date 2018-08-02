<template>
    <div>
        <!--banner-->
        <div class="my-banner">
            <h1>{{ me.hello }}</h1>
            <h3>{{me.major}}</h3>
            <img :src="headerImages.item[0].src"/>
        </div>
        <!--introduce-->
        <div class="my-introduce">

        </div>


        <!--product-->
        <div class="my-product">

        </div>
        <!--<canvas id="a" width="800" height="600" style="border: 1px solid black"></canvas>-->
        <!--<button @click="getImageData">获取</button>-->
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
            }
        }
    },
    mounted : function () {
        //this.createCanvas();
    },
    methods :{
        createCanvas : function () {
	        var canvas = document.getElementById('a');
	        var canvasCtx = canvas.getContext('2d');
	        var image = new Image();

	        image.onload  = function(){
		        canvasCtx.drawImage(this,0,0,canvas.width,canvas.height);
	        };
	        image.crossOrigin = '*';
	        image.src = "http://magic-private-photos.oss-cn-hangzhou.aliyuncs.com/project/tooth2.png";
        },
        getImageData : function () {
	        var canvas = document.getElementById('a');
	        console.log(canvas.toDataURL());
        }
	}
}
</script>

<style scoped>
    .my-banner{
        height: 600px;
        width: 100%;
        position: absolute;
    }
    .my-banner > h1 {
        color: #ffffff;
        font-size: 3.2em;
        line-height: 150px;
        margin: 0;
        text-align: center;
        position: absolute;
        z-index: 3;
        top: 30%;
        left:25%;
    }
    .my-banner > h3 {
        color: #cbcbcb;
        font-size: 1.6em;
        line-height: 150px;
        margin: 0;
        text-align: center;
        position: absolute;
        z-index: 3;
        top: 40%;
        left:29%;
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
    .my-introduce{
        height: 800px;
        border: black solid 1px;
        width: 100%;
        position: absolute;
        top:660px;
    }
    .my-product {
        height: 500px;
        border: red solid 1px;
        width: 100%;
        position: absolute;
        top: 1460px;
    }
</style>