<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="upload-container">
          <el-upload
            class="upload-demo"
            name="uploadFile"
            :action="imageUploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            multiple
            :limit="5"
            :on-exceed="handleExceed"
            :file-list="imageList">
            <el-button size="medium" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="image-wrapper">
          <el-card class="swipper-card" v-for="item in imageList" :key="item.name">
            <h3>{{item.name}}</h3>
            <img :src="item.url" style="max-width: 100%;height: auto;"/>
          </el-card>
        </div>          
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { del } from '@api'
  export default {
    props: {
      fileList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        imageList: this.fileList,
        imageUploadUrl: 'http://admin.lovingliu.cn/lovingmall/adminGoods/imageUpload'
      }
    },
    methods: {
      /**
       * 文件列表移除文件时
       */
      handleRemove(file, fileList) {
        let delImages = new Array(file.name)
        if(delImages.length > 0){
          del({fileNames: delImages}).then(res => {
            console.log('轮播图删除成功', res)
            this.$emit('fileDelete', file.name)
          })
        }
        console.log(file, fileList);
      },
      /**
       * 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
       */
      handlePreview(file) {
        console.log(file);
      },
      /**
       * 超出limit限制的行为
       */
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      /**
       * 文件上传成功之后的回调
       */
      handleSuccess(res,file,fileList) {
        let url = res.data.url
        const start = url.lastIndexOf("/") + 1
        const fileName = url.substr(start)
        let fileObj = {
          name: fileName,
          url: url
        }
        console.log('fileObj',fileObj)
        this.imageList.push(fileObj)
        this.$emit('fileAdd', fileName)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>