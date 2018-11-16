<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="messageList" highlight-current-row v-loading="listLoading">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="time" label="时间" width="200" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="200">
            </el-table-column>
            <el-table-column prop="content" label="推送内容" min-width="250">
            </el-table-column>
            <el-table-column prop="targetPeople" label="推送人群" width="180" >
            </el-table-column>
            <el-table-column prop="pushStatus" label="推送状态" width="120" >
            </el-table-column>
            <el-table-column prop="" label="操作" width="120">
                <template scope="scope">
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="推送时间" prop="time">
                    <el-date-picker
                            v-model="addForm.time"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="推送标题" prop="title">
                    <el-input v-model="addForm.title" placeholder="请输入推送标题（20字以内）" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="推送内容" prop="content">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入推送内容"
                            v-model="addForm.content">
                    </el-input>
                </el-form-item>
                <el-form-item label="推送人群"  prop="targetPeople">
                    <el-select v-model="addForm.targetPeople" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    import util from '../../common/js/util'
    import { getPushMessage,removePushMessage,addPushMessage} from '../../api/api';
    export default {
        data() {
            return {
                messageList:[],
                total: 0,
                page: 1,
                options:[
                    {value: '全部', label: '全部'},
                    {value: '七日内活跃用户', label: '七日内活跃用户'},
                    {value: '半月内活跃用户', label: '半月内活跃用户'},
                ],
                addForm :{
                    time: '',
                    title: '',
                    content: '',
                    targetPeople: ''
                },
                listLoading: false,
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    time: [
                        { required: true, message: '请选择时间', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ],
                },
            }
        },

        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getPushMessage();
            },
            getMessageList:function() {
                let para = {
                    page: this.page
                };
                this.listLoading = true;
                getPushMessage(para).then((res) => {
                    this.total = res.data.total;
                    this.messageList = res.data.messageList;
                    this.listLoading = false;
                });

            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    time: '',
                    title: '',
                    content: '',
                    targetPeople: ''
                };
            },
            //新增
            addSubmit: function () {
                this.addForm.time = this.GMT2Str(this.addForm.time);
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            addPushMessage(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getMessageList();
                            });
                        });
                    }
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    console.log(para)
                    removePushMessage(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getMessageList();
                    });
                }).catch(() => {

                });
            },

            GMT2Str:function (time) {//标准时间转化为日期格式
                let date = new Date(time)
                let Str=date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate() + ' ' +
                    date.getHours() + ':' +
                    date.getMinutes() + ':' +
                    date.getSeconds();
                return Str

            }
        },
        mounted(){
            this.getMessageList()
        },
        computed:{
        },
        watch:{

        }
    }
</script>