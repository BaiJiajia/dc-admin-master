<template>
    <section>
        <!--工具条-->
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
                <el-form-item label="渠道筛选：">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="filters.checkedChannel" @change="handleCheckedChannel" >
                        <el-checkbox v-for="channel in allChannel" :label="channel" :key="channel">{{channel}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  v-on:click="getSpreadData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="SpreadData" highlight-current-row v-loading="listLoading" show-summary>
            <el-table-column type="index" width="100">
            </el-table-column>
            <el-table-column prop="times" label="时间" width="220" sortable>
            </el-table-column>
            <el-table-column prop="cnlName" label="渠道名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="tapCount" label="点击数" width="120" sortable>
            </el-table-column>
            <el-table-column prop="tapPeople" label="点击人数" width="120" sortable>
            </el-table-column>
            <el-table-column prop="registCount" label="注册数" min-width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template scope="scope">
                    <el-button type="primary" size="small" >查看详情</el-button>
                </template>
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
    import { getSpread } from '../../api/api';
    const cnlOptions = ['腾讯','360','百度'];
    export default {
        data() {
            return {
                filters: {
                    timeValue: '',
                    checkedChannel: [],
                },
                //渠道筛选开始
                checkAll: false,
                allChannel: cnlOptions,
                isIndeterminate: true,
                SpreadData:[],
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
                this.getSpreadData();
            },
            getSpreadData:function() {
                let start = this.filters.timeValue[0];
                let end = this.filters.timeValue[1];
                start = this.GMT2Str(start);
                end = this.GMT2Str(end);
                let para = {
                    page: this.page,
                    times: [start,end],
                    checkedChannel:this.filters.checkedChannel
                };
                this.listLoading = true;
                getSpread(para).then((res) => {
                    this.total = res.data.total;
                    this.SpreadData = res.data.SpreadData;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            handleCheckAllChange(valu) {//渠道筛选的全选
                this.filters.checkedChannel = this.checkAll ? cnlOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedChannel(value) {//渠道筛选的单个选择
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.allChannel.length;//是否全选
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.allChannel.length;//未全选时，可点击全选
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
            this.getSpreadData()
        },
        computed:{
        },
        watch:{

        }
    }
</script>

<style scoped>
    .el-form-item{
        display: block;
    }
    .el-checkbox-group{
        display:inline-block;
        margin-left: 10px;
    }
</style>