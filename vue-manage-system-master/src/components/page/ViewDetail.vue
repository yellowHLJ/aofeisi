<template>
	<div class="surver" >
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>勘察详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container surverVd">
        	<p class="vd_p">{{data_router.city + "冬小麦勘察"}}</p>
        	<p>{{"勘察点行政区划位置:" + data_router.city + data_router.town + data_router.country}}</p>
        	<p>{{"勘察点坐标:"}}</p>
        	<p>{{"勘察点农作物种类:"}}</p>
        	<p>{{"现场实际情况概述:"}}</p>
        	<div>
        		<p>勘察点标的经纬度示意图:</p>
        		<img :src="src_img[0]" alt="示例1" @click="vd_click" ref="vd1" id="vd1">
        	</div>
        	<div>
        		<p>勘察点农作物照片:</p>
        		<img :src="src_img[1][0]" alt="示例2" class="vd2" @click="vd_click" ref="vd2">
        		<img :src="src_img[1][1]" alt="示例3" class="vd2" @click="vd_click" ref="vd2">
        		<img :src="src_img[1][2]" alt="示例4" class="vd2" @click="vd_click" ref="vd2">
        		<img :src="src_img[1][3]" alt="示例5" class="vd2" @click="vd_click" ref="vd2">
        	</div>
        </div>
		<el-dialog :title="view_title" :visible.sync="dialogVisible" width="80%" center>
			<i class="el-icon-caret-left vd_il" @click="vd_left"></i>
			<img :src="src_scal" alt="放大的图片" class="vd_img" />
			<i class="el-icon-caret-right vd_ir" @click="vd_right"></i>
		</el-dialog>
	</div>
</template>
<script>
    export default {
        name: 'viewDetail',
        data() {
            return {
                data_router:this.$route.params,
                dialogVisible: false,
                view_title: '勘察点状况',
                src_img: ["./static/img/img.jpg" ,["./static/img/img.jpg" ,"./static/img/img.jpg" ,"./static/img/img.jpg" ,"./static/img/img.jpg" ]],
                src_scal: '',
                img_arr: []
            }
        },
        mounted() {
        	// console.log(this.$route.params);
        	var surver = document.getElementsByClassName('surverVd');
        	var imgSrc = surver[0].getElementsByTagName('img');
        	// var img_arr = [];
        	for(var i=0;i<imgSrc.length;i++){
        		this.img_arr.push(imgSrc[i].src);
        	}
        },
        methods: {
            vd_click(e){
            	this.dialogVisible = true;
            	this.src_scal = e.target.src;
            },
         	vd_left(){

         	},
         	vd_right(){

         	}
        }
    }

</script>

<style >
    .vd_p{
    	text-align: center;
    	font-size: 20px;
    	line-height: 30px;
    }
    .container img{
    	width: 200px;
    	height: 200px;
    	margin: 0 5px;
    }
    .vd_img{
    	width: 80%;
    	margin: 10px 10%;
    }
    .vd_dia{
    	position: relative;
    }
    .vd_il,.vd_ir{
    	font-size: 50px;
    	border: 1px solid #aaa;
    	border-radius: 50%;
    	background-color: #ccc;
    	position: absolute;
    	top: 50%;
    }
    .vd_ir{
    	right: 3%;
    }
    .vd_il{
    	left: 3%;
    }
</style>
