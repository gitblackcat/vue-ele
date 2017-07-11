<template>
    <transition name="move">
        <div class="food" v-show="showFlag">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click="showFlag = false">
                        <span class="icon-arrow_lift"></span>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false
        }
    },
    methods: {
        show() {
            this.showFlag = true
        }
    }
}
</script>
<style lang="stylus">
    .food
        position fixed
        left 0
        top 0
        bottom 48px
        z-index 3
        width 100%
        background #fff
        &.move-enter,&.move-leave-to
            transform translate3d(100%,0,0)
        &.move-enter-active,&.move-leave-active
            transition all 0.2s linear
        &.move-enter-to,&.move-leave
            transform translate3d(0,0,0)
        .image-header
            position relative
            width 100%
            height 0
            padding-top 100%
            img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
            .back
                position absolute
                top 10px
                left 0
                .icon-arrow_lift
                    display block
                    padding 10px
                    font-size 20px
                    color #fff
</style>
