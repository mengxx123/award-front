// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/util/http'
import Mint from 'mint-ui'
import qs from 'qs'
import MuseUI from 'muse-ui'
import ui from './components/index'

import 'muse-ui/dist/muse-ui.css'
import 'mint-ui/lib/style.css'
import './scss/main.scss'

Vue.use(Mint)
Vue.use(MuseUI)
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
