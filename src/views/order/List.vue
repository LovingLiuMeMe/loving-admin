<template>
    <div class="order-container">
      <el-table
        :data="orderList"
        :header-cell-style="cellStyle"
        :cell-style="cellStyle"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="orderId"
          label="订单ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="订单总价"
          width="120">
        </el-table-column>
        <el-table-column
          label="支付状态"
          width="100">
          <!-- 商品状态 -->
          <template slot-scope="scope">
            <el-button v-if="scope.row.payStatus === 0" size="mini" round>未支付</el-button>
            <el-button v-else type="success" size="mini" round>已支付</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="交易状态"
          width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.orderStatus === 0" size="mini" type="warning" plain>客户未支付</el-button>
            <el-button v-else-if="scope.row.orderStatus === 1" size="mini" type="primary"  plain>客户已支付</el-button>
            <el-button v-else-if="scope.row.orderStatus === 2" size="mini" type="success" plain>已发货</el-button>
            <el-button v-else-if="scope.row.orderStatus === -1" size="mini" type="danger" plain>客户已取消</el-button>
            <el-button v-else-if="scope.row.orderStatus === -2" size="mini" type="danger" plain>订单超时已关闭</el-button>
            <el-button v-else-if="scope.row.orderStatus === -3" size="mini" type="danger" plain>商家已取消</el-button>
            <el-button v-else type="danger" size="mini" plain>订单状态异常</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="订单删除"
          width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isDeleted === 0" @click="handleDelete(scope.$index, scope.row)" type="danger" size="mini">删除订单</el-button>
            <el-button v-else type="warning" size="mini">已删除</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleInfo(scope.row)" type="text" size="mini">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <PageHelper :currentPage="pageNum" :pageSizes="pageSizes" :pageSize="pageSize" :totalSize="total" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange"/>
    </div>
</template>
<script>
import {get,post} from '@/api/request';
import PageHelper from '@/components/PageHelper';
export default {
  data() {
    return {
      orderList: [],
      pageNum: 1,
      pageSize: 10,
      orderBy: 'create_time',
      orderType: 'desc',
      search: '',
      total: 0,
      totalPage: 0,
      searchNames:[],
      deleteOrderIds:[],
      pageSizes: [10,20,30,40] // 每页显示容量
    }
  },
  components:{
    PageHelper
  },
  methods: {
    cellStyle(){
      return "text-align: center";
    },
    pageSizeChange(val){
      this.pageSize = val;
      this.getOrderList();
    },
    currentPageChange(val){
      if(val<=this.total && val>=0){
        this.pageNum = val;
        this.getOrderList();
      }
    },
    handleInfo(row){
      this.$router.push({path: 'orderinfo',  query: {order_id: row.orderId}})
    },
    handleDelete(index,row){
        this.deleteOrderIds = [] // 清空
        this.deleteOrderIds.push(row.orderId)
        post("adminOrder/delete",{
          orderIds: this.deleteOrderIds
        }).then(res => {
          if(res.code === 0){
            this.orderList.splice(index, 1)
          }
        }).catch(err => {
          console.log(err)
        })
    },
    getOrderList(){
      get("adminOrder/list",{
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType
      }).then(res => {
        this.orderList = res.data.list;
        this.total = res.data.total;
        this.totalPage = res.data.totalPage;

      }).catch(err => {
        console.log("获得订单列表异常");
      })
    }
  },
  mounted() {
    this.getOrderList()
  }
}
</script>
<style lang="scss" scoped>
  .order-container {
    padding: 40px;
  }
</style>