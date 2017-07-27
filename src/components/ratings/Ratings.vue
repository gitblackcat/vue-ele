<template>
    <div class="ratings" ref="ratings">
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
            <vSplit></vSplit>
            <vRating :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" @ratingType="ratingType" @contentToggle="contentToggle"></vRating>
            <div class="rating-wrapper">
                <ul>
                    <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px" v-for="rating in ratings">
                        <div class="avatar">
                            <img :src="rating.avatar" width="28" height="28">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <vStar :size="24" :score="rating.score"></vStar>
                                <span class="delivery" v-if="rating.delivery">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-if="rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import bScroll from 'better-scroll'
import vStar from '../star/star.vue'
import vSplit from '../split/Split.vue'
import vRating from '../ratingSelect/RatingSelect.vue'
import { FormatDate } from '../../common/js/date.js'

const POSITIVE = 0,
    NEGATIVE = 1,
    ALL = 2,
    ERR_OK = 0

export default {
    props: {
        seller: {
            type: Object
        }
    },
    created() {
        this.$http.get('https://www.easy-mock.com/mock/5935507491470c0ac1018212/vue-ele/vue-ele/ratings').then((res) => {
            let data = res.data
            if (data.errno === ERR_OK) {
                this.ratings = data.data
                this.$nextTick(() => {
                    this.scroll = new bScroll(this.$refs.ratings, {
                        click: true
                    })
                })
            }
        })
    },
    data() {
        return {
            ratings: [],
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: "全部",
                positive: "满意",
                negative: "不满意"
            }
        }
    },
    methods: {
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
        vStar,
        vSplit,
        vRating
    }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl"

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
        .rating-wrapper
            padding: 0 18px
            .rating-item
                display: flex
                padding: 18px 0
                border-1px(rgba(7, 17, 27, 0.1))
                .avatar
                    flex 0 0 28px
                    width 28px
                    margin-right 12px
                    img
                        border-radius 50%
                .content
                    flex auto
                    position relative
                    .name
                        margin-bottom: 4px
                        line-height: 12px
                        font-size: 10px
                        color: rgb(7, 17, 27)
                    .star-wrapper
                        margin-bottom: 6px
                        font-size: 0
                        .star
                            display: inline-block
                            margin-right: 6px
                            vertical-align: top
                        .delivery
                            display: inline-block
                            vertical-align: top
                            line-height: 12px
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .text
                        margin-bottom: 8px
                        line-height: 18px
                        color: rgb(7, 17, 27)
                        font-size: 12px
                    .recommend
                        line-height: 16px
                        font-size: 0
                        .icon-thumb_up, .item
                            display: inline-block
                            margin: 0 8px 4px 0
                            font-size: 9px
                        .icon-thumb_up
                            color: rgb(0, 160, 220)
                        .item
                            padding: 0 6px
                            border: 1px solid rgba(7, 17, 27, 0.1)
                            border-radius: 1px
                            color: rgb(147, 153, 159)
                            background: #fff
                    .time
                        position: absolute
                        top: 0
                        right: 0
                        line-height: 12px
                        font-size: 10px
                        color: rgb(147, 153, 159)
</style>
