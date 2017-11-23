<template>
    <div class="page page-activity-detail">
        <header class="page-header">
        </header>
        <div class="page-body">
            活动详情
            <div>活动名称：{{ activity.name }}</div>
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
