<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
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
                    <el-button type="primary"  v-on:click="getTapData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="BannerTap" highlight-current-row v-loading="listLoading" show-summary>
            <el-table-column type="index" width="100">
            </el-table-column>
            <el-table-column prop="times" label="时间" width="220" sortable>
            </el-table-column>
            <el-table-column prop="banner1" label="banner1" width="120" sortable>
            </el-table-column>
            <el-table-column prop="banner2" label="banner2" width="120" sortable>
            </el-table-column>
            <el-table-column prop="banner3" label="banner3" min-width="120" sortable>
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
    import { getBannerTap } from '../../api/api';
export default {
  data() {
    return {
        filters: {
            timeValue: ''
        },
        BannerTap:[],
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
          this.getTapData();
      },
      getTapData:function() {
          let start = this.filters.timeValue[0];
          let end = this.filters.timeValue[1];
          start = this.GMT2Str(start);
          end = this.GMT2Str(end);
          let para = {
              page: this.page,
              times: [start,end]
          };
          this.listLoading = true;
          getBannerTap(para).then((res) => {
              this.total = res.data.total;
              this.BannerTap = res.data.BannerTap;
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
        this.getTapData()
    },
  computed:{
  },
  watch:{

  }
}
</script>