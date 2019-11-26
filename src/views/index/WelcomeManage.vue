<template>
  <div class="welcome-manage">
    <ImageUpload :fileList="fileList" @fileAdd="createWelcome" @fileDelete="deleteWelcome"/>
  </div>
</template>

<script>
import ImageUpload from '@/components/imageUpload/ImageUpload'
import { welcomeList, saveWelcome, delWelcome } from '@api'
export default {
  data () {
    return {
      fileList: [],
      welcomeList: []
    };
  },
  components:{
    ImageUpload
  },
  mounted(){
    this.getWelcomeImages()
  },
  methods: {
    getWelcomeImages() {
      welcomeList().then(res => {
        console.log('res',res)
        res.data.map(item => {
          const start = item.welcomeUrl.lastIndexOf("/") + 1
          const fileName = item.welcomeUrl.substr(start)
          let fileObj = {
            name: fileName,
            url: item.welcomeUrl
          }
          let welcomeObj = {
            id: item.welcomeId,
            name: fileName,
            url: item.welcomeUrl
          }
          console.log('fileObj',fileObj)
          this.fileList.push(fileObj) 
          this.welcomeList.push(welcomeObj)
        })
      }).catch(err => {
        console.log('获取欢迎页面数据报错')
      })
    },
    /**
     * 创建首页欢迎图
     */
    createWelcome(welcomeName) {
      let obj = {
        welcomeUrl: welcomeName,
        createUser: this.$store.state.adminUser.adminUserId,
        updateUser: this.$store.state.adminUser.adminUserId
      }
      saveWelcome(obj).then(res => {
        if(res.code === 0 || res.code === 200){
          console.log("创建欢迎页成功")
        }else {
          console.log("创建欢迎页面失败", res.msg)
        }
      }).catch(err => {
        console.log("error", err)
      })
    },
    /**
     *  删除轮播图
     */
    deleteWelcome(welcomeName) {
      let welcomeId
      this.welcomeList.map(item => {
        if(item.name === welcomeName) {
          welcomeId = item.id 
        }
      })
      if(welcomeId){
        deleteWelcome(swipperId).then(res => {
          console.log('删除首页轮播图成功',res)
        }).catch(err => {
          console.log('删除首页轮播图失败',err)
        })
      }else {
        this.$message('error','首页欢迎图不存在')
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.welcome-manage {
  padding: 40px;
}
</style>