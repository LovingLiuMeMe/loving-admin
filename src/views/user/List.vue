<template>
    <div class="order-container">
      <el-dialog title="订单列表" :visible.sync="dialogTableVisible">
        <el-table
          :data="orderList"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand" v-for="item in props.row.orderItemList" :key="item.orderItemId">
                <el-form-item label="商品ID: ">
                  <span>{{ item.goodsId }}</span>
                </el-form-item>
                <el-form-item label="商品名称: ">
                  <span>{{ item.goodsName }}</span>
                </el-form-item>
                <el-form-item label="商品售价: ">
                  <span>{{ item.sellingPrice}}</span>
                </el-form-item>
                <el-form-item label="购买数量: ">
                  <span>{{ item.goodsCount}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="订单 ID"
            prop="orderId">
          </el-table-column>
          <el-table-column
            label="订单总价"
            prop="totalPrice">
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="createTime">
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-table
        :data="userList"
        :header-cell-style="cellStyle"
        :cell-style="cellStyle"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="userId"
          label="用户ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="用户昵称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="introduceSign"
          label="用户简介"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleInfo(scope.row)" type="text" size="mini">查看订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
import { userList, orderListByUserId} from '@api';
export default {
  data() {
    return {
      userList: [],
      orderList: [],
      dialogTableVisible: false
    }
  },
  methods: {
    cellStyle(){
      return "text-align: center";
    },
    handleDelete(index,row){
    },
    handleInfo(row){
      orderListByUserId(row.userId).then(res => {
        this.orderList = res.data
        this.dialogTableVisible = true
      })
    },
    getUserList(){
      userList().then(res => {
        console.log('res', res)
        this.userList = res.data
      }).catch(err => {
        this.$message("error", err.message)
      })
    }
  },
  mounted() {
    this.getUserList()
  }
}
</script>
<style lang="scss" scoped>
  .order-container {
    padding: 40px;
  }
</style>