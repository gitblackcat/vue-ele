<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu($event,index)">
                        <p class="text border-1px">
                            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                            {{item.name}}
                        </p>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodWrapper">
                <ul>
                    <li v-for="item in goods" class="food-list food-list-hook">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood($event,food)">
                                <div class="icon">
                                    <img :src="food.icon" width="57" height="57">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p v-if="food.description" class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <vCart :food="food" @computedH="computedHeight"></vCart>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <vShopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></vShopcart>
        </div>
        <vFood :food="selectedFood" ref="food" @computedH="computedHeight"></vFood>
    </div>
</template>
<script>
import bScroll from 'better-scroll'
import vShopcart from '../shopcart/Shopcart.vue'
import vCart from '../cartcontrol/Cartcontrol.vue'
import vFood from '../food/Food.vue'

const ERR_OK = 0

export default {
    props: {
        seller: {
            type: Object
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

        this.$http.get('https://www.easy-mock.com/mock/5935507491470c0ac1018212/vue-ele/vue-ele/goods').then((response) => {
            let data = response.data
            if (data.errno === ERR_OK) {
                this.goods = data.data
                // 这里使用$nextTick来触发方法是因为vue的数据更新到dom是异步的
                //会导致better-scroll不能计算节点
                //所以需要vue更新dom节点以后,通过回调来计算dom相关节点
                this.$nextTick(() => {
                    this.initScroll()
                    this.calculateHeight()
                })
            }
        })
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        }
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i],
                    height2 = this.listHeight[i + 1]

                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i
                }
            }
            return 0
        },
        selectFoods() {
            let foods = []
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    methods: {
        initScroll() {
            this.menuScroll = new bScroll(this.$refs.menuWrapper, {
                click: true //不阻止点击事件
            })
            this.foodScroll = new bScroll(this.$refs.foodWrapper, {
                click: true,
                probeType: 3//实时返回滚动高度
            })

            this.foodScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        calculateHeight() {
            let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook'),
                height = 0

            this.listHeight.push(height)
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        selectMenu($event, index) {
            if (!$event._constructed) {
                return
            }
            let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook'),
                el = foodList[index]

            this.foodScroll.scrollToElement(el, 300)
        },
        computedHeight(el) {
            this.$refs.shopcart.dropSon(el)
        },
        selectFood($event, food) {
            if (!$event._constructed) {
                return
            }
            this.selectedFood = food
            this.$refs.food.show()
        }
    },
    components: {
        vShopcart,
        vCart,
        vFood
    }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'

    .goods
        display flex
        position absolute
        top 174px
        bottom 34px
        width 100%
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background-color #f3f5f7
            .menu-item
                display table 
                width 56px
                height 54px
                padding 0 12px
                &.current
                    position relative
                    z-index 2
                    margin-top -1px
                    background-color #fff
                    font-weight 700
                    .text
                        border-none()
                .icon
                    display inline-block
                    vertical-align top
                    width 12px
                    height 12px
                    margin 0 2px 2px 0
                    background-size 12px
                    background-repeat no-repeat
                    &.decrease
                        bg-img('decrease_3')
                    &.discount
                        bg-img('discount_3')
                    &.guarantee
                        bg-img('guarantee_3')
                    &.invoice
                        bg-img('invoice_3')
                    &.special
                        bg-img('special_3')
                .text
                    display table-cell
                    font-size 12px
                    width 56px
                    vertical-align middle
                    border-1px(rgba(7,17,27,0.1))
        .foods-wrapper
            flex auto
            .title
                padding-left 14px
                border-left 2px solid #d9dde1
                height 26px
                line-height @height
                font-size 12px
                color rgb(147,153,159)
                background-color #f3f5f7
            .food-item
                display flex
                margin 18px
                padding-bottom 18px
                border-1px(rgba(7,17,27,0.1))
                &:last-child 
                    border-none()
                    margin-bottom 0
                .icon
                    flex 0 0 57px
                    margin-right 10px
                .content
                    flex auto
                    position relative
                    .name
                        margin 2px 0 8px
                        font-size 14px
                        color rgb(7,17,27)
                        height 14px
                        line-height @height
                    .desc,.extra
                        font-size 10px
                        color rgb(147,153,159)
                    .desc 
                        margin-bottom 8px
                        line-height 12px
                    .extra
                        height 10px
                        line-height @height
                        .count
                            margin-right 10px
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
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        bottom 0
</style>
