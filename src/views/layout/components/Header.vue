<template>
  <div class="head-container clearfix">
    <div class="header-left">
      <showAside @toggleClick="toggleAside"/>
      <breadcrumb />
    </div>
    
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?$t('header.cancelFullScreen'):$t('header.fullScreen')" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 多语言 -->
        <select-lang></select-lang>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="$t('header.message')" placement="bottom">
            <router-link to="/tabs">
             <i class="el-icon-bell"></i>
             </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img
              src="http://img.lovingliu.cn/default.jpg"
              class="user-avatar"
            >
            {{ username }}<i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link class="inlineBlock" to="/home">
              <el-dropdown-item>{{$t('route.home')}}</el-dropdown-item>
            </router-link>
            <el-dropdown-item>{{$t('header.setting')}}</el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">{{$t('header.logout')}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import showAside from "./showAside"
import selectLang from './selectLang'
import breadcrumb from './Breadcrumb'
import { logout } from '@api'
export default {
  // name:'header',
  components: {
    showAside,
    selectLang,
    breadcrumb
  },
  data() {
    return {
      fullscreen: false,
      message: 2,
      username: this.$store.state.adminUser.nickName
    }
  },
  computed: {
    isCollapse: {
      get: function() {
        return this.$store.state.isCollapse;
      },
      set: function(newValue) {
        this.$store.commit("IS_COLLAPSE", newValue);
      }
    }
  },
  methods: {
    toggleAside() {
      this.isCollapse = !this.isCollapse;
    },
    // 用户名下拉菜单选择事件
    logout(command) {
      logout()
        .then(res => {
          if(res.data.code === 0 || res.data.code === 0 ){
            // 设置tag列表
            this.$store.commit('TAGES_LIST',[])
            // 设置面包屑导航
            this.$store.commit('SET_BREAD',['home'])
            // 删除vuex中的登录用户数据
            this.$store.dispatch('DELETE_ADMININFO')
            // 删除sessionLocal 中的登录用户数据
            sessionStorage.removeItem('LOVING_MALL_ADMININFO')
            this.$router.push("/login");            
          }else {
            console.log("退出登录失败", res);
          }
        })
        .catch(err => {
          console.log("退出登录异常", err);
        });
    },

    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
}; 
</script>
<style lang="scss" scoped>
.head-container {
  height: 50px;
  line-height: 50px;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid #f0f0f0;
}
.header-left {
  float: left;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 50px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 10px;
}
.btn-bell{
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  font-size: 24px;
  margin-right: 20px;
  margin-bottom: 15px;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: 8px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
}
.btn-bell .el-icon-bell {
  color: #666;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.avatar-container {
  height: 50px;
  display: inline-block;
  // position: absolute;
  // right: 35px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    line-height: initial;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>


