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
                <el-form-item label="订单类型：">
                    <el-select v-model="filters.orderType" placeholder="请选择订单类型">
                        <el-option
                                v-for="item in orderTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  v-on:click="getUserOrderList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="UserOrders" highlight-current-row v-loading="listLoading">
            <el-table-column type="index" width="100">
            </el-table-column>
            <el-table-column prop="times" label="借款时间" min-width="200" sortable>
            </el-table-column>
            <el-table-column prop="number" label="手机号码" min-width="200">
            </el-table-column>
            <el-table-column prop="applyLoan" label="申请小贷" min-width="200">
            </el-table-column>
            <el-table-column prop="returnLoan" label="还款小贷" min-width="200">
            </el-table-column>
            <el-table-column prop="howmoney" label="借款金额" min-width="200" sortable>
            </el-table-column>
            <el-table-column prop="deadline" label="借款期限" min-width="200" sortable>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>
<script>
    import util from '../../common/js/util'
    import { getUserOrder } from '../../api/api';
    export default {
        data() {
            return {
                filters: {
                    timeValue: '',
                    number: '',
                    orderType: '',
                },
                orderTypes:[
                    {value:'type1',label:'类型1'},
                    {value:'type2',label:'类型2'},
                    {value:'type3',label:'类型3'},
                ],

                UserOrders:[],
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
                this.getUserOrderList();
            },
            getUserOrderList:function() {
                let start = this.filters.timeValue[0];
                let end = this.filters.timeValue[1];
                start = this.GMT2Str(start);
                end = this.GMT2Str(end);
                let para = {
                    page: this.page,
                    times: [start,end],
                    number:this.filters.number,
                    orderType:this.filters.orderType
                };
                this.listLoading = true;
                getUserOrder(para).then((res) => {
                    this.total = res.data.total;
                    this.UserOrders = res.data.UserOrders;
                    this.listLoading = false;
                    //NProgress.done();
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
            this.getUserOrderList()
        },
        computed:{
        },
        watch:{

        }
    }
</script>

<style scoped>
</style>