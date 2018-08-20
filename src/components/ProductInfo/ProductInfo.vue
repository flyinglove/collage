<template>
  <div class="product-info">商品详情页</div>
</template>

<script>
  import axios from 'axios'
  import {PRODUCT_INFO} from '../../conf/api'

  export default {
    name: 'ProductInfo',
    created () {
      axios.get(PRODUCT_INFO).then((res) => {
        console.log(res)
      })
    }
  }
</script>

<style scoped>

</style>
