import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const ProductInfo = () => import('@/components/ProductInfo/ProductInfo')
const PlaceOrder = () => import('@/components/PlaceOrder/PlaceOrder')
const OrderDetail = () => import('@/components/OrderDetail/OrderDetail')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/productinfo'
    },
    {
      path: '/productinfo',
      component: ProductInfo
    },
    {
      path: '/placeorder',
      component: PlaceOrder
    },
    {
      path: '/orderdetail',
      component: OrderDetail
    }
  ]
})
