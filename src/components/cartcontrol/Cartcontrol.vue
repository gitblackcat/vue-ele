<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline" v-show="food.count" @click.stop="decreaseCart($event)"></div>
        </transition>
        <div class="cart-count" v-show="food.count">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
    </div>
</template>
<script>
import Vue from 'vue'

export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart($event) {
            if (!$event._constructed) {
                return
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1)
            } else {
                this.food.count++
            }
            this.$emit('computedH', $event.target)
        },
        decreaseCart($event) {
            if (!$event._constructed) {
                return
            }
            if (this.food.count)[
                this.food.count--
            ]
        }
    }
}
</script>
<style lang="stylus">
    .cartcontrol
        font-size 0
        .move-enter,.move-leave-to
            opacity 0
            transform translate3d(30px,0,0) rotate3d(0,0,1,180deg)
        .move-enter-active,.move-leave-active
            transition all 0.3s linear
        .move-enter-to,.move-leave
            opacity 1
            transform translate3d(0,0,0) rotate3d(0,0,0,0)
        .cart-decrease,.cart-add
            display inline-block
            font-size 24px
            line-height 24px
            color rgb(0,160,220)
        .cart-count
            display inline-block
            vertical-align top
            width 12px
            line-height 24px
            text-align center
            font-size 10px
            color rgb(147,153,159)
</style>
