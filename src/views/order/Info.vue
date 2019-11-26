<template>
  <div class="orderinfo-container">
    <el-col :span="18">
      <el-tabs type="card">
        <el-tab-pane label="订单详情">
          <template>
            <el-form ref="form" :model="orderInfo" label-width="100px" class="orderinfo-form">
              <el-form-item label="订单交易号">
                <el-input v-model="orderInfo.orderNo"></el-input>
              </el-form-item>
              <el-form-item label="订单总金额">
                <el-input v-model="orderInfo.totalPrice"></el-input>
              </el-form-item>
              <el-form-item label="客户名称">
                <el-input v-model="orderInfo.userName"></el-input>
              </el-form-item>
              <el-form-item label="客户联系电话">
                <el-input v-model="orderInfo.userPhone"></el-input>
              </el-form-item>
              <el-form-item label="订单备注">
                <el-input v-model="orderInfo.extraInfo"></el-input>
              </el-form-item>
              <el-form-item label="订单创建时间">
                <el-input v-model="orderInfo.createTime"></el-input>
              </el-form-item>
              <el-form-item label="收货地址">
                <el-input type="textarea" v-model="orderInfo.userAddress"></el-input>
              </el-form-item>
            </el-form>

            <el-table
              :data="this.orderInfo.orderItemList"
              style="width: 100%">
              <el-table-column
                label="日期"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="orderItemId"
                label="详情ID"
                width="80">
              </el-table-column>
              <el-table-column
                prop="goodsName"
                label="商品名称"
                width="180">
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
                prop="sellingPrice"
                label="商品售价"
                width="80">
              </el-table-column>
              <el-table-column
                prop="goodsCount"
                label="购买数量"
                width="80">
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>

        <el-tab-pane label="订单状态更新">
          <template>
            <el-col :span="10">
              <div class="block">
                <el-card>
                  <h4>{{nowOrderStatus.title}}</h4>
                  <p>{{nowOrderStatus.desc}}</p>
                  <p v-if="nowOrderStatus.status === 1">
                    <el-button type="primary" size="mini" @click="goDelivery" plain>
                      <span v-if="orderInfo.orderStatus === 1">去发货</span>
                      <span v-else>查看</span>
                    </el-button>
                  </p>
                </el-card>
              </div>
            </el-col>
            <el-col :span="13" :offset="1" v-if="isDelivery">
              <div class="block">
                <el-card>
                  <h4>订单信息</h4>
                  <p v-if="orderInfo.userName">收货人:{{orderInfo.userName}}</p>
                  <p v-if="orderInfo.userPhone">收货人电话:{{orderInfo.userPhone}}</p>
                  <p v-if="orderInfo.userAddress">收货地址:{{orderInfo.userAddress}}</p>
                  <p v-if="orderInfo.extraInfo">订单备注:{{orderInfo.extraInfo}}</p>
                  <div>
                    <el-table
                      :data="this.orderInfo.orderItemList"
                      style="width: 100%">
                      <el-table-column
                        prop="orderItemId"
                        label="详情ID">
                      </el-table-column>
                      <el-table-column
                        prop="goodsName"
                        label="商品名称">
                      </el-table-column>
                      <el-table-column
                        prop="sellingPrice"
                        label="商品售价">
                      </el-table-column>
                      <el-table-column
                        prop="goodsCount"
                        label="购买数量">
                      </el-table-column>
                    </el-table>
                  </div>
                  <p style="margin-top: 20px">
                    <el-button v-if="orderInfo.orderStatus === 1" type="success" @click="changeOrderStatus" round size="mini">
                      发货
                    </el-button>
                  </p>
                </el-card>
              </div>
            </el-col>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import {get,postForm} from '@/api/request';
export default {
    data() {
      return {
        orderInfo: {},
        expressShow: false,
        orderStatus: [
          {status: -3,title:'商家已取消',desc:'卖家单方面取消订单'},
          {status: -2,title:'订单超时',desc:'超时未付款,自动关闭'},
          {status: -1,title:'客户已取消',desc:'买家单方面取消订单'},
          {status: 0,title:'未付款',desc:'等待买家付款'},
          {status: 1,title:'已付款',desc:'等待卖家发货'},
          {status: 2,title:'已发货',desc:'等待买家确认收货'}
        ]
      }
    },
    computed: {
      isDelivery() {
        return (this.expressShow || (this.orderInfo.orderStatus > 1))
      },
      nowOrderStatus(){
        let status;
        this.orderStatus.map( v => {
          console.log(v)
          if(v.status === this.orderInfo.orderStatus){
            status = v;
          }
        })
        return status;
      }
    },
    created() {
      this.orderInfo.orderId = this.$route.query.order_id;
      if(this.orderInfo.orderId){
        this.info();
      }
    },
    methods: {
      info() {
        get("adminOrder/info", {
          orderId: this.orderInfo.orderId
        }).then(res => {
          console.log(res)
          this.orderInfo = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      goDelivery() {
        this.expressShow = !this.expressShow;
      },
      changeOrderStatus() {
        postForm('adminOrder/updateOrderStatus',{
          orderId: this.orderInfo.orderId,
          orderStatus: 2
        }).then(res => {
          this.info();
        })
      }
    }
}

</script>
<style lang='scss'>
  .orderinfo-container {
    padding: 40px;
    overflow: hidden;
  }
  .orderinfo-form .el-form-item__label{
    color: #606266;
  }
</style>