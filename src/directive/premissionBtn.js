import Vue from 'vue'
import store from '@/store/store'
// 自定义指令 使得部分组件可见
Vue.directive('allowed', {
    inserted: function (el, bingding) {
        let roles = store.getters.roles
        //判断权限
        if (Array.isArray(roles) && roles.length > 0) {
            let allow = bingding.value.some(item => {
                return roles.includes(item)
            })
            if (!allow) {
                if (el.parentNode) {
                    el.parentNode.removeChild(el)
                }
            }
        }
    }
})
