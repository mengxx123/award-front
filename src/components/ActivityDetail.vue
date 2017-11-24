<template>
    <div class="page page-activity-detail">
        <header class="page-header"></header>
        <div class="page-body">
            活动详情
            <div>活动名称：{{ activity.name }}</div>
            <div>活动类型：{{ activity.type }}</div>
            <ui-footer v-if="this.activity.type === 2"></ui-footer>
        </div>

    </div>
</template>

<script>
    import storage from '../util/storage'
    import { Toast } from 'mint-ui'

    export default {
        data () {
            return {
                activity: {}
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.$http.get('/activities/' + this.$route.params.id)
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                this.activity = data.data
                                // 公司活动，所以特殊
                                if (this.activity.id === '1') {
                                    this.$router.replace('/sign')
                                    return
                                }
                                // 抽奖
                                if (this.activity.type === 1) {
                                    this.$router.replace('/award')
                                }
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

<style scoped>

</style>
