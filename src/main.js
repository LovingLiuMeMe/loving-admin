import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import i18n from './lang'
import './plugins/element.js' // 导入并引入使用Element-ui
import './directive/premissionBtn'
import './assets/css/public.css'
import './element-variables.scss'
import VueParticles from 'vue-particles'
import VueClipboard from 'vue-clipboard2'
import { messages } from './assets/js/common'
//markdown 编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 引入字体文件
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'

// 全局组件
import '@/assets/css/resetele.css'
Vue.config.devtools = true

Vue.use(VueParticles)
Vue.use(VueClipboard)
Vue.use(mavonEditor)
//全局挂载提示框
Vue.prototype.$message = messages
Vue.config.productionTip = false
new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')