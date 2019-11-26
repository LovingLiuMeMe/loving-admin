<template>
  <div class="product-detail">
    <el-row :gutter="20">
      <el-steps :active="active" align-center>
        <el-step  title="步骤1" description="设置商品的普通信息"></el-step>
        <el-step  title="步骤2" description="编辑商品的附文本信息"></el-step>
        <el-step  title="步骤3" description="设置商品详情页轮播图"></el-step>
        <el-step  title="步骤4" description="编辑商品的配置详情"></el-step>
      </el-steps>
    </el-row>
    <!-- 商品普通信息修改-->
    <el-row :gutter="20" v-if="active == 1">
      <el-col :span="12" :offset="2">
        <el-form :label-position="goodsInfo" label-width="100px" :model="formLabelAlign">
          <el-form-item label="商品名称">
            <el-input v-model="goodsInfo.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="goodsInfo.goodsCategoryId" placeholder="请选择商品分类">
              <el-option v-for="item in categoryList" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品介绍">
            <el-input type="textarea" v-model="goodsInfo.goodsIntro"></el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model="goodsInfo.originalPrice"></el-input>
          </el-form-item>
          <el-form-item label="商品售价">
            <el-input v-model="goodsInfo.sellingPrice"></el-input>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input v-model="goodsInfo.stockNum"></el-input>
          </el-form-item>
          <el-form-item label="商品销售状态">
            <el-input v-model="goodsInfo.goodsSellStatus"></el-input>
          </el-form-item>        
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-upload
          class="avatar-uploader"
          name="uploadFile"
          :action="imageUploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="goodsInfo.goodsCoverImg" :src="goodsInfo.goodsCoverImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>点击上传商品头像</p>
      </el-col>
      <el-col>
        <el-button @click="nextStep" type="text">下一步</el-button>
      </el-col>
    </el-row>
    <!-- 商品富文本信息修改-->
    <el-row :gutter="20" v-if="active == 2">
      <Editor :goodsDetailContent="goodsInfo.goodsDetailContent" @editorChange="detailContentChange"/>
      <el-col>
        <el-button @click="prevStep" type="text">上一步</el-button>
        <el-button @click="nextStep" type="text">下一步</el-button>      
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="active == 3">
      <UploadSwipper :goodsCarousel="goodsInfo.goodsCarousel" @addStep="nextStep" @reduceStep="prevStep" @modifyCarousel="updateCarousel"/>
    </el-row>
    <el-row :gutter="20" v-if="active == 4">
      <ConfigParam @reduceStep="prevStep" @mofidyConfigParam="updateConfigParam" @handleSaveGoodsInfo="saveGoodsInfo" :configParams="goodsInfo.configParam"/>
    </el-row>
  </div>
</template>

<script>
import {get,post} from '@/api/request';
import {del} from '@/api/api'

import Editor from './components/Editor';
import UploadSwipper from './components/UploadSwipper';
import ConfigParam from './components/ConfigParam'

export default {
  components: {
    Editor,
    UploadSwipper,
    ConfigParam
  },
  data () {
    return {
      active: 1,
      labelPosition: 'left',
      goodsInfo: {
        goodsCoverImg: ''
      },
      oldImages:[],
      categoryList:[],
      categoryName:'',
      imageUploadUrl: 'http://admin.lovingliu.cn/lovingmall/adminGoods/imageUpload'
    }
  },
  created(){
    this.goodsInfo.goodsId = this.$route.query.goods_id;
    if(this.goodsInfo.goodsId){
      this.info();
    }
    this.categorys();
  },
  methods: {
    // 获得商品详情
    info(){
      get("adminGoods/info",{
        GoodsInfoId: this.goodsInfo.goodsId
      }).then(res => {
        this.goodsInfo = res.data
      })
    },
    // 获得分类
    categorys(){
      get("adminCategory/list").then(res => {
        console.log('res',res)
        this.categoryList = res.data
      })
    },
    // 下一步
    nextStep() {
      this.active ++
    },
    // 上一步
    prevStep() {
      this.active --
    },
    // 保存商品信息
    saveGoodsInfo(configParam){
      // todo 登录功能实现
      this.goodsInfo.createUser = 2
      this.goodsInfo.updateUser = 2
      this.goodsInfo.configParam = configParam
      console.log(this.goodsInfo)
      post('adminGoods/save',this.goodsInfo).then(res => {
        console.log('res save',res)
      })
    },
    // 商品信息富文本
    detailContentChange(val) {
      if(val) {
        this.goodsInfo.goodsDetailContent = val
      }
    },
    // 商品头像上传回调
    handleAvatarSuccess(res, file) {
      console.log('res---',res)
      this.goodsInfo.goodsCoverImg = res.data.url;

      console.log(this.goodsInfo);
      const start = this.goodsInfo.goodsCoverImg.lastIndexOf("/") + 1;
      this.oldImages.push(this.goodsInfo.goodsCoverImg.substr(start))
    },
    // 商品头像上传拦截
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message('error','上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message('error','上传头像图片大小不能超过 2MB!')
      }
      if(isJPG && isLt2M){
        // 处理
        if(this.oldImages.length > 0){
          del({fileNames: this.oldImages}).then(res => {
            console.log('参与图片头像删除成功', res)
          })
        }
      }
      return isJPG && isLt2M;
    },
    // 修改商品轮播图
    updateCarousel(carousel) {
      this.goodsInfo.goodsCarousel = carousel
    },
    // 更新商品配置信息
    updateConfigParam(configParam) {
      this.goodsInfo.ConfigParam = configParam
    }
  }
}

</script>
<style lang='scss'>
.product-detail{
  padding: 40px;
  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
    }
  }
  .el-select {
    display: block;
  }
  .el-form-item__label {
    color: #606266;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-row{
  margin-top: 20px;
}
  
</style>