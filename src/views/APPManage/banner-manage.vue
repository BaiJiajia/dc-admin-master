<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="addForm.title" placeholder="请输入标题（20字以内）" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="content">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="addForm.imageUrl" :src="addForm.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus
                        avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="链接地址"  prop="urlAddr">
                    <el-input v-model="addForm.urlAddr" placeholder="请输入链接地址" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序"  prop="sort">
                    <el-input v-model="addForm.sort" placeholder="banner排序" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click.native="addSubmit" :loading="addLoading">创建</el-button>
                    <el-button @click.native="resetForm" :loading="addLoading">清空</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--banner列表-->
        <el-col >
            <div class="card-wrap">
                <div class="card-box" :style="width" v-model="bannerList">
                    <el-card v-for="(item ,index) in bannerList" :body-style="{ padding: '10px' }">
                        <!--<img :src="item.imageUrl" class="image">-->
                        <div class="img-box"><img src="../../../src/assets/logo.png" class="image"></div>
                        <div style="padding: 14px;">
                            <div>{{item.title}}</div>
                            <div>{{item.urlAddr}}</div>
                            <div >排序:
                                <el-input :class={inputBorder:item.readOnly} v-model="item.sort" :readonly="item.readOnly"></el-input>
                            </div>
                            <div class="bottom clearfix">
                                <el-button type="text" @click.native="handleDelete(item.id)" class="button">删除</el-button>
                                <el-button type="text" v-show="item.readOnly" class="button" @click.native="editSort(index,item.id)">排序</el-button>
                                <el-button type="text" v-show="!item.readOnly" class="button" @click.native="submitSort(index,item.id)">完成</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-col>
    </section>
</template>
<script>
    import util from '../../common/js/util'
    import { getShowBanners,removeBanner,addBanner} from '../../api/api';
    export default {
        data() {
            return {
                bannerList:[],
                addForm :{
                    imageUrl: '',
                    title: '',
                    urlAddr: '',
                    sort: ''
                },
                width:'width:0',
                listLoading: false,
                addLoading: false,
                addFormRules: {
                    imageUrl: [
                        { required: true, message: '请上传图片', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ]
                },
            }
        },

        methods: {
            handleAvatarSuccess(res, file) {
                this.addForm.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG || !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG || isPNG && isLt2M;
            },
            handleCurrentChange(val) {
                this.getShowBannersList();
            },
            getShowBannersList:function() {
                let para = {

                };
                this.listLoading = true;
                getShowBanners(para).then((res) => {
                    this.total = res.data.total;
                    this.bannerList = res.data.bannerList;
                    for(let value of this.bannerList){
                        this.$set(value, 'readOnly', true)
                    }
                    this.width = 'width:'+this.bannerList.length*360+'px;';
                    this.listLoading = false;
                });


            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            addBanner(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getShowBannersList();
                            });
                        });
                    }
                });
            },
            handleDelete(val) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: val};
                    removeBanner(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getShowBannersList();
                    });
                }).catch(() => {
                });
            },
//            编辑排序
            editSort(index,id) {
                this.$set(this.bannerList[index],'readOnly',false)
            },
//            提交排序
            submitSort(index,id) {
                this.$set(this.bannerList[index],'readOnly',true);
            },
//            清空form
            resetForm:function () {
                this.$refs['addForm'].resetFields();
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
            this.getShowBannersList()
        },
        computed:{
        },
        watch:{

        }
    }
</script>
<style scoped>
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 278px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 278px;
        height: 178px;
        display: block;
    }
    .card-wrap{
        overflow: auto;
        border: 1px solid #ccc;
    }
   .card-box{
       overflow:hidden;
       width: auto;
   }
    .card-box .el-card{
        width: 300px;
        float: left;
        margin: 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
    }
    .img-box{
        width: 100%;
        height:200px;

    }
    .img-box img{
        width: 100%;
        height:100%;}


</style>
<style>
    .card-box .el-input{
        display: inline-block;width: 60px;
    }
    .inputBorder .el-input__inner{
        border:none;
    }
</style>