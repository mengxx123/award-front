<template>
    <div class="page page-rotate">
        <header class="page-header"></header>
        <div class="page-body">
            呵呵
            http://www.17sucai.com//preview/1/2017-11-07/zhuanpan/index.html
        </div>

        <div id="success-box" class="success-box" v-if="successVisible">
            <div class="award">
                <div class="title">恭喜中奖~</div>
                <div class="content">小米行车记录仪一台</div>
            </div>
            <!--<img class="close" src="/static/img/icon-close.png">-->
        </div>
    </div>
</template>

<script>
    import storage from '../util/storage'
    import { Toast } from 'mint-ui'

    export default {
        data () {
            return {
                award: false,
                successVisible: false,
                join: false,
                asd: 'asd'
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let _this = this
                console.log('初始化')
                setInterval(() => {
                    $('#redux').eraser({
                        size: 50,   //设置橡皮擦大小
                        completeRatio: .5, //设置擦除面积比例
                        // 大于擦除面积比例触发函数
                        completeFunction: () => {
                            console.log('抽到啦' + this.award)
                            console.log(this.asd)
                            storage.set('awardSuccess', true)
                            if (this.award) {
                                this.successVisible = true
                            }
                        }
                    });
                }, 500)

                this.$http.post('/awards', this.$qs.stringify({
                    phone: storage.get('phone'),
                    user_name: storage.get('name')
                }))
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                // 获奖
                                console.log('获奖设置')
                                console.log(this.asd)
                                this.asd = '呵呵'
                                _this.asd = 'heheda'
                                console.log(this.asd)
                                _this.award = true
//                                this.successVisible = true
//                                storage.set('sign', true)
//                                this.successVisible = true
                            } else if (data.code === 1) {
                                // 谢谢参与
                                _this.award = false
                                //                                    storage.set('sign', true)
                            } else if (data.code === 2) {
                                // 已经抽奖过了 TODO 显示结果
                                _this.join = true
                                _this.joinContent = data.data.content
                                console.log(data.data)
                                Toast('您已经抽奖过了')
                                // 显示抽奖结果
                            } else {
                                // 系统出错
                                _this.award = false
                                Toast('系统出错')
                            }
                        },
                        response => {
                            console.log(response)
                        })

                // TODO 设备唯一
//                if (storage.get('award')) {
//                    if (storage.get('awardSuccess')) {
//                        this.successVisible = true
////                        Toast('您已经抽过奖品了')
//                    } else {
//                        Toast('您已经抽过奖品了')
//                    }
//                }
            }
        }
    }
</script>

<style scoped>

</style>
