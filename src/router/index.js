import Vue from 'vue'
import Router from 'vue-router'
// import vGoods from '@/components/goods/Goods'
// import vRatings from '@/components/ratings/Ratings'
// import vSeller from '@/components/seller/Seller'

// 以下是组件的懒加载
const vGoods = () =>
    import ('@/components/goods/Goods'),
    vRatings = () =>
    import ('@/components/ratings/Ratings'),
    vSeller = () =>
    import ('@/components/seller/Seller')

Vue.use(Router)

const routes = [{
    path: '/goods',
    component: vGoods
}, {
    path: '/ratings',
    component: vRatings
}, {
    path: '/seller',
    component: vSeller
}, {
    path: '/',
    redirect: '/goods'
}]

export default new Router({
    routes
})
