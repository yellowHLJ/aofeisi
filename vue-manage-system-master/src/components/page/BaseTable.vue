<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>勘察信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" @click="inputData" class='base_but'>导入<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
            <el-table :data="data" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" class="base_table" @cell-click="base_cellC">
                <el-table-column prop="date" label="日期" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="任务" width="120">
                    <template slot-scope="scope">
                        <p style="color:#409EFF">{{ scope.row.name }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="data" label="详情" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="total" label="勘察数量" >
                </el-table-column>
                <el-table-column label="操作" width="90">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="dataLength">
                </el-pagination>
            </div>
        </div>

        <!-- 导入弹出框 -->
        <el-dialog title="导入" :visible.sync="base_but" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="任务">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="详情" >
                    <el-input v-model="form.data" type='textarea' autosize></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="total" :rules="[{ required: true, message: '不能为空'},{ type: 'number', message: '必须为数字值'} ]">
                    <el-input v-model.number="form.total" type='total' clearable></el-input>
                </el-form-item>
            </el-form>
            <!-- 上传 -->
            <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">请选取需要上传的文件，内容且不超过500kb</div>
            </el-upload>
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
    import detaiData from '../../../static/vuetable'
    export default {
        name: 'basetable',
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
                    name: '',
                    date: '',
                    data: '',
                    total: ''
                },
                idx: -1,
                dataLength:0,
                fileList: []          }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if ((d.name.indexOf(this.select_word) > -1 ||
                                d.data.indexOf(this.select_word) > -1)
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
                return row.data;
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
            inputData(){
                this.base_but = true;
            },
            inputDataY(){
                this.base_but = false;
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            base_cellC(row, column, cell, event){
                if(column.label=="任务"){ 
                    this.$router.push("/detailedData");
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
</style>
