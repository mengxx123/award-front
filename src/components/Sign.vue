<template>
    <div class="page page-sign">
        <header class="page-header">
            <img class="logo" src="/static/img/logo.png">
        </header>
        <div class="page-body">
            <div class="page-title">签到内容</div>
            <input class="input" v-model="name" placeholder="姓名">
            <input class="input" v-model="phone" placeholder="手机号码">
            <button class="btn sign" type="button" @click="sign">签到</button>
            <div class="company">广州量川科技有限公司</div>
        </div>
        <div class="success-box" v-if="successVisible">
            <img class="success" src="/static/img/sign-success.png">
            <router-link class="btn go-award" to="/award">去抽奖</router-link>
        </div>
    </div>
</template>

<script>
    import storage from '../util/storage'
    import { Toast } from 'mint-ui'

    export default {
        mounted() {
            this.init()
        },
        data () {
            return {
                name: storage.get('name') || '',
                phone: storage.get('phone') || '',
                successVisible: false
            }
        },
        methods: {
            init() {
                let u = navigator.userAgent
//                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//                alert('是否是Android：'+isAndroid);
//                alert('是否是iOS：'+isiOS);
                if (!isiOS) {
                    $('input').on('focus', function () {
                        $('body').addClass('page-inputing')
                    })
                    $('input').on('blur', function () {
                        $('body').removeClass('page-inputing')
                    })
                }

//                if (storage.get('sign')) {
//                    if (location.award) {
//                        alert('您已经抽过奖品了')
//                    } else {
//                        this.successVisible = true
//                    }
//                }
            },
            sign() {
                 if (!this.name) {
                     Toast('请输入姓名')
                     return
                 }
                 if (!/^([\u4E00-\u9FA5])*$/.test(this.name)) {
                     Toast('请输入正确的姓名')
                     return
                 }
                 if (!this.phone) {
                     Toast('请输入手机号')
                     return
                 }
                if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))){
                    Toast('请输入正确的手机号')
                    return
                }
                // 由于手机号不验证，必须限制一个设备只能签到一次 TODO 不安全
                let bindPhone = storage.get('bind_phone')
                if (bindPhone && bindPhone !== this.phone) {
                    Toast('一部手机只能签到一次')
                    return
                }

                storage.set('name', this.name)
                storage.set('phone', this.phone)

                // TODO 安全、修改接口
                this.$http.post('/users', this.$qs.stringify({
                    user_name: this.name,
                    phone: this.phone,
                    industry: '互联网'
                }))
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                storage.set('sign', true)
                                this.successVisible = true
                                // 标志该设备已经签到过了
                                storage.set('bind_phone', this.phone)
                            } else {
                                if (data.code === 2) {
//                                    Toast('您已经签到过了')
                                    storage.set('sign', true)
                                    this.successVisible = true
                                } else {
                                    Toast('系统出错')
                                }
                            }
                        },
                        response => {
                            console.log(response)
                        })
            }
        }
    }
</script>

<style scoped>

</style>
