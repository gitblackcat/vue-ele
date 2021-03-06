<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="food">
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
                    <div class="cartcontrol-wrapper">
                        <vCart :food="food" @computedH="computedHeight"></vCart>
                    </div>
                    <transition name="fade">
                        <div @click="addFirst($event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
                    </transition>
                </div>
                <vSplit v-if="food.info"></vSplit>
                <div class="info" v-if="food.info">
                    <div class="title">商品信息</div>
                    <p class="text">{{food.info}}</p>
                </div>
                <vSplit></vSplit>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <vRating :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @ratingType="ratingType" @contentToggle="contentToggle"></vRating>
                    <div class="rating-wrapper">
                        <ul v-if="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar" width="12" height="12" class="avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-if="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import bScroll from 'better-scroll'
import Vue from 'vue'
import vCart from '../cartcontrol/Cartcontrol.vue'
import vSplit from '../split/Split.vue'
import vRating from '../ratingSelect/RatingSelect.vue'
import { FormatDate } from '../../common/js/date.js'

const POSITIVE = 0,
    NEGATIVE = 1,
    ALL = 2

export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: "全部",
                positive: "推荐",
                negative: "吐槽"
            }
        }
    },
    methods: {
        show() {
            this.showFlag = true
            this.selectType = ALL
            this.onlyContent = true
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new bScroll(this.$refs.food, {
                        click: true //不阻止点击事件
                    })
                } else {
                    this.scroll.refresh()
                }
            })
        },
        addFirst($event) {
            if (!$event._constructed) {
                return
            }
            Vue.set(this.food, 'count', 1)
            this.$emit('computedH', $event.target)
        },
        computedHeight(el) {
            this.$emit('computedH', el)
        },
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false
            }
            if (this.selectType === ALL) {
                return true
            } else {
                return type === this.selectType
            }
        },
        ratingType(type) {
            this.selectType = type
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        },
        contentToggle(onlyContent) {
            this.onlyContent = onlyContent
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        }
    },
    filters: {
        formatDate(time) {
            let date = new Date(time)
            return FormatDate(date, "yyyy-MM-dd hh:mm")
        }
    },
    components: {
        vCart,
        vSplit,
        vRating
    }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

    .food
        position fixed
        left 0
        top 0
        bottom 50px
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
        .content
            position relative
            padding 18px
            .title
                line-height 14px
                margin-bottom 8px
                font-size 14px
                font-weight 700
                color rgb(7,17,27)
            .detail
                margin-bottom 18px
                line-height 10px
                font-size 0
                height 10px
                .sell-count,.rating
                    font-size 10px
                    color rgb(147,153,159)
                .sell-count
                    margin-right 12px
            .price
                font-weight 700
                line-height 24px
                .now
                    margin-right 6px
                    font-size 14px
                    color rgb(240,20,20)
                .old
                    text-decoration line-through
                    font-size 10px
                    color color rgb(147,153,159)
            .cartcontrol-wrapper,.buy
                position absolute
                right 18px
                bottom 18px
            .buy
                z-index 2
                height 24px
                line-height 24px
                padding 0 12px
                text-align center
                box-sizing border-box
                font-size 10px
                border-radius 12px
                color #fff
                background rgb(0,160,220)
                opacity 1
                &.fade-enter,&.fade-leave-to
                    opacity 0
                &.fade-enter-active,&.fade-leave-active
                    transition all 0.5s linear
                &.fade-enter-to,&.fade-leave
                    opacity 1
        .info
            padding 18px
            .title
                line-height 14px
                margin-bottom 6px
                font-size 14px
                color rgb(7,17,27)
            .text
                line-height 24px
                font-size 12px
                padding 0 8px
                color rgb(77,85,93)
        .rating
            padding-top 18px
            .title
                line-height 14px
                margin-left 18px
                font-size 14px
                color rgb(7,17,27)
            .rating-wrapper
                padding 0 18px
                .rating-item
                    position relative
                    padding 16px 0
                    border-1px(rgba(7,17,27,0.1))
                    .user
                        position absolute
                        right 0
                        top 16px
                        font-size 0
                        line-height 12px
                        .name
                            display inline-block
                            vertical-align top
                            margin-right 6px
                            font-size 10px
                            color rgb(147,153,159)
                        .avatar
                            border-radius 50%
                    .time
                        line-height 12px
                        font-size 10px
                        color rgb(147,153,159)
                        margin-bottom 6px
                    .text
                        line-height 16px
                        font-size 12px
                        color rgb(7,17,27)
                        .icon-thumb_up,.icon-thumb_down
                            line-height 16px
                            margin-right 4px
                            font-size 12px
                        .icon-thumb_up
                            color rgb(0,160,220)
                        .icon-thumb_down
                            color rgb(147,153,159)
                .no-rating
                    padding 16px 0
                    font-size 12px
                    color rgb(147,153,159)
</style>
