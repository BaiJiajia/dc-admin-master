<template>
    <section>
        <!--列表-->
        <el-table :data="feedBackList" highlight-current-row v-loading="listLoading">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="time" label="时间" width="200" sortable>
            </el-table-column>
            <el-table-column prop="content" label="反馈内容" min-width="200">
            </el-table-column>
            <el-table-column prop="number" label="用户手机号" width="200">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="180" >
                <div v-if="isDone">已处理</div>
                <div v-else>未处理</div>
            </el-table-column>
            <el-table-column prop="" label="操作" width="120">
                <template scope="scope">
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <el-button  type="primary" size="small" disabled v-if="isDone">回复</el-button>
                    <el-button  type="primary" size="small" @click="handleReply(scope.$index, scope.row)" v-else>回复</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--回复界面-->
        <el-dialog title="回复" v-model="replyVisible" :close-on-click-modal="false">
            <el-form :model="replyForm" label-width="100px" :rules="replyRules" ref="replyForm">
                <el-form-item label="回复内容:" prop="replyment">
                    <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入推送内容（300字以内）"
                            v-model="replyForm.replyment">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="replyVisible = false">取消</el-button>
                <el-button type="primary" @click.native="replySubmit" :loading="replyLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    import util from '../../common/js/util'
    import { getfeedBack,addReplyment} from '../../api/api';
    export default {
        data() {
            return {
                feedBackList:[],
                total: 0,
                page: 1,
                replyForm:{
                    id:0,
                    replyment:''
                },
                isDone:false,
                listLoading: false,
                replyLoading:false,
                replyVisible: false,//回复界面是否显示
                replyRules: {
                    replyment: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ]
                },
            }
        },

        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getfeedBackList();
            },
            getfeedBackList:function() {
                let para = {
                    page: this.page
                };
                this.listLoading = true;
                getfeedBack(para).then((res) => {
                    this.total = res.data.total;
                    this.feedBackList = res.data.feedBackList;
                    this.listLoading = false;
                    //NProgress.done();
                });

            },
            //显示回复界面
            handleReply: function (index, row) {
                this.replyVisible = true;
                this.replyForm = Object.assign({}, row);
            },

            //回复
            replySubmit: function () {
                this.$refs.replyForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.replyLoading = true;
                            let para = Object.assign({}, this.replyForm);
                            addReplyment(para).then((res) => {
                                this.replyLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['replyForm'].resetFields();
                                this.replyVisible = false;
                                this.isDone = true;
                                this.getfeedBackList();

                            });
                        });
                    }
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
            this.getfeedBackList()
        },
        computed:{
        },
        watch:{

        }
    }
</script>