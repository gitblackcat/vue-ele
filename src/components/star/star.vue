<template>
    <div class="star" :class="starType">
        <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
    </div>
</template>
<script>
const LENGTH = 5,
    CLS_ON = 'on',
    CLS_HALF = 'half',
    CLS_OFF = 'off'

export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType() {
            return 'star-' + this.size
        },
        itemClasses() {
            let result = [],
                score = Math.floor(this.score * 2) / 2,
                // hasDecimal = score % 1 !== 0,
                hasDecimal = !Number.isInteger(score),
                // integer = Math.floor(score)
                integer = Math.trunc(score)

            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON)
            }
            if (hasDecimal) {
                result.push(CLS_HALF)
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF)
            }
            return result
        }
    }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

.star
    font-size 0
    .star-item
        display inline-block
        background-repeat no-repeat
    &.star-48
        .star-item
            width 20px
            height 20px
            background-size 20px 20px
            margin-right 22px
            &:last:child
                margin-right 0
            &.on
                bg-img('star48_on')
            &.half
                bg-img('star48_half')
            &.off
                bg-img('star48_off')
    &.star-36
        .star-item
            width 15px
            height 15px
            background-size 15px 15px
            margin-right 6px
            &:last:child
                margin-right 0
            &.on
                bg-img('star36_on')
            &.half
                bg-img('star36_half')
            &.off
                bg-img('star36_off')
    &.star-24
        .star-item
            width 10px
            height 10px
            background-size 10px 10px
            margin-right 3px
            &:last:child
                margin-right 0
            &.on
                bg-img('star24_on')
            &.half
                bg-img('star24_half')
            &.off
                bg-img('star24_off')
</style>
