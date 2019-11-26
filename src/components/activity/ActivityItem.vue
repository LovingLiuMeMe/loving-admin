<template>
    <el-col :span="6">
      <el-card :body-style="{ padding: '0px' ,height: '260px'}">
        <div class="image-container">
          <img :src="activityItem.goodsCoverImg" class="image">
        </div>
        <div style="padding: 14px;">
          <h3 class="item-goodsName">{{activityItem.goodsName}}</h3>
          <span class="color-red">{{activityItem.sellingPrice}}</span>
          <div class="bottom clearfix">
            <el-button type="text" @click="deleteItem" class="button">删除</el-button>
          </div>
        </div>
      </el-card>    
    </el-col>
</template>

<script>
export default {
  props: {
    activityItem:{
      type: Object,
      default: {}
    }
  },
  data () {
    return {
    }
  },
  methods: {
    deleteItem() {
      this.$emit('handleDelete',this.activityItem.activityItemId)
    }
  }
}

</script>
<style lang='scss' scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .color-red {
    color: red;
  }
  .image-container{
    height: 150px;
    img {
      height: 100%;
    }
  }
  .button-danger{
    color: red;
  }
  .item-goodsName {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
