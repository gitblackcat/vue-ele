<template>
    <div id="app">
        <vHeader :seller="seller"></vHeader>
        <div class="tab">
            <router-link tag="div" active-class="active" :class="'tab-item'" to="/goods">商品</router-link>
            <router-link tag="div" active-class="active" :class="'tab-item'" to="/ratings">评论</router-link>
            <router-link tag="div" active-class="active" :class="'tab-item'" to="/seller">商家</router-link>
        </div>
        <router-view :seller="seller"></router-view>
    </div>
</template>

<script>
import vHeader from './components/header/Header'

const ERR_OK = 0

export default {
    name: 'app',
    components: {
        vHeader
    },
    data() {
        return {
            seller: {}
        }
    },
    created() {
        this.$http.get('/api/seller').then((res) => {
            let data = res.data
            if (data.errno === ERR_OK) {
                this.seller = data.data
            }
        })
    }
}
</script>

<style lang="stylus">
@import './common/stylus/mixin.styl'

#app
    .tab
        display flex
        height 40px
        border-bottom 1px solid rgba(7,17,27,0.1)
        border-1px(rgba(7,17,27,0.1))
        .tab-item
            flex auto
            text-align center
            line-height 40px
            font-size 14px
            color rgb(77,85,93)
        .active
            color rgb(240,20,20)
</style>
