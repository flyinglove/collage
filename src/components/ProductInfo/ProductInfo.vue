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
          <span v-if="product.delivery" class="price--tag">包邮</span>
        </div>
        <span class="info--num">已拼{{sellNum}}件</span>
      </div>
      <div class="info--title">
        <h2>{{product.productName}}</h2>
        <span class="info--share">
          <i class="share--icon"></i>
          <i class="share--text">分享</i>
        </span>
      </div>
      <div class="info--text">
        开团并邀请好友参团，人数不足自动退款
      </div>
    </div>
    <panel class="group">
      <h2 slot="left">{{totalGroup}}人正在拼团</h2>
      <div slot="right">查看更多</div>
      <div slot="content">
        <group-list-item :item="groupData[0]"></group-list-item>
      </div>
    </panel>
  </div>
</template>

<script>
  import {getData} from '@/service/getData'
  import {PRODUCT_INFO, GROUP_GOING} from '../../conf/api'
  import util from '@/util/util'

  import Panel from '@/base/Panel/Panel'
  import GroupListItem from '@/components/GroupListItem/GroupListItem'
  export default {
    name: 'ProductInfo',
    data () {
      return {
        product: {},
        activity: {},
        totalGroup: 0,
        groupData: []
      }
    },
    async created () {
      this.getProductInfo()
      this.getGroupData()
    },
    computed: {
      sellNum () {
        return this.product.total - this.product.inventory
      }
    },
    methods: {
      async getProductInfo () {
        let id = util.getUrlParam('productId')
        let data = await getData(PRODUCT_INFO, {id})
        let {product, activity} = data.data
        this.product = product
        this.activity = activity
      },
      async getGroupData () {
        let id = util.getUrlParam('productId')
        let group = await getData(GROUP_GOING, {id})
        let {totalGroup, groups: groupData} = group.data
        this.totalGroup = totalGroup
        this.groupData = groupData
      }
    },
    components: {
      Panel,
      GroupListItem
    }
  }
</script>

<style lang="stylus" scoped>
@import "../../styl/variable.styl"
@import "../../styl/mixin.styl"
.product-info
  background-color: $dj-bg-grey
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
.info
  padding-left: 15px
  padding-right: 13px
  padding-top: 5px
  padding-bottom: 13px
  background-color: #fff
  &--top
    display: flex
    justify-content space-between
    align-items: center
    .price
      .price--active
        font-size: 28px
        color: $dj-color-red
      .price--original
        font-size: 13px
        color: $dj-color-grey-light
      &--tag
        position: relative
        font-size: 11px
        color: $dj-color-red
        box-sizing: border-box
        &::before
          border-1px()
  &--num
    font-size: 12px
    color: $dj-color-grey-light
  &--title
    display: flex
    justify-content space-between
    align-items center
    h2
      display: -webkit-box
      margin-right: 25px
      -webkit-box-orient: vertical
      -webkit-line-clamp: 2
      max-height: 42px
      overflow: hidden
      line-height: 21px
      font-size: 18px
      font-weight: bold
      color: $dj-color-dark
  &--share
    display: block
    width: 24px
    font-size: 0
    .share--icon
      display: block
      width: 22px
      height: 22px
      back-img('./', 'fx')
    .share--text
      font-size: 12px
      font-style: normal
      white-space nowrap
  &--text
    margin-top: 8px
    font-size: 12px
    color: $dj-color-grey-light
.group
  margin-top: 10px
  background-color: #fff
  h2
    font-size: 16px
    font-weight: bold
    color: $dj-color-dark
  div
    position: relative
    font-size: 13px
    color: $dj-color-grey-dark
    &::after
      content: ''
      display: inline-block
      width: 6px
      height: 12px
      margin-left: 5px
      vertical-align: top
      back-img('./', 'ckgd')
</style>
