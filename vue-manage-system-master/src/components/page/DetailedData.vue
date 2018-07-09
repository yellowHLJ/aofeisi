<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>勘察信息详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" @click="inputData" class='base_but'>增加<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
            <el-table :data="data" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" class="base_table" >
            	<el-table-column type="selection" width="55"></el-table-column>
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
                <el-table-column prop="group" label="小组" sortable>
                <template slot-scope="scope">
					<el-select v-model="scope.row.group" @change="getValues" >
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
					</el-select>
				</template>
                </el-table-column>
                <el-table-column label="操作" width="180" fixed="right">
                    <template slot-scope="scope">
                    	<el-button size="small" type="primary" @click="inputData(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="dataLength">
                </el-pagination>
            </div> -->
		    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 100, 200]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="dataLength" class='detail_pag'>
		    </el-pagination>
        </div>

        <!-- 增加/修改弹出框 -->
        <el-dialog :title="title" :visible.sync="base_but" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="区号">
                	<el-input v-model="form.num" clearable></el-input>
                </el-form-item>
                <el-form-item label="市/县">
                    <el-input v-model="form.city" clearable></el-input>
                </el-form-item>
                <el-form-item label="乡镇" >
                    <el-input v-model="form.town" clearable></el-input>
                </el-form-item>
                <el-form-item label="村庄">
                    <el-input v-model="form.country" clearable></el-input>
                </el-form-item>
                <el-form-item label="经度">
                    <el-input v-model="form.el" clearable></el-input>
                </el-form-item>
                <el-form-item label="纬度">
                    <el-input v-model="form.nl"  clearable></el-input>
                </el-form-item>
                <el-form-item label="小组">
                    <el-input v-model="form.group"  clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="base_but = false">取 消</el-button>
                <el-button type="primary" @click="inputDataY">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
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
				options: [{
					value: '1',
					label: '第一组'
					}, {
					value: '2',
					label: '第二组'
					}, {
					value: '3',
					label: '第三组'
					}, {
                    value: '4',
                    label: '第四组'
                    }, {
                    value: '5',
                    label: '第五组'
                    }, {
					value: '0',
					label: '未分组'
				}],
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
            		default:
            		rowMs = '未分组';
            	}
                return rowMs;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            inputData(a,b){
            	this.title = "增加";
            	if(typeof a == "number"){
            		this.title = "编辑";
            		this.form = b;
            	}
                this.base_but = true;
            },
            inputDataY(){
                this.base_but = false;
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                // console.log(file, fileList);
            },
            handlePreview(file) {
                // console.log(file);
            },
            handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
			},
			getValues(){
				//小组改变时更改数据
				console.log(2);
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
