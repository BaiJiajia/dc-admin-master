<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item style="float:right;">
                    <!-- <el-button type="primary"  v-on:click="handleNew">创建小贷</el-button> -->
                </el-form-item>
            </el-form>
        </el-col>
        <div style="text-align: center">
          <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value4"
            filterable
            :titles="['未上线小贷', '已上线小贷']"
            :button-texts="['上线', '上线']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="data">
            <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
          </el-transfer>
        </div>
    </section>
</template>
<script>
    import util from '../../common/js/util'
    import { getAllLoan } from '../../api/api';
    export default {
        data() {
          return {
            data:[],
            // data: generateData(),
            value4: [1,14],
            renderFunc(h, option) {
              return `<span>{ option.key } - { option.label }</span>`;
            }
          };
        },
       
        methods: {
            handleChange(value, direction, movedKeys) {
              console.log(value, direction, movedKeys);
            },
            getAllLoanList:function() {
                getAllLoan().then((res) => {
                  console.table(res.data.allLoanList)
                    this.data = res.data.allLoanList
                });
            },
            handleNew:function () {
              console.log(1)
            },
            
        },
        mounted(){
            this.getAllLoanList()
        },
        computed:{
        },
        watch:{

        }
    }
</script>

<style scoped>
</style>