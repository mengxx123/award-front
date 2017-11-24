import footer from './footer'
import sign from './sign'

export default {
    install: function (Vue) {
        Vue.component('ui-footer', footer)
        Vue.component('ui-sign', sign)
    }
}
