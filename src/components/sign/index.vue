<template>
    <div class="ui-sign">
        每日签到
    </div>
</template>

<script>
    export default {
        methods: {
            goback () {
                this.$router.go(-1)
            },
            isActive(url) {
                console.log(location.href.indexOf(url), url)
                return location.href.indexOf(url) !== -1
            }
        }
    }
</script>
