import Vue from 'vue'
import Router from 'vue-router'
// 界面
const Sign = resolve => require(['@/components/Sign'], resolve)
const Award = resolve => require(['@/components/Award'], resolve)
const Admin = resolve => require(['@/components/Admin'], resolve)
const Reset = resolve => require(['@/components/Reset'], resolve)
const Rotate = resolve => require(['@/components/Rotate'], resolve)
const ActivityDetail = resolve => require(['@/components/ActivityDetail'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        name: 'Sign',
        component: Sign,
        meta: {
            title: '签到页面'
        }
    },
    {
        path: '/award',
        component: Award,
        meta: {
            title: '抽奖页面'
        }
    },
    {
        path: '/rotate',
        component: Rotate,
        meta: {
            title: '转盘抽奖'
        }
    },
    {
        path: '/admin',
        component: Admin,
        meta: {
            title: '后台'
        }
    },
    {
        path: '/reset',
        component: Reset,
        meta: {
            title: '后台'
        }
    },
    {
        path: '/activities/:id',
        component: ActivityDetail,
        meta: {
            title: '活动详情'
        }
    }
]

export default new Router({
    mode: 'history',
    routes: routes
})
