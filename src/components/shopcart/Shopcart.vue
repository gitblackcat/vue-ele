<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight': totalCount}">
                            <span class="icon-shopping_cart"></span>
                        </div>
                        <div class="num" v-show="totalCount">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight': totalPrice}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click.stop="pay">
                    <div class="pay" v-if="totalPrice === 0">￥{{minPrice}}起送</div>
                    <div class="pay" v-else-if="totalPrice < minPrice">还差{{diff}}元起送</div>
                    <div class="pay enough" v-else>去结算</div>
                </div>
            </div>
            <transition-group name="move" class="ball-container" tag="div" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index">
                    <div class="inner inner-hook"></div>
                </div>
            </transition-group>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food border-1px" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <vCartcontrol :food="food"></vCartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="fold = true"></div>
        </transition>
    </div>
</template>
<script>
import bScroll from 'better-scroll'
import vCartcontrol from '../cartcontrol/Cartcontrol.vue'

export default {
    props: {
        'delivery-price': {
            type: Number,
            default: 0
        },
        'min-price': {
            type: Number,
            default: 0
        },
        'select-foods': {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            balls: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
            dropBalls: [],
            fold: true
        }
    },
    computed: {
        totalPrice() {
            let total = 0
            this.selectFoods.forEach((food) => {
                total += food.price * food.count
            })
            return total
        },
        totalCount() {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count
        },
        diff() {
            return this.minPrice - this.totalPrice
        },
        listShow() {
            if (!this.totalCount) {
                this.fold = true
                return false
            }
            // let show = !this.fold
            // if (show) {
            //     this.$nextTick(() => {
            //         if (!this.scroll) {
            //             this.scroll = new bScroll(this.$refs.listContent, {
            //                 click: true
            //             })
            //         } else {
            //             this.scroll.refresh()
            //         }
            //     })
            // }
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new bScroll(this.$refs.listContent, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
            // return show
            return !this.fold
        }
    },
    methods: {
        dropSon(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i]
                if (!ball.show) {
                    ball.show = true
                    ball.el = el
                    this.dropBalls.push(ball)
                    return
                }
            }
        },
        beforeEnter(el) {
            let count = this.balls.length
            while (count--) {
                let ball = this.balls[count]
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect(),
                        x = rect.left - 32,
                        y = -(window.innerHeight - rect.top - 42),
                        inner = el.getElementsByClassName('inner-hook')[0]

                    el.style.display = ''
                    el.style.transform = `translate3d(0,${y}px,0)`
                    inner.style.transform = `translate3d(${x}px,0,0)`
                }
            }
        },
        enter(el) {
            let rf = el.offsetHeight //这是为了触发重绘
            this.$nextTick(() => {
                el.style.transform = 'translate3d(0,0,0)'
                let inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.transform = `translate3d(0,0,0)`
            })
        },
        afterEnter(el) {
            let ball = this.dropBalls.shift()
            if (ball.show) {
                ball.show = false
                el.style.display = 'none'
            }
        },
        toggleList() {
            if (!this.totalCount) {
                return
            }
            this.fold = !this.fold
        },
        empty() {
            this.selectFoods.forEach((food) => {
                food.count = 0
            })
        },
        pay() {
            if (this.totalPrice < this.minPrice) {
                return
            }
            alert('吔屎去啦你!')
        }
    },
    components: {
        vCartcontrol
    }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 4
        width 100%
        height 48px
        .content
            display flex
            background-color #141d27
            color rgba(255,255,255,0.4)
            .content-left
                flex auto
                font-size 0
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    border-radius 50%
                    background-color @background-color
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        background-color #2b343c
                        text-align center
                        &.highlight
                            background-color rgb(0,160,220)
                            .icon-shopping_cart
                                color #fff
                        .icon-shopping_cart
                            color #80858a
                            font-size 24px
                            line-height 44px
                    .num
                        position absolute
                        right 0
                        top 0
                        line-height 16px
                        height 16px
                        width 24px
                        color #fff
                        text-align center
                        border-radius 8px
                        font-weight 700
                        font-size 9px
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                        background-color rgb(240,20,20)
                .price,.desc
                    display inline-block
                    vertical-align top
                    line-height 24px
                    margin 12px 0
                .price 
                    padding-right 12px
                    font-size 16px
                    border-right 1px solid rgba(255,255,255,0.1)
                    font-weight 700
                    &.highlight
                        color #fff
                .desc
                    margin-left 12px
                    font-size 10px
            .content-right
                flex 0 0 105px
                width 105px
                .pay
                    height 48px
                    line-height @height
                    text-align center
                    font-size 12px
                    font-weight 700
                    background-color #2b333b
                    &.enough
                        background-color #00b43c
                        color #fff
        .move-enter-active
            transition all 0.4s cubic-bezier(0,-0.62,.73,.19)
        .ball-container
            .ball
                position fixed
                left 32px
                bottom 22px
                z-index 6
                .inner
                    width 16px
                    height 16px
                    border-radius 50%
                    background-color rgb(0,160,220)
                    transition: all 0.4s linear
        .shopcart-list
            position absolute
            left 0
            top 0
            z-index -1
            width 100%
            transform translate3d(0,-100%,0)
            &.fold-enter,&.fold-leave-to
                transform translate3d(0,0,0)
            &.fold-enter-active,&.fold-leave-active
                transition all 0.5s linear
            &.fold-enter-to,&fold-leave
                transform translate3d(0,-100%,0)
            .list-header
                display flex
                justify-content space-between
                align-items center
                height 40px
                padding 0 18px
                border-bottom 1px solid rgba(7,17,27,0.1)
                background #f3f5f7
                .title
                    color rgb(7,17,27)
                    font-size 14px
                .empty
                    font-size 12px
                    color rgb(0,160,220)
            .list-content
                padding 0 18px
                background-color #fff
                max-height 217px
                overflow hidden
                .food
                    position relative
                    padding 12px 0
                    border-1px(rgba(7,17,27,0.1))
                    .name
                        font-size 14px
                        line-height 24px
                        color rgb(7,17,27)
                    .price
                        position absolute
                        right 90px
                        bottom 12px
                        line-height 24px
                        font-size 14px
                        color rgb(240,20,20)
                        font-weight 700
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        bottom 12px
    .list-mask
        position fixed
        top 0
        left 0
        z-index 2
        width 100%
        height 100%
        background rgba(7,17,27,0.6)
        backdrop-filter blur(10px)
        &.fade-enter,&.fade-leave-to
            background rgba(7,17,27,0)
        &.fade-enter-active,&.fade-leave-active
            transition all 0.5s
        &.fade-enter-to,&.fade-leave
            background rgba(7,17,27,0.6)
            backdrop-filter blur(10px)
</style>
