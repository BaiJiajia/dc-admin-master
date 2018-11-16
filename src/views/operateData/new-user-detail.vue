<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar detailbar " style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item label="手机号：">
                    <div>13212341234</div>
                </el-form-item>
                <el-form-item label="渠道来源：">
                    <div>天使投资</div>
                </el-form-item>
                <el-form-item style="padding-right: 0;float:right;">
                    <el-button type="primary"  v-on:click="returnList">返回列表</el-button>
                </el-form-item>
            </el-form>
            <!--<el-row type="flex" class="row-bg" :inline="true">-->
                <!--<el-col :span="6" label="手机号："><div class="grid-content ">13212341234</div></el-col>-->
                <!--<el-col :span="6" label="渠道来源："><div class="grid-content ">天使投资</div></el-col>-->
            <!--</el-row>-->
        </el-col>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
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
            <el-table-column prop="applyLoan" label="申请小贷" min-width="200">
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
                },
                id:'',//详情id
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
            returnList:function(){
                this.$router.go(-1)
            },
            getUserOrderList:function() {
                this.id = this.$route.query.id;
                console.log(this.id)
                let start = this.filters.timeValue[0];
                let end = this.filters.timeValue[1];
                start = this.GMT2Str(start);
                end = this.GMT2Str(end);
                let para = {
                    page: this.page,
                    times: [start,end]
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
        created(){
            this.getUserOrderList()
        },
        mounted(){
            //this.getUserOrderList()
        },
        computed:{
        },
        watch:{

        }
    }
</script>

<style scoped>
    .detailbar .el-form-item{padding-right: 100px}
</style>