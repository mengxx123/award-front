<template>
    <div class="ui-sign">
        签到啦
        <button class="sign" @click="sign">签到</button>
        <h2>我的签到</h2>
        <ul>
           <li v-for="(sign, index) in signs">{{ index + 1 }}：{{ dealTime(sign.createAt) }}</li>
        </ul>
        <div>连续签到礼包</div>
        <ul class="sign-award-list">
           <li class="item" v-for="award in awards">
                <button class="sign">签到</button>
           </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                signs: [],
                awards: [1, 2, 3]
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            dealTime(time) {
                return new Date(time).getDate() + '日'
            },
            init() {
                this.$http.get(`/signs?activity_id=${this.$route.params.id}&user_id=${'1'}`)
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                this.signs = data.data
                            } else {
                                Toast('系统出错')
                            }
                        },
                        response => {
                            console.log(response)
                        })
            },
            sign() {
                this.$http.post('/signs', {
                    activity_id: this.$route.params.id,
                    user_id: '1'
                })
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                this.signs = data.data
                            } else {
                                Toast('系统出错')
                            }
                        },
                        response => {
                            console.log(response)
                        })
            }
        }
    }
</script>

<style lang="scss">
    .sign-award-list {
        .item {
            display: flex;
            align-items: center;
            height: 100px;
            border-bottom: 1px solid #e4e4e4;
        }
        .sign {
            margin-left: auto;
        }
    }
</style>