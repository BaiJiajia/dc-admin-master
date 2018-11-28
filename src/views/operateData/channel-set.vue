<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item label="渠道名称：">
                    <el-input type="text" v-model="filters.cnlName" placeholder="渠道名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  v-on:click="getChannelList">查询</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button type="primary"  v-on:click="handleNew">新增渠道</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="Channels" highlight-current-row v-loading="listLoading">
            <el-table-column type="index" width="100">
            </el-table-column>
            <el-table-column prop="times" label="创建时间" min-width="150" sortable>
            </el-table-column>
            <el-table-column prop="cnlName" label="渠道名称" min-width="100">
            </el-table-column>
            <el-table-column prop="cnlIndex" label="渠道编号" min-width="100">
            </el-table-column>
            <el-table-column prop="tips" label="备注" min-width="100">
            </el-table-column>
            <el-table-column prop="qrcode" label="二维码" min-width="150">
            </el-table-column>
            <el-table-column prop="url" label="url" min-width="150">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--<router-link :to="{path:'new-user-detail',query:{ id:scope.row.id }}" class="around">查看详情</router-link>-->
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--新增渠道-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="渠道名称"  prop="cnlName">
                    <el-select v-model="addForm.cnlName" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送内容" prop="tips">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入推送内容"
                            v-model="addForm.tips">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="渠道名称"  prop="cnlName">
                    <el-select v-model="editForm.cnlName" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送内容" prop="tips">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入推送内容"
                            v-model="editForm.tips">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
    <!--详情页-->
</template>
<script>
    import util from '../../common/js/util'
    import { getChannel,addChannel,editChannel } from '../../api/api';
    export default {
        data() {
            return {
                filters: {
                    cnlName: '',
                },
                options:[
                    {value: '全部', label: '全部'},
                    {value: '百度', label: '百度'},
                    {value: '360', label: '360'},
                ],
                Channels:[],
                total: 0,
                page: 1,
                listLoading: false,
                editLoading: false,
                addLoading: false,
                addFormVisible: false,//新增界面是否显示
                editFormVisible: false,//编辑界面是否显示
                //编辑界面数据
                editForm: {
                    id:0,
                    cnlName: '',
                    tips:''
                },
                addForm :{
                    cnlName: '',
                    tips:''
                },
                editFormRules: {
                    cnlName: [
                        { required: true, message: '请选择渠道', trigger: 'blur' }
                    ]
                },
                addFormRules: {
                    cnlName: [
                        { required: true, message: '请选择渠道', trigger: 'blur' }
                    ]
                },
                //        时间区间选择
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }],
//            events:[{
//                change(){
//                    alert(123)
//                }
//            }]
                },
            }
        },

        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getChannelList();
            },
            getChannelList:function() {


                let para = {
                    page: this.page,
                    cnlName:this.filters.cnlName
                };
                this.listLoading = true;
                getChannel(para).then((res) => {
                    this.total = res.data.total;
                    this.Channels = res.data.Channels;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            // 打开新增页面
            handleNew:function () {
                this.addFormVisible = true;
                this.addForm = {
                    cnlName: '',
                    tips:''
                };
            },
            //新增提交
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            addChannel(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getChannelList();
                            });
                        });
                    }
                });
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            editChannel(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getChannelList();
                            });
                        });
                    }
                });
            },
        },
        mounted(){
            this.getChannelList()
        },
        computed:{
        },
        watch:{

        }
    }
</script>

<style scoped>
</style>