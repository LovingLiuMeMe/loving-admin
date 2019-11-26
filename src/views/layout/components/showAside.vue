<!-- 控制菜单栏是否收缩 -->
<template>
  <div class="clearfix">
    <div class="showAside pull-left" @click="toggleClick">
      <i class="el-icon-menu"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "showAside",
  methods:{
    toggleClick() {
      this.$emit("toggleClick")
    }
  }
};
</script>
<style lang="scss" scoped>
.clearfix{
  float: left;
}
.showAside {
  text-align: left;
  margin-left: 10px;
  cursor: pointer;
  i {
    font-size: 20px;
  }
}
</style>

