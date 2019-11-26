<template>
  <div class="page-container">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: function (){
        return [20, 30, 30, 50];
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalSize: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentPage: 5
    }
  },
  methods: {
      handleSizeChange(val) {
        this.$emit('pageSizeChange',val);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.$emit('currentPageChange',val);
        console.log(`当前页: ${val}`);
      }
  }
}
</script>
<style lang='scss' scoped>
.page-container {
  padding: 15px 0;
}
</style>