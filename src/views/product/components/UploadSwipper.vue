<template>
  <div style="padding: 50px;">
    <ImageUpload :fileList="baseCarouselList" @fileAdd="createCarousel" @fileDelete="deleteCarousel"/>  
    <div style="margin-top: 20px;">
      <el-button type="text" @click="saveCarousel(0)">上一步</el-button>
      <el-button type="text" @click="saveCarousel(1)">下一步</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import ImageUpload from '@/components/imageUpload/ImageUpload'
  export default {
    components: {
      ImageUpload
    },
    props: {
      goodsCarousel: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        baseImageUrl: 'http://img.lovingliu.cn/',
        carouselList: [],
        baseCarouselList: []
      }
    },
    mounted(){
      this.strToObjArray()
    },
    methods: {
      strToObjArray(){
        if(this.goodsCarousel){
          let carouselArr = this.goodsCarousel.split(";")
            carouselArr.map(item => {
            const start = item.lastIndexOf("/") + 1
            const carouselName = item.substr(start)
            let carouselObj = {
              name: carouselName,
              url: item
            }
            this.carouselList.push(carouselObj)
            this.baseCarouselList.push(carouselObj)
          })          
        }
      },
      /**
       * 点击 上一步 或者 保存
       */
      saveCarousel(type) {
        let carouselStr = ''
        this.carouselList.map((item,index) => {
          carouselStr += item.url
          if(index !== this.carouselList.length - 1) {
            carouselStr += ';'
          }
        })
        this.$emit('modifyCarousel', carouselStr)
        if(type){
          this.$emit('addStep')
        }else {
          this.$emit('reduceStep')
        }
      },
      /**
       * 创建商品详情轮播图
       */
      createCarousel(carousel) {
        let carouselObj = {
          name: carousel,
          url: this.baseImageUrl+carousel
        }
        this.carouselList.push(carouselObj)
      },
      /**
       *  删除商品
       */
      deleteCarousel(carousel) {
        this.carouselList = this.carouselList.filter(item => {
          return carousel !== item.name
        })
      }
    }
  }
</script>