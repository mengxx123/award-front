<template>
    <div class="page page-admin">
        <header class="page-header">
            <mu-appbar title="管理平台">
                <!--<mu-icon-button icon="menu" slot="left"/>-->
                <!--<mu-flat-button label="expand_more" slot="right"/>-->
                <!--<mu-icon-button icon="expand_more" slot="right"/>-->
            </mu-appbar>
        </header>
        <div class="page-body">
            <button @click="refresh" type="button">刷新</button>
            <button @click="clearUsers" type="button">清空签到名单</button>
            <button @click="clearAwards" type="button">清空获奖名单</button>

            <mu-list>
                <mu-sub-header>获奖名单</mu-sub-header>
                <div v-if="!awards.length">没有任何人获奖</div>

                <mu-list-item :title="award.user_name" :describeText="award.phone" v-for="award in awards"></mu-list-item>
            </mu-list>

            <mu-list>
                <mu-sub-header>签到名单</mu-sub-header>
                <div v-if="!users.length">没有任何人签到</div>

                <mu-list-item :title="user.user_name" :describeText="user.phone" v-for="user in users"></mu-list-item>
            </mu-list>
        </div>
    </div>
</template>

<script>
    import storage from '../util/storage'

    export default {
        data () {
            return {
                users: [],
                awards: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                // TODO 安全
                this.$http.get('/users')
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                this.users = data.data
                            } else {
                                Toast('系统出错')
                            }
                        },
                        response => {
                            console.log(response)
                        })
                // TODO 安全
                this.$http.get('/awards')
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                this.awards = data.data
                            } else {
                                Toast('系统出错')
                            }
                        },
                        response => {
                            console.log(response)
                        })
            },
            clearUsers() {
                this.$http.delete('/users')
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                this.users = []
                            } else {
                                Toast('系统出错')
                            }
                        },
                        response => {
                            console.log(response)
                        })
            },
            clearAwards() {
                this.$http.delete('/awards')
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                this.awards = []
                            } else {
                                Toast('系统出错')
                            }
                        },
                        response => {
                            console.log(response)
                        })
            },
            refresh() {
                this.init()
            }
        }
    }
</script>

<style scoped>

</style>
