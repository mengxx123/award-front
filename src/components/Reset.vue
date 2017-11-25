<template>
    <div class="page page-sign">
        重置成功
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
                localStorage.clear()
            }
        }
    }
</script>

<style scoped>

</style>
