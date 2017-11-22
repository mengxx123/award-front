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
        name: 'Sign',
        mounted() {
            this.init()
        },
        data () {
            return {
                name: '陈建行',
                phone: '15602221204',
                successVisible: false
            }
        },
        methods: {
            init() {
                $('input').on('focus', function () {
                    $('body').addClass('page-inputing')
                })
                $('input').on('blur', function () {
                    $('body').removeClass('page-inputing')
                })

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
