<template>
  <div class="mavonEditor">
    <no-ssr>
      <mavon-editor ref="md" :toolbars="markdownOption" @change="contentChange" @imgAdd="imgAdd" @imgDel="imgDel" v-model="content"/>
    </no-ssr>
  </div>
</template>
<script>
  import { upload,del } from "@/api/api.js"
  export default {
    props: {
      goodsDetailContent: {
        type: String,
        default: "#### 在这里将您的宝贝描述的更漂亮一些吧"
      }
    },
    data() {
      return {
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          //save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        content: this.goodsDetailContent
      };
    },
    methods: {
        contentChange(){
          this.$emit('editorChange',this.content)
        },
        // 绑定@imgAdd event
        imgAdd(pos, file){
          console.log('图片上传')
          // 第一步.将图片上传到服务器.
          var formdata = new FormData()
          formdata.append('uploadFile', file)
          upload(formdata)
            .then(res => {
              let url = res.data.url
              console.log('图片地址',url)
              // $vm 不行
              this.$refs.md.$img2Url(pos, url)
              this.$emit('addImg', url)
            })
            .catch(e => {})
        },
        imgDel(fileName){
          del({fileNames: fileName})
            .then(res => {
              console.log('图片删除结果', res)
              if(res.data.success){
                console("图片删除成功", res)
              }else{
                console.log("图片删除失败", res)
              }
            })
            .catch(err => {
              console.log('图片删除异常', res)
            })
        }
    },
  };
</script>

<style  scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>