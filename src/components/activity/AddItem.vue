<template>
  <el-col :span="6">
    <el-card :body-style="{ padding: '0px' ,height: '260px'}">
      <div class="icon-wrapper" @click="dialogTable"><i class="el-icon-plus"></i></div>
    </el-card>
  </el-col>
</template>

<script>
export default {
  props: {
    activityId: {
      type: Number
    }
  },
  data () {
    return {
    }
  },
  methods: {
    dialogTable() {
      console.log('dedede')
      this.$emit('handleDialogTable',this.activityId)
    }
  }
}

</script>
<style lang='scss' scoped>
  .icon-wrapper{
    font-size: 80px;
    line-height: 260px;
    color: #409EFF;
  }
</style>