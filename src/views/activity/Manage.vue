<template>
  <div id="activity-manage">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="item.activityName" :name="item.activityId" v-for="item in activityList" :key="item.activityId" >
        <template slot="title">
          {{item.activityName}}<div class="icon-delete-container" @click.stop="deleteActivity(item.activityId)"><i class="el-icon-delete color-red"></i></div>
        </template>
        <el-row :gutter="20">
          <ActivityItem v-for="item2 in item.activityItemList" :key="item2.activityItemId" :activityItem="item2" @handleDelete="deleteActivityItem"></ActivityItem>
          <AddItem :activityId="item.activityId" @handleDialogTable="showHideDialogTable"/>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <!--
      弹出框1: 创建活动
    -->
    <div id="create-activity-dialog">
      <el-button type="text" @click="dialogFormVisible = true">点击创建活动</el-button>
      <el-dialog title="创建活动" :visible.sync="dialogFormVisible" :width="dialogWidth">
          <el-form :model="activity" status-icon :rules="rules" ref="activityForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="activityName">
              <el-input type="text" v-model="activity.activityName" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item label="排序权重" prop="activityRank">
              <el-input type="number" v-model.number="activity.activityRank"></el-input>
            </el-form-item>
            <div class="reset-button">
              <el-button type="text"  @click="resetForm('activityForm')">重置</el-button>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="createActivity('activityForm')">确 定</el-button>
          </div>
      </el-dialog>
    </div>
    <!--
      弹出框2: 商品列表 
    -->
    <div id="create-activity-dialog">
      <el-dialog title="商品选择" :visible.sync="dialogTableVisible" custom-class="max-height">
        <el-table
          ref="multipleTable"
          :data="goodsInfoList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="goodsId"
            label="商品Id"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="stockNum"
            label="商品库存"
            width="120">
          </el-table-column>
          <el-table-column
            prop="sellingPrice"
            label="售价"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addActivityItems">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>
<script>
  import {get,post} from '@/api/request';
  import ActivityItem from '@/components/activity/ActivityItem'
  import AddItem from '@/components/activity/AddItem'
  export default {
    components: {
      ActivityItem,
      AddItem
    },
    data() {
        var checkActivityRank = (rule, value, callback) => {
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 500);
      };
      var chaeckActivityName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('活动名称不能为空'));
        } else {
          callback();
        }
      };
      return {
        // 当前打开面板的item ID
        activeNames: [],
        // 控制弹框1 的显示
        dialogFormVisible: false,
        // 控制弹框 的显示
        dialogTableVisible: false,
        dialogWidth: '500px',
        activity: {
          activityName: '',
          activityRank: 0
        },
        rules: {
          activityName: [
            { validator: chaeckActivityName, trigger: 'blur' }
          ],
          activityRank: [
            { validator: checkActivityRank, trigger: 'blur' }
          ]
        },
        activityList: [
        ],
        multipleSelection: [],
        goodsInfoList: [],
        // 要添加activityItem的acticityId
        activeActivityId: 0
      };
    },
    created(){
      this.getActivityList()
      this.getGoodsInfoList();
    },
    methods: {
      handleChange(val) {
        console.log(this.activeNames)
        console.log(val);
      },
      // 创建活动
      createActivity(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            post("adminActivityController/saveActivity",this.activity).then(res => {
              this.$message("success", res.msg)
              this.getActivityList()
            }).catch(err => {
              this.$message("error", err.message)
            })
          } else {
            this.$message("error", "请正确的输入活动的名称和排序权重")
            return false;
          }
        });
        this.dialogFormVisible = false
      },
      // 重置活动信息
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 获取活动列表信息
      getActivityList(){
        get("adminActivityController/activityList").then(res => {
          this.activityList = res.data
          console.log(this.activityList)
        }).catch(error => {
          this.$message('error',error.message)
        })
      },
      // 获取商品信息
      getGoodsInfoList(){
        get("adminGoods/listAll").then(res => {
          this.goodsInfoList = res.data
        }).catch(error => {
          this.$message('error',error.message)
        })
      },
      // 商品选择框 选择的商品
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('this.multipleSelection', this.multipleSelection)
      },
      // 更改商品弹出框的显示/隐藏
      showHideDialogTable(activityId) {
        this.dialogTableVisible = !this.dialogTableVisible;
        console.log('activityId',activityId)
        this.activeActivityId = activityId;
      },
      // 删除活动商品
      deleteActivityItem(activityItemId) {
        get("adminActivityController/deleteActivityItem",{activityItemId}).then(res =>{
          this.getActivityList();
        }).catch(error => {
          this.$message('error', error.message)
        })
      },
      // 添加商品列表
      addActivityItems() {
        let activityItemList = [];
        this.multipleSelection.map(item => {
          let activityItem = new Object();
          activityItem.activityId = this.activeActivityId;
          activityItem.goodsId = item.goodsId;
          activityItemList.push(activityItem);
        })
        post("adminActivityController/addActivityItems",activityItemList).then(res =>{
          this.getActivityList();
        }).catch(error => {
          this.$message('error', error.message)
        })
        this.dialogTableVisible = !this.dialogTableVisible;
      },
      // 删除整个活动
      deleteActivity(activityId) {
        get("adminActivityController/deleteActivity",{activityId}).then(res =>{
          this.getActivityList();
        }).catch(error => {
          this.$message('error', error.message)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
#activity-manage {
  padding: 40px;
  .reset-button {
    text-align: right;
  }
  .max-height {
    .el-dialog__body {
      max-height: 400px;
      overflow-y: auto;
    }
  }
  .icon-delete-container {
    font-size: 18px;
    margin-left: 10px;
    .color-red{
      color: red;
    }
  }
}
</style>