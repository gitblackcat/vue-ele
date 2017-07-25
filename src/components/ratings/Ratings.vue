<template>
    <div class="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <vStar :size="36" :score="seller.serviceScore"></vStar>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <vStar :size="36" :score="seller.foodScore"></vStar>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vStar from '../star/star.vue'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        vStar
    }
}
</script>
<style lang="stylus">
    .ratings
        position absolute
        top 174px
        bottom 0
        left 0
        width 100%
        overflow hidden
        .overview
            display flex
            padding 18px 0
            .overview-left
                flex 0 0 137px
                width 137px
                border-right 1px solid rgba(7,17,27,0.1)
                text-align center
                padding 6px 0
                @media only screen and (max-width:320px)
                    flex 0 0 120px
                    width 120px
                .score
                    font-size 24px
                    line-height 28px
                    color rgb(255,153,0)
                .title
                    line-height 12px
                    font-size 12px
                    color rgb(7,17,27)
                    margin 6px 0 8px
                .rank
                    line-height 10px
                    font-size 10px
                    color rgb(147,153,159)
            .overview-right
                flex auto
                padding 6px 0 6px 24px
                @media only screen and (max-width:320px)
                    padding-left 6px
                .score-wrapper
                    margin-bottom 8px
                    font-size 0
                    .title
                        color rgb(7,17,27)
                        font-size 12px
                        line-height 18px
                    .star
                        display inline-block
                        vertical-align top
                        margin 0 4px 0 8px
                    .score
                        color rgb(255,153,0)
                        font-size 12px
                        line-height 18px
                .delivery-wrapper
                    line-height 18px
                    font-size 0
                    .title
                        color rgb(7,17,27)
                        font-size 12px
                    .delivery   
                        color rgb(147,153,159)
                        font-size 12px
                        margin-left 12px
</style>
