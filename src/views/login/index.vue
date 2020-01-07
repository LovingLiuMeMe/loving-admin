<template>
  <div class="login-container">
    <vue-particles color="#fff" :particlesNumber='60' :moveSpeed='1.5' :lineOpacity='0.5' class="bg"></vue-particles>
    <div class="login-form">
    <el-row :gutter="20">
      <el-col :lg="6" :sm="10" class="aa">
          <h3>{{$t('login.system')}}</h3>
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="100px"
            class="login-ruleForm"
          >
            <el-form-item :label="$t('login.username')" prop="username">
              <el-input v-model="ruleForm2.loginUserName"></el-input>
            </el-form-item>
            <el-form-item :label="$t('login.password')" prop="password">
              <el-input type="password" v-model="ruleForm2.loginPassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
          <div class="beian"> 
            <div style="width:300px;margin:0 auto; padding:20px 0;">
              <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010702001623" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../../assets/img/beian.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">川公网安备 51010702001623号</p></a>
            </div>            
          </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>
<script>
import { login } from "@api"
import { messages } from "@assets/js/common.js"
import { getCookie } from '@/util'
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass"); // 2.自定义规则checkPass 校验通过
        }
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        loginPassword: "admin",
        loginUserName: "admin"
      },
      rules2: { // 1.定义表单验证的规则 validator 自定义验证规则
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateName, trigger: "blur" }]
      }
    };
  },
  mounted() {
    const cookieName = 'lovingAdmin'
    let cookieValue = getCookie(cookieName)
    if(cookieValue) {
      let adminInfoStr = sessionStorage.getItem('LOVING_MALL_ADMININFO')
      console.log('adminInfoStr', adminInfoStr)
      if(adminInfoStr){
        let adminInfo = JSON.parse(adminInfoStr)
        this.$store.commit("COMMIT_TOKEN", 'TestToken');
        //【管理员权限,暂未使用】
        this.$store.commit("COMMIT_ROLE", ['admin']);
        // 1.vuex中保存登录信息
        this.$store.dispatch('SET_ADMININFO',adminInfo)

        this.$router.push({
          path: "/home"
        })
        messages('success',"检测到您已经登录,自动登录")
      }else {
        this.$router.push({
          path: "/login"
        })
      }
    }else {
      this.$router.push({
        path: "/login"
      })
    }
  },
  methods: {
     submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //  实际情况请求后台拿到用户角色
          login(this.ruleForm2)
            .then(res => {
              console.log(res)
              //【JWT 的校验,暂未使用】
              this.$store.commit("COMMIT_TOKEN", 'TestToken');
              //【管理员权限,暂未使用】
              this.$store.commit("COMMIT_ROLE", ['admin']);
              // 1.vuex中保存登录信息
              this.$store.dispatch('SET_ADMININFO',res.data)
              // 2.同步到SessionLocalStrage
              sessionStorage.setItem('LOVING_MALL_ADMININFO',JSON.stringify(res.data))
              // 3.路由跳转
              this.$router.push({
                path: "/home"
              });
            })
            .catch(err => {
              console.log("登录异常", err);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();// 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    }
  }
};
</script>
<style lang="scss" scoped>
.bg{
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.login-container {
  background: #2d3a4b;
  width: 100%;
  height: 100%;
  position: fixed;
  display: table;
  .login-form {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: white;
    font-size: 18px;
    .aa{
      margin: auto;
      float: none;
      .beian{
        position: fixed;
        bottom: 0;
        background: #efefef;
        width: 100%;
        left: 0;
        padding: 15px;
        line-height: 60px;
      }
    }
    h3{
      line-height: 60px;
      margin-left: 100px
    }
    .acount{
      text-align: left
    }
  }
}
</style>

