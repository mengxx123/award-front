// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/util/http'
// import Mint from 'mint-ui'
import ui from './components/index'
import qs from 'qs'
// import MuseUI from 'muse-ui'

import 'muse-ui/dist/muse-ui.css'
import 'mint-ui/lib/style.css'
import './scss/main.scss'

// 引入 muse-ui 组件
// import 'muse-components/styles/base.less' // 加载基础的样式
import appBar from 'muse-components/appBar'
import list from 'muse-components/list'
// ..
Vue.component(appBar.name, appBar)
Vue.component(list.name, list)

// Vue.use(Mint)
// Vue.use(MuseUI)
Vue.use(ui)

Vue.prototype.$qs = qs
Vue.prototype.$http = http

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
