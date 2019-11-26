<template>
  <div class="swipper-manage">
    <ImageUpload :fileList="fileList" @fileAdd="createSwipper" @fileDelete="deleteSwipper"/>
  </div>
</template>

<script>
import ImageUpload from '@/components/imageUpload/ImageUpload'
import { swipperList, saveSwipper, delSwipper } from '@api'
export default {
  data() {
    return {
      fileList: [],
      swipperList: []
    };
  },
  components: {
    ImageUpload
  },
  computed: {

  },
  created() {
    this.getSwipperList()
  },
  mounted() {
  },
  methods: {
    getSwipperList() {
      console.log('不请求问题')
      swipperList()
        .then(res => {
          console.log('res',res)
          res.data.map(item => {
            const start = item.carouselUrl.lastIndexOf("/") + 1
            const fileName = item.carouselUrl.substr(start)
            let fileObj = {
              name: fileName,
              url: item.carouselUrl
            }
            let swipperObj = {
              id: item.carouselId,
              name: fileName,
              url: item.carouselUrl
            }
            console.log('fileObj',fileObj)
            this.fileList.push(fileObj) 
            this.swipperList.push(swipperObj)
          })
        }).catch(err => {
          console.log(err.message)
        })
        console.log('this.fileList',this.fileList)
    },
    /**
     * 创建轮播图
     */
    createSwipper(swipperName) {
      let obj = {
        carouselUrl: swipperName,
        createUser: this.$store.state.adminUser.adminUserId,
        updateUser: this.$store.state.adminUser.adminUserId
      }
      saveSwipper(obj).then(res => {
        if(res.code === 0 || res.code === 200){
          this.$message("success", res.msg)
        }else {
          this.$message("error", res.msg)
        }
      }).catch(err => {
        this.$message("error", err.message)
      })
    },
    /**
     *  删除轮播图
     */
    deleteSwipper(swipperName) {
      let swipperId
      this.swipperList.map(item => {
        if(item.name === swipperName) {
          swipperId = item.id 
        }
      })
      if(swipperId){
        delSwipper(swipperId).then(res => {
          console.log('删除首页轮播图成功',res)
        }).catch(err => {
          console.log('删除首页轮播图失败',err)
        })
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.swipper-manage {
  padding: 40px;
}
</style>