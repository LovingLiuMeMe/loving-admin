<template>
  <div class="home">
    <!-- 主页信息 第一个层级-->
    <el-row :gutter="40">
      <!-- 首页用户数量 -->
      <el-col :lg="6" :sm="12">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <div class="icons">
                  <i class="iconfont icon-yonghu"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <ul class="icons-right">
                  <li class="chain">用户</li>
                  <li>
                    <countTo :startVal="user.startVal" :endVal="user.endVal" :duration="1000"></countTo>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 首页消息数量 -->
      <el-col :lg="6" :sm="12">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <div class="icons icons1">
                  <i class="iconfont icon-xiaoxi"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <ul class="icons-right">
                  <li class="chain">消息</li>
                  <li>
                    <countTo :startVal="user.startVal" :endVal="user.endVal" :duration="1000"></countTo>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 首页留言数量 -->
      <el-col :lg="6" :sm="12">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <div class="icons icons2">
                  <i class="iconfont icon-liuliang"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <ul class="icons-right">
                  <li class="chain">今日访问</li>
                  <li>
                    <countTo :startVal="user.startVal" :endVal="user.endVal" :duration="1000"></countTo>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 首页访问数量 -->
      <el-col :lg="6" :sm="12">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <div class="icons icons3">
                  <i class="iconfont icon-yanjing"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <ul class="icons-right">
                  <li class="chain">总访问量</li>
                  <li>
                    <countTo :startVal="user.startVal" :endVal="user.endVal" :duration="1000"></countTo>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <!-- 主页信息 第二个层级-->
    <el-row :gutter="40">
      <!-- 主页信息 开发者信息 -->
      <el-col :lg="8" :sm="8" :xs="24">
        <div class="main-center clearfix">
          <div class="pull-left center-left">
            <ul>
              <li class="accout">我的账户</li>
              <li class="tou">
                <img src="../../assets/img/logo.png">
                <br>
                <span>
                  LovingLiu
                  <br>
                  <span>管理员</span>
                </span>
              </li>
              <li class="mobile">邮箱：lovingliu@126.com</li>
              <li class="mobile">QQ：3230644615</li>
              <li class="time">系统版本：1.0.0</li>
            </ul>
          </div>
        </div>
      </el-col>
      <!-- 主页信息 表格信息 -->
      <el-col :lg="16" :sm="16" :xs="24">
        <div id="charts" ref="charts"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 数字滚动插件
import countTo from "vue-count-to";
//引入echarts 插件
import echarts from "echarts";
export default {
  name: "home",
  components: { countTo },
  data() {
    return {
      user: {
        startVal: 0,
        endVal: 2019
      },
      todulist: [
        {
          checked: true,
          todo: "学习"
        },
        {
          checked: true,
          todo: "吃饭"
        },
        {
          checked: false,
          todo: "睡觉"
        },
        {
          checked: true,
          todo: "看电视"
        },
        {
          checked: true,
          todo: "打篮球"
        }
      ],
      websock: {}
    };
  },
  mounted() {
    this.drawChart()
    this.init()
    this.initWebSocket()
  },
  destroyed(){
    window.onresize=null
  },
  methods: {
    init() {
      //图表自适应
      window.onresize = () => {
        if (this.$refs.charts) {
          echarts.init(this.$refs.charts).resize();
        }
      };
    },
    drawChart() {
      let myChart = echarts.init(this.$refs.charts);
      let option = {
        title: {
          text: "一周访问量",
          x: "center",
          textStyle: {
            fontSize: 16
          }
        },
        legend: {
          data: ["访问量"]
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}<br>访问量{c}"
        },
        xAxis: {
          type: "category",
          data: ["04-02", "04-03", "04-03", "04-04", "04-05", "04-06", "04-07"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            itemStyle: {
              normal: {
                //折点颜色
                color: "#bdb7ff",
                //折线颜色
                lineStyle: {
                  color: "#bdb7ff"
                }
              }
            },
            type: "line"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    toDo(item, i) {
      this.$set(this.todulist[i], "checked", item.checked ? false : true)
    },
    /**
     *  websocket 
     */
    initWebSocket(){ //初始化weosocket 直连
      const wsuri = `ws://49.235.110.134:8000/lovingmall/websocket/${this.$store.state.adminUser.adminUserId}`
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      console.log('websocket 链接成功')
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e){
      let _this = this //数据接收
      this.$notify({
        title: '通知',
        message: e.data,
        type: 'success'
      });
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data)
    },
    websocketclose(e){  //关闭
      console.log('断开连接', e)
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  padding: 40px;
  background: $base-gray1;
  .bg-white {
    background: $base-white;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    cursor: pointer;
    .icons {
      text-align: left;
      width: 86px;
      height: 86px;
      margin: 10px;
      padding: 13px;
      transition: 0.3s ease-in-out;
      border-radius: 3px;
      &:hover {
        background: $base-bule1;
        .icon-yonghu {
          color: $base-white;
        }
      }
      .iconfont {
        font-size: 60px;
      }
      .icon-yonghu {
        font-size: 60px;
        color: $base-bule1;
      }
    }
    .icons1 {
      &:hover {
        background: $base-ye;
        .icon-xiaoxi {
          color: $base-white;
        }
      }
      .icon-xiaoxi {
        color: $base-ye;
      }
    }
    .icons2 {
      &:hover {
        background: $base-green;
        .icon-liuliang {
          color: $base-white;
        }
      }
      .icon-liuliang {
        color: $base-green;
      }
    }
    .icons3 {
      &:hover {
        background: $base-pink;
        .icon-yanjing {
          color: $base-white;
        }
      }
      .icon-yanjing {
        color: $base-pink;
      }
    }
    .icons-right {
      font-size: 24px;
      margin-top: 16px;
      margin-right: 16px;
      li {
        margin: 10px 0;
      }
    }
    .chain {
      color: rgba(0, 0, 0, 0.45);
      font-size: 18px;
    }
  }
  .main-center {
    width: 100%;
    margin-top: 20px;
  }
  .center-left {
    width: 100%;
    text-align: center;
    background: $base-white;
    font-size: 16px;
    color: $base-666;
    padding-bottom: 60px;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    .accout {
      text-align: left;
      margin: 20px;
    }
    .tou {
      margin-bottom: 20px;
      img {
        height: 85px;
        border-radius: 50%;
      }
      span {
        line-height: 25px;
      }
    }
    .mobile,
    .time {
      line-height: 30px;
    }
  }
  #charts {
    // width: 100%;
    height: 426px;
    background: $base-white;
    margin-top: 20px;
    padding-top: 20px;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }
  .users {
    margin-top: 20px;
  }
}
</style>

