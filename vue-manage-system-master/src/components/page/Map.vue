<template>
  	<baidu-map class="map" center="郑州" :zoom="15" :scroll-wheel-zoom="true" mapType="BMAP_HYBRID_MAP">
  		<!-- 图层选择 -->
  		<bm-map-type :map-types="['BMAP_HYBRID_MAP', 'BMAP_NORMAL_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT" ></bm-map-type>
  		<!-- 缩小放大 -->
  		<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  		<bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-scale>
  		<!-- 定位 -->
  		<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" :locationSuccess="qwe()"></bm-geolocation>
  		<!-- 勘察点分布 -->
		<bml-marker-clusterer :averageCenter="true">
			<bm-marker v-for="marker of map_router" :position="{lng: marker.lng, lat: marker.lat}" @click="mapClick(marker)" :title="marker.title">
				 <bm-label :content="marker.title" :labelStyle="{color: '#F819E0', fontSize : '12px',border:'none',background:'transparent'}" :offset="{width: -45, height: 30}"/>
			</bm-marker>
		</bml-marker-clusterer>
		<template>
			<el-dialog title="勘察信息录入" :visible.sync="dialogFormVisible">
				<el-form :model="form" >
					<el-form-item label="勘察名称" :label-width="formLabelWidth" >
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="勘察地点" :label-width="formLabelWidth" >
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="勘察类型" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择勘察类型">
							<el-option label="农作物种植类型勘察" value="0"></el-option>
							<el-option label="农作物种植面积勘察" value="1"></el-option>
							<el-option label="农作物灾情勘察" value="2"></el-option>
							<el-option label="农作物样方" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="农作物种类" :label-width="formLabelWidth">
						<el-select v-model="form.type" placeholder="请选择农作物种类">
							<el-option label="小麦" value="0" ></el-option>
							<el-option label="大豆" value="1"></el-option>
							<el-option label="玉米" value="2"></el-option>
							<el-option label="水稻" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="勘察时间" :label-width="formLabelWidth">
						<el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
					</el-form-item>
					<el-form-item label="受灾类型" :label-width="formLabelWidth">
						<el-select v-model="form.disaster" placeholder="请选择勘察类型">
							<el-option label="病虫害" value="0"></el-option>
							<el-option label="干旱" value="1"></el-option>
							<el-option label="倒伏" value="2"></el-option>
							<el-option label="干热风" value="3"></el-option>
							<el-option label="冰雹" value="4"></el-option>
							<el-option label="水灾" value="5"></el-option>
							<el-option label="其他" value="6"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="勘察点信息" :label-width="formLabelWidth" v-show="form.region==1">
						<el-input v-model="form.population" auto-complete="off" class="map_inpWid">
							<template slot="prepend" class="map_inpTem">勘察点行政村人口总数：</template>
							<template slot="append">人</template>
						</el-input>
						<el-input v-model="form.adArea" auto-complete="off" class="map_inpWid">
							<template slot="prepend" class="map_inpTem">勘察点行政村行政面积：</template>
							<template slot="append">亩</template>
						</el-input>
						<el-input v-model="form.plantArea" auto-complete="off" class="map_inpWid">
							<template slot="prepend" class="map_inpTem">勘察点行政村实际种植面积：</template>
							<template slot="append">亩</template>
						</el-input>
					</el-form-item>
					<el-form-item label="受灾情况" :label-width="formLabelWidth" v-show="form.region==2">
						<el-input v-model="form.diaasterArea" auto-complete="off" class="map_inpWid">
							<template slot="prepend" class="map_inpTem">勘察点受灾面积：</template>
							<template slot="append">人</template>
						</el-input>
						<el-input v-model="form.disasterScale" auto-complete="off" class="map_inpWid">
							<template slot="prepend" class="map_inpTem">勘察点受灾比例：</template>
							<template slot="append">%</template>
						</el-input>
						<el-input v-model="form.reduction" auto-complete="off" class="map_inpWid">
							<template slot="prepend" class="map_inpTem">勘察点减产比例：</template>
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="勘察描述" :label-width="formLabelWidth">
						<el-input v-model="form.desc" auto-complete="off" placeholder="请具体描述" autosize type="textarea"></el-input>
					</el-form-item>
				</el-form>
				<!-- 需要上传的数据 -->
				<span class="map_spde">需要上传的数据:</span>
				<div class="map_upq" v-show="form.region!=3">
					<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileListf" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">1.勘察点标的经纬度示意图</el-button>
					</el-upload>
					<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileLists" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">2.勘察点农作物照片</el-button>
					</el-upload>
				</div>
				<div class="map_upq" v-show="form.region==3">
					<span>样方边界一：</span>
					<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileListf1" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">1.勘察点标的经纬度示意图</el-button>
					</el-upload>
					<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileLists1" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">2.勘察点农作物照片</el-button>
					</el-upload>
					<span>样方边界二：</span>
					<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileListf2" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">1.勘察点标的经纬度示意图</el-button>
					</el-upload>
					<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileLists2" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">2.勘察点农作物照片</el-button>
					</el-upload>
					<span>样方边界三：</span>
					<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileListf3" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">1.勘察点标的经纬度示意图</el-button>
					</el-upload>
					<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileLists3" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">2.勘察点农作物照片</el-button>
					</el-upload>
					<span>样方边界四：</span>
					<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileListf4" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">1.勘察点标的经纬度示意图</el-button>
					</el-upload>
					<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileLists4" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">2.勘察点农作物照片</el-button>
					</el-upload>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				</div>
			</el-dialog>
		</template>
  	</baidu-map>
</template>
<style>
	.map {
	  width: 100%;
	  height: 100%;
	}
	.map_upq{
		padding: 10px;
	}
	.map_spde{
		padding: 10px;
	}
	.upload-demo{
		margin-bottom: 10px;
	}
	.map_inpWid{
		width: 400px;
	}
	.map_inpTem{
		width: 210px;
	}
</style>
<script>
	import {BmlMarkerClusterer} from 'vue-baidu-map';
	var map_router = null;
	export default {
	  	data () {
			// 引入表中的坐标
			var mapMarkers = this.$route.params;
			const markers = [];
			for (let i = 0; i < mapMarkers.length; i++) {
				const position = {lng: mapMarkers[i].el, lat: mapMarkers[i].nl, title: mapMarkers[i].city+mapMarkers[i].town+mapMarkers[i].country};
				markers.push(position);
				map_router = markers;
			}
			return {
				map_router,
				dialogFormVisible: false,
		        form: {
		          name: '',
		          region: '0',
		          date: '',
		          type: '0',
		          plantArea: '',
		          adArea: '',
		          population: '',
		          desc: '',
		          disaster: '',
		          diaasterArea: '',
		          disasterScale: '',
		          reduction: ''
		        },
	       		formLabelWidth: '90px',
	       		fileListf: [],
	       		fileLists: [],
	       		fileListf1: [],
	       		fileLists1: [],
	       		fileListf2: [],
	       		fileLists2: [],
	       		fileListf3: [],
	       		fileLists3: [],
	       		fileListf4: [],
	       		fileLists4: []
			}
	  	},
	  	components:{
		   BmlMarkerClusterer
		},
		methods:{
			mapClick(i){
				console.log(i);
				this.form.name = i.title;
				// this.form.region = '';
				this.fileListf = [];
				this.fileLists = [];
				this.dialogFormVisible = true;
			},
			 handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            qwe(a,b,c){
            	// console.log(a,b,c);
            }
		}
	}
</script>