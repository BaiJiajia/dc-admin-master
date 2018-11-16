<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item label="用户手机号：">
                    <el-input type="number" v-model="filters.number" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="日期筛选：">
                    <el-date-picker
                            v-model="filters.timeValue"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="渠道筛选：">
                    <el-select v-model="filters.channel" placeholder="请选择渠道来源">
                        <el-option
                                v-for="item in channelTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  v-on:click="getUsersList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="NewUsers" highlight-current-row v-loading="listLoading">
            <el-table-column type="index" width="100">
            </el-table-column>
            <el-table-column prop="times" label="注册时间" width="300" sortable>
            </el-table-column>
            <el-table-column prop="number" label="手机号码" width="300">
            </el-table-column>
            <el-table-column prop="channel" label="渠道来源" min-width="120">
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="openDetail(scope.row)">查看详情</el-button>
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
    import { getNewUser } from '../../api/api';
    export default {
        data() {
            return {
                filters: {
                    timeValue: '',
                    number: '',
                    channel: '',
                },
                channelTypes:[
                    {value:'type1',label:'渠道1'},
                    {value:'type2',label:'渠道2'},
                    {value:'type3',label:'渠道3'},
                ],

                NewUsers:[],
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
                this.getUsersList();
            },
            getUsersList:function() {
                let start = this.filters.timeValue[0];
                let end = this.filters.timeValue[1];
                start = this.GMT2Str(start);
                end = this.GMT2Str(end);
                let para = {
                    page: this.page,
                    times: [start,end],
                    number:this.filters.number,
                    channel:this.filters.channel
                };
                this.listLoading = true;
                getNewUser(para).then((res) => {
                    this.total = res.data.total;
                    this.NewUsers = res.data.NewUsers;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            openDetail:function (row) {
                this.$router.push({path:'newUserDetail',query:{id:row.id}});
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
            this.getUsersList()
        },
        computed:{
        },
        watch:{

        }
    }
</script>

<style scoped>
</style>