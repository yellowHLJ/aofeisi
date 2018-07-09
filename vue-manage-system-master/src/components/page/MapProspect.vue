<template>
	<div class="map_con">
		<el-breadcrumb separator="/" class="bread_el" >
            <el-breadcrumb-item><i class="el-icon-tickets"></i>地图展示</el-breadcrumb-item>
        </el-breadcrumb>
 		<v-map></v-map>
 	</div>
</template>
<style>
	.map_con {
	  height: 100%;
	  margin-bottom: 20px;
	}
	.bread_el{
		margin-bottom: 20px;
		overflow: hidden;
	}
</style>
<script>
	import vMap from './Map.vue';
	export default {
	  	data () {
	    	return {
	      		keyword: ''
	   	 	}
	  	},
	  	components:{
            vMap
      	}
	}
</script>