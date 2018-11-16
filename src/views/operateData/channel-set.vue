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
                    <el-button type="primary" size="small" >编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--<router-link :to="{path:'new-user-detail',query:{ id:scope.row.id }}" class="around">查看详情</router-link>-->
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
    <!--详情页-->
</template>
<script>
    import util from '../../common/js/util'
    import { getChannel } from '../../api/api';
    export default {
        data() {
            return {
                filters: {
                    cnlName: '',
                },

                Channels:[],
                total: 0,
                page: 1,
                listLoading: false,
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
            handleNew:function () {
                console.log(1)
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