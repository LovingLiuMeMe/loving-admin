import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css'

Vue.use(Router)
    // 路由懒加载
const getComponent = (name, component) => () =>
    import (`@/views/${name}/${component}.vue`);

const myRouter = new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: getComponent('login', 'index')
        },
        {
            path: '/',
            redirect: '/login',
            component: getComponent('login', 'index')
        },
        {
            path: '/home',
            component: getComponent('layout', 'Layout'),// 使用布局的关键点
            children: [{
                    path: '/home',
                    component: getComponent('home', 'index'),
                    meta: {
                        title: 'home'
                    }
                },
                {
                    path: '/permissionMenu',
                    component: getComponent('permission', 'permission'),
                    meta: {
                        title: 'permissionMenu',
                        roles: ['admin']
                    }
                },
                {
                    path: '/permissionBtn',
                    component: getComponent('permission', 'permissionBtn'),
                    meta: {
                        title: 'permissionBtn',
                    }
                },
                {
                    path: '/404',
                    component: getComponent('error', '404'),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/403',
                    component: getComponent('error', '403'),
                    meta: {
                        title: '403'
                    }
                },
                // ++ 
                {
                    path: '/productlist',
                    component: getComponent('product', 'List'),
                    meta: {
                        title: 'productlist'
                    }
                },
                {
                    path: '/productinfo',
                    component: getComponent('product', 'Info'),
                    meta: {
                        title: 'productinfo'
                    }
                },
                {
                    path: '/orderlist',
                    component: getComponent('order', 'List'),
                    meta: {
                        title: 'orderlist'
                    }
                },
                {
                    path: '/orderinfo',
                    component: getComponent('order', 'Info'),
                    meta: {
                        title: 'orderinfo'
                    }
                },
                {
                    path: '/activityManage',
                    component: getComponent('activity', 'Manage'),
                    meta: {
                        title: 'activityManage'
                    }
                },
                {
                    path: '/indexSwipperManage',
                    component: getComponent('index', 'SwipperManage'),
                    meta: {
                        title: 'indexSwipperManage'
                    }
                },
                {
                    path: '/indexWelcomeManage',
                    component: getComponent('index', 'WelcomeManage'),
                    meta: {
                        title: 'indexWelcomeManage'
                    }
                },              
                {
                    path: '/userList',
                    component: getComponent('user', 'List'),
                    meta: {
                        title: 'userList'
                    }
                }
            ]
        }, {
            path: '*', // 当路由不存在的时候 就会跳转到此处
            redirect: '/404',
        }
    ]
})

// 添加路由守卫 
myRouter.beforeEach((to, from, next) => {
    NProgress.start()
    // 判断是否登录【JWT的形式】
    // if (to.path !== '/login' && !store.state.token) {
    //     next('/login')
    //     NProgress.done() // 结束Progress
    // } else {
    //     next();
    // }
    // 判断是否登录【vuex】
    if (to.path !== '/login' && !store.state.isLogin) {
        next('/login')
        NProgress.done() // 结束Progress
    } else {
        next();
    }
    // 判断是否有权限
    if (to.meta.roles) {
        to.meta.roles.includes(...store.getters.roles) ? next() : next('/404')
    } else {
        next();
    }
})

myRouter.afterEach(() => {
    NProgress.done() // 结束Progress
})
export default myRouter