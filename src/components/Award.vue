<template>
    <div class="page page-award">
        <header class="page-header"></header>
        <div class="page-body">
            <div class="page-title">•&nbsp;刮奖区&nbsp;•</div>
            <div class="main-box">
                <div class="content">
                    <div id="mask_img_bg">
                        <span class="thanks" v-if="(!join && !award) || (join && joinContent === '0')">感谢参与</span>
                        <div class="award-box" v-if="(!join && award) || (join && joinContent === '1')">
                            <img class="img" src="/static/img/prize.png">
                            <div class="text">米家行车记录仪一个</div>
                        </div>
                    </div>
                    <img id="redux" src="static/img/layer.png" v-if="!join"/>
                    <img class="default" src="static/img/layer.png" v-if="false">
                </div>
            </div>
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

    let aaa = false
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
                            console.log('抽到啦' + _this.award + aaa)
                            console.log(_this.asd)
                            if (aaa) {
                                console.log('显示')
                                _this.successVisible = true
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
                                aaa = true
//                                this.successVisible = true
//                                this.successVisible = true
                            } else if (data.code === 1) {
                                // 谢谢参与
                                console.log('我不信')
                                _this.award = false
                                aaa = false
                            } else if (data.code === 2) {
                                // 已经抽奖过了 TODO 显示结果
                                _this.join = true
                                _this.joinContent = data.data.content
                                console.log(data.data)
                                Toast('您已经抽奖过了')
                                // 显示抽奖结果
                                if (data.data.content === '1') {
                                    _this.successVisible = true
                                }
                            } else {
                                // 系统出错
                                console.log('我不信')
                                _this.award = false
                                aaa = false
                                Toast('系统出错')
                            }
                        },
                        response => {
                            console.log(response)
                        })

                // TODO 设备唯一
            }
        }
    }
</script>

<style scoped>

</style>
