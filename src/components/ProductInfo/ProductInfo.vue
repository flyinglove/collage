<template>
  <div class="product-info">
    <div class="slide">
      <cube-slide :data="product.headImage" ref="slide">
        <cube-slide-item v-for="(item, index) in product.headImage" :key="index">
          <img :src="item" alt="">
        </cube-slide-item>
        <div class="dots" slot="dots" slot-scope="props">
          <span class="dot" :class="{active: props.current === index}" v-for="(item, index) in props.dots"></span>
        </div>
      </cube-slide>
      <div class="group-icon">
        <i class="icon"></i>
        <span>{{product.groupRule}}</span>
      </div>
    </div>
    <div class="info">
      <div class="info--top">
        <div class="price">
          <span class="price--active">&yen;{{product.groupPrice}}</span>
          <span class="price--original">&yen;{{product.originalPrice}}</span>
        </div>
        <span class="info">已拼{{sellNum}}件</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getData} from '@/service/getData'
  import {PRODUCT_INFO} from '../../conf/api'
  import util from '@/util/util'
  export default {
    name: 'ProductInfo',
    data () {
      return {
        product: {},
        activity: {}
      }
    },
    async created () {
      let id = util.getUrlParam('productId')
      let data = await getData(PRODUCT_INFO, {id})
      let {product, activity} = data.data
      this.product = product
      this.activity = activity
    },
    computed: {
      sellNum () {
        return this.product.total - this.product.inventory
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "../../styl/mixin.styl"
.slide
  position: relative
  img
    width: 100%
    object-fit cover
  .dots
    text-align: center
    padding: 0
    margin-top: -12px
    .dot
      display: inline-block
      width: 7px
      height: 7px
      border-radius: 50%
      background-color: rgba(0, 0, 0, .2)
      margin-right: 5px
      &.active
        background-color: #e6454a
.group-icon
  position: absolute
  right: 0
  bottom: 13px
  padding: 5px 10px
  box-sizing: border-box
  border-radius: 15px 0 0 15px
  background-image: linear-gradient(-225deg,#ff884c,#ed594b 50%,#e7484a 92%,#e6454a)
  font-size: 0
  .icon
    display: inline-block
    vertical-align: middle
    width: 12px
    height: 13px
    back-img('./', 'ptr')
  span
    position: relative
    margin-left:  5px
    padding-left: 5px
    vertical-align: middle
    font-size: 13px
    font-weight: bold
    color: #ffffff
    &::before
      line-1px-left(#ffffff)
</style>
