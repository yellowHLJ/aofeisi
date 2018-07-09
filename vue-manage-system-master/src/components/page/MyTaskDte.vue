<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>我的任务详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" @click="mapData" class='base_but'>显示在地图上<i class="el-icon-location-outline el-icon--right"></i></el-button>
            </div>
            <el-table :data="data" border stripe style="width: 100%" ref="multipleTable" class="base_table" @row-click="myTaskCl">
            	<el-table-column type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="num" label="区号" >
                </el-table-column>
                <el-table-column prop="city" label="市县" >
                </el-table-column>
                <el-table-column prop="town" label="乡镇">
                </el-table-column>
                <el-table-column prop="country" label="村寨" >
                </el-table-column>
                <el-table-column prop="el" label="经度" >
                </el-table-column>
                <el-table-column prop="nl" label="纬度">
                </el-table-column>
                <el-table-column prop="group" label="小组" :formatter="formatter">
                </el-table-column>
                <el-table-column label="状态" width="90" fixed="right"  :filters="[{ text: '已完成', value: '1' }, { text: '未完成', value: '0' }]" :filter-method="filterTag" filter-placement="bottom-end" prop='value'>
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.statue === '1' ? 'success' : 'warning'" disable-transitions>{{scope.row.statue === '1' ? '已完成' : '未完成'}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
		    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 100, 200]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="dataLength" class='detail_pag'>
		    </el-pagination>
        </div>
    </div>
</template>

<script>
    //引入本地的json文件
    import detaiData from '../../../static/detail'
    export default {
        name: 'detailedData',
        data() {
            return {
                url: './../##',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_word: '',
                del_list: [],
                is_search: false,
                base_but: false,
                delVisible: false,
                form: {
                    num: '',
                    city: '',
                    town: '',
                    country: '',
                    el: '',
                    nl: '',
                },
                idx: -1,
                dataLength:0,
                fileList: [],
                currentPage: 4,
                title: "zegnjai",
				value:''
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.city === this.del_list[i].city) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if ((d.city.indexOf(this.select_word) > -1 ||
                                d.town.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };
                // this.$axios.post(this.url, {
                //     page: this.cur_page
                // }).then((res) => {
                //     this.tableData = res.data.list;
                //     this.dataLength = res.data.list.length?res.data.list.length:10;
                // })
                this.tableData = detaiData.list;
                this.dataLength = detaiData.list.length?detaiData.list.length:10;
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
          		let rowMs = row.group;
            	switch(rowMs){
            		case "1":
            		rowMs = "第一组";
            		break;
            		case "2":
            		rowMs = "第二组";
            		break;
                    case "3":
                    rowMs = "第三组";
                    break;
                    case "4":
                    rowMs = "第四组";
                    break;
                    case "5":
                    rowMs = "第五组";
                    break;
            		default:
            		rowMs = '未分组';
            	}
                return rowMs;
            },
            filterTag(value, row) {
                // console.log(row,value);
                return row.statue === value;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
			},
            mapData(){
                // console.log(this.data);
                this.$router.push({path:"/MapProspect",params:this.data,name:"MapProspect"});
            },
            myTaskCl(row){
                console.log(row);
                if(row.statue == "1"){
                    this.$router.push({path:"/ViewDetail",params:row,name:"ViewDetail"});
                }else{
                    this.$alert('勘察点暂无信息，请先导入信息', '提示', { confirmButtonText: '确定'});
                }
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .base_but{
        float: right;
        margin-right: 20px;
    }
    .base_table{
        cursor: pointer;
    }
    .container{
    	overflow: hidden;
    }
    .detail_pag{
    	float: right;
    	margin: 5px;
    }
</style>
