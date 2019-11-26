<template>
    <div class="product-container">
      <el-table
        :data="productList"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="goodsId"
          label="商品ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="goodsIntro"
          label="商品介绍"
          width="120">
        </el-table-column>
        <el-table-column
          label="商品图片"
          width="120">
          <!-- 商品图片 -->
          <template slot-scope="scope">
            <img :src="scope.row.goodsCoverImg" style="width:100%;" />
          </template>
        </el-table-column>
        <el-table-column
          prop="originalPrice"
          label="标价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sellingPrice"
          label="售价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="stockNum"
          label="库存"
          width="100">
        </el-table-column>
        <el-table-column
          label="商品状态"
          width="100">
          <!-- 商品状态 -->
          <template slot-scope="scope">
            <el-button  v-if="scope.row.goodsSellStatus === 0"
              size="mini"
              type="danger"
              @click="handleChangeSellStatus(scope.$index, scope.row)">下架</el-button>
            <el-button v-else
              size="mini"
              @click="handleChangeSellStatus(scope.$index, scope.row)">上架</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <PageHelper :currentPage="pageNum" :pageSizes="pageSizes" :pageSize="pageSize" :totalSize="total" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange"/>
    </div>
</template>
<script>
import {get,post,postForm} from '@/api/request';
import PageHelper from '@/components/PageHelper';
export default {
  data() {
    return {
      productList: [],
      pageNum: 1,
      pageSize: 10,
      orderBy: 'create_time',
      orderType: 'desc',
      search: '',
      total: 0,
      totalPage: 0,
      searchNames:[],
      pageSizes: [10,20,30,40] // 每页显示容量
    }
  },
  components:{
    PageHelper
  },
  methods: {
    handleChangeSellStatus(index,row){
      console.log(row.goodsId)
      postForm("adminGoods/updateSellStatus",{
        GoodsInfoId: row.goodsId
      }).then(res => {
        if(res.code === 0){
          row.goodsSellStatus = Math.abs(row.goodsSellStatus - 1)
        }
      })
    },
    pageSizeChange(val){
      this.pageSize = val;
      this.getProductList();
    },
    currentPageChange(val){
      if(val<=this.total && val>=0){
        this.pageNum = val;
        this.getProductList();
      }
    },
    handleEdit(row){
      this.$router.push({path: 'productinfo',  query: {goods_id: row.goodsId}})
    },
    handleDelete(index, row){
      post("adminGoods/delete",{
          GoodsInfoId: row.goodsId
        }).then(res => {
          if(res.code === 0){
            this.productList.splice(index, 1)
          }
        })
    },
    getProductList(){
      get("adminGoods/list",{
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType,
        search: this.search
      }).then(res => {
        this.productList = res.data.list
        this.total = res.data.total
        this.totalPage = res.data.totalPage
        console.log('获得商品列表成功', res)
      }).catch(err => {
        console.log("获得商品列表异常", err)
      })
    }
  },
  mounted() {
    this.getProductList()
  }
}
</script>
<style lang="scss" scoped>
  .product-container {
    padding: 40px;
  }
</style>