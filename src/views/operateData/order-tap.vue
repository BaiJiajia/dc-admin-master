<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item label="产品筛选：">
                    <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">全选</el-checkbox>
                    <el-checkbox-group v-model="filters.checkedProduct" @change="handleCheckedProduct" >
                        <el-checkbox v-for="product in allProduct" :label="product" :key="product">{{product}}</el-checkbox>
                    </el-checkbox-group>
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
                <el-form-item label="平台筛选：">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="filters.checkedPlateform" @change="handleCheckedPlateform" >
                        <el-checkbox v-for="plateform in allPlateform" :label="plateform" :key="plateform">{{plateform}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  v-on:click="getOrderList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="OrderTap" highlight-current-row v-loading="listLoading" show-summary>
            <el-table-column type="index" width="100">
            </el-table-column>
            <el-table-column prop="times" label="时间" width="220" sortable>
            </el-table-column>
            <el-table-column prop="shenxian" label="神仙贷款" width="120" sortable>
            </el-table-column>
            <el-table-column prop="chaoji" label="超级贷款" width="120" sortable>
            </el-table-column>
            <el-table-column prop="henkuai" label="很快贷款" width="120" sortable>
            </el-table-column>
            <el-table-column prop="keyi" label="可以贷款" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="summary" label="总计" width="120" sortable>
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
    import { getOrderTap } from '../../api/api';
    const pfOptions = ['APP','H5'];
    const productOtions = ['超级贷款','很快贷款','可以贷','神仙贷款'];
    export default {
        data() {
            return {
                filters: {
                    timeValue: '',
                    checkedPlateform: [],
                    checkedProduct: [],
                },
                //平台筛选开始
                checkAll: false,
                allPlateform: pfOptions,
                isIndeterminate: true,
                //平台筛选结束
                //产品筛选开始
                checkAll1: false,
                allProduct: productOtions,
                isIndeterminate1: true,
                //产品筛选结束
                OrderTap:[],
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
                this.getOrderList();
            },
            getOrderList:function() {
                let start = this.filters.timeValue[0];
                let end = this.filters.timeValue[1];
                start = this.GMT2Str(start);
                end = this.GMT2Str(end);
                let para = {
                    page: this.page,
                    times: [start,end],
                    checkedPlateform:this.filters.checkedPlateform,
                    checkedProduct:this.filters.checkedProduct
                };
                this.listLoading = true;
                getOrderTap(para).then((res) => {
                    this.total = res.data.total;
                    this.OrderTap = res.data.OrderTap;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            handleCheckAllChange(valu) {//平台筛选的全选
                this.filters.checkedPlateform = this.checkAll ? pfOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedPlateform(value) {//平台筛选的单个选择
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.allPlateform.length;//是否全选
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.allPlateform.length;//未全选时，可点击全选
            },
            handleCheckAllChange1(valu) {//产品筛选的全选
                this.filters.checkedProduct = this.checkAll1 ? productOtions : [];
                this.isIndeterminate1 = false;
            },
            handleCheckedProduct(value) {//产品筛选的单个选择
                let checkedCount = value.length;
                this.checkAll1 = checkedCount === this.allProduct.length;//是否全选
                this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.allProduct.length;//未全选时，可点击全选
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
            this.getOrderList()
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