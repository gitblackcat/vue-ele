<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="item-support" v-for="(item,index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="detailShow = false">
                    <span class="icon-close"></span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '../star/star'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    data() {
        return {
            detailShow: false
        }
    },
    methods: {
        showDetail() {
            this.detailShow = true
        }
    },
    components: {
        star
    }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'

    .header
        position relative
        color #fff
        overflow hidden
        background rgba(7,17,27,0.5)
        .content-wrapper
            position relative
            padding 24px 12px 18px 24px
            font-size 0
            .avatar
                display inline-block
                vertical-align top
                img
                    border-radius 2px
            .content
                display inline-block
                margin-left 16px
                .title
                    margin 2px 0 8px
                    .brand
                        display inline-block
                        vertical-align top
                        width 30px
                        height 18px
                        bg-img('brand')
                        background-size 30px 18px
                        background-repeat no-repeat
                    .name
                        font-size 16px
                        font-weight bold
                        line-height 18px
                        margin-left 6px
                .description
                    font-size 12px
                    line-height 12px
                    margin-bottom 10px
                .support
                    .icon
                        display inline-block
                        vertical-align top
                        width 12px
                        height 12px
                        margin 0 4px 2px 0
                        background-size 12px
                        background-repeat no-repeat
                        &.decrease
                            bg-img('decrease_1')
                        &.discount
                            bg-img('discount_1')
                        &.guarantee
                            bg-img('guarantee_1')
                        &.invoice
                            bg-img('invoice_1')
                        &.special
                            bg-img('special_1')
                    .text
                        font-size 10px
                        line-height 12px
            .support-count
                position absolute
                right 12px
                bottom 14px
                padding 0 8px
                background rgba(0,0,0,0.2)
                text-align center
                height 24px
                border-radius 14px
                line-height 24px
                .count
                    vertical-align top
                    font-size 10px
                .icon-keyboard_arrow_right
                    line-height 24px
                    margin-left 2px
                    font-size 10px
        .bulletin-wrapper
            position relative
            height 28px
            line-height 28px
            padding 0 21px 0 12px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            background rgba(7,17,27,0.2)
            .bulletin-title
                display inline-block
                width 22px
                height 12px
                bg-img('bulletin')
                background-size 22px 12px
                background-repeat no-repeat
                vertical-align top
                margin-top 8px
            .bulletin-text
                // vertical-align top
                font-size 10px
                margin 0 4px 0 0
            .icon-keyboard_arrow_right
                position absolute
                right 12px
                top 10px
                font-size 10px
        .background
            position absolute
            top 0
            left 0
            bottom 0
            right 0
            z-index -1
            filter blur(10px)
        .fade-enter,.fade-leave-to
            background rgba(7,17,27,0)           
            opacity 0
        .fade-enter-active,.fade-leave-active
            transition all .5s
        .fade-enter-to,.fade-leave
            background rgba(7,17,27,0.8)
            opacity 1
        .detail
            position fixed
            left 0
            right 0
            top 0
            bottom 0
            z-index 3
            background rgba(7,17,27,0.8)
            overflow auto
            backdrop-filter blur(10px)
            .detail-wrapper
                min-height 100%
                width 100%
                .detail-main
                    margin-top 64px
                    padding-bottom 64px
                    .name
                        font-size 16px
                        line-height 16px
                        text-align center
                        font-weight 700
                    .star-wrapper
                        margin-top 16px
                        text-align center
                    .title
                        display flex
                        width 80%
                        margin 28px auto 24px
                        .line
                            flex 1
                            position relative
                            top -7px
                            border-bottom 1px solid rgba(255,255,255,0.2)
                        .text
                            padding 0 12px
                            font-size 14px
                            font-weight 700
                    .supports
                        width 80%
                        margin 0 auto
                        .item-support
                            padding 0 12px
                            font-size 0
                            margin-bottom 12px
                            &:last-child
                                margin-bottom 0
                            .icon
                                display inline-block
                                width 16px
                                height 16px
                                background-size 16px 16px
                                background-repeat no-repeat
                                vertical-align top
                                &.decrease
                                    bg-img('decrease_2')
                                &.discount
                                    bg-img('discount_2')
                                &.special
                                    bg-img('special_2')
                                &.invoice
                                    bg-img('invoice_2')
                                &.guarantee
                                    bg-img('guarantee_2')
                            .text
                                font-size 12px
                                line-height 16px
                                margin-left 6px
                    .bulletin
                        width 80%
                        margin 0 auto
                        .content
                            padding 0 12px
                            font-size 12px
                            line-height 24px
            .detail-close
                position relative
                width 32px
                height 32px
                margin -64px auto 0
                clear both
                font-size 32px
</style>
