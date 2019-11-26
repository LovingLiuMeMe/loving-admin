<template>
<div>
  <el-row>
    <el-col :span="8">
      <div>
        <el-input
          placeholder="参数名称: 如 处理器"
          v-model="configParam.configKey"
          clearable>
        </el-input>
      </div>
      <div style="margin-top: 10px;">
        <el-input
          placeholder="参数值: 如 麒麟990-5G"
          v-model="configParam.configValue"
          clearable>
        </el-input>
      </div>
      <div style="margin-top: 20px;">
        <el-button type="text" @click="addConfigParam">添加</el-button>
      </div>        
    </el-col>
    <el-col :span="14" :offset="2">
      <div>
        <el-table
          :data="configParamArray">
          <el-table-column
            prop="configKey"
            label="配置名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="configValue"
            label="配置值"
            width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>

  <div style="margin-top: 20px;">
    <el-button type="text" @click="submitConfigParam">上一步</el-button>
    <el-button type="text" @click="submitGoodsInfo">保存</el-button>
  </div>
</div>
</template>
<script>
  export default {
    props: {
      configParams: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        configParam: {
          configKey: '',
          configValue:'',
        },
        configParamArray: this.strToObjArray()
      }
    },
    methods: {
      strToObjArray(){
        let configObjArray = []
        console.log('this.configParams', this.configParams)
        if(this.configParams){
          let configArray = this.configParams.split(";")
          if(configArray.length > 0){
            configArray.map(config => {
              let keyValue = config.split("=")
              let obj = {
                configKey: keyValue[0],
                configValue: keyValue[1]
              }
              configObjArray.push(obj)
            })
          }
        }
        return configObjArray;
      },
      objArrayToStr(objArray){
        let resultStr = ''
        this.configParamArray.map((config,index1) => {
          let keyArray = Object.keys(config)
          if(config.configKey && config.configValue){
            resultStr += (config.configKey + "="+config.configValue)
            if(index1 !== (this.configParamArray.length - 1)){
              resultStr += ";"
            }            
          }
        })
        return resultStr;
      },
      // 上一步 将数据保存
      submitConfigParam() {
          let resultStr = this.objArrayToStr(this.configParamArray)
          console.log('resultStr',resultStr)
          this.$emit('mofidyConfigParam',resultStr)
          this.$emit('reduceStep')
      },
      // 保存商品信息
      submitGoodsInfo() {
        console.log('save')
        let resultStr = this.objArrayToStr(this.configParamArray)
        console.log(resultStr)
        this.$emit('handleSaveGoodsInfo', resultStr)
      },
      // 添加
      addConfigParam() {
        if(this.configParam.configKey && this.configParam.configValue){
          let newObj = JSON.parse(JSON.stringify(this.configParam))
          this.configParamArray.push(newObj)          
        }
      },
      handleDelete(index, row) {
        this.configParamArray.splice(index, 1)
      }
    }
  }
</script>