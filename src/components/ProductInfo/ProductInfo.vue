<template>
  <div class="product-info">
    <div class="slide">
      <cube-slide :data="product.headImage" ref="slide">
        <cube-slide-item v-for="(item, index) in product.headImage" :key="index">
          <img :src="item" alt="">
        </cube-slide-item>
        <div slot="dots">
        </div>
      </cube-slide>
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
    }
  }
</script>

<style lang="stylus" scoped>
.slide
  img
    width: 100%
    object-fit cover
  .dot
    display: inline-block
    width: 5px
    height: 7px
</style>
