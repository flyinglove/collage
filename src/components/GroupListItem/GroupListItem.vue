<template>
  <div class="group-item" v-if="item">
    <div class="group-item--left">
      <img :src="item.avatar" alt="">
      <p>{{item.nickname}}</p>
    </div>
    <div class="group-item--right">
      <div class="item-info">
        <p class="item-info_p--num">
          还差<span>{{item.remainingNum}}人</span>成团
        </p>
        <p class="item-info_p--time">
          剩余<span>{{timeData.hours}}:{{timeData.minutes}}:{{timeData.seconds}}</span>
        </p>
      </div>
      <big-button class="btn" :class="{'btn-disable': !btnStatus.enabled}" :disabled="!btnStatus.enabled">
        <span>{{btnStatus.btnText}}</span>
      </big-button>
    </div>
  </div>
</template>

<script>
  import util from '@/util/util'
  import BigButton from '@/base/BigButton/BigButton'
  export default {
    name: 'group-list-item',
    props: {
      item: {
        type: Object,
        default: null
      },
      time: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        timeData: {
          hours: '00',
          minutes: '00',
          seconds: '00'
        },
        btnStatus: {
          btnText: '去参团',
          enabled: true
        }
      }
    },
    mounted () {
      let unwatch = this.$watch('time', (n, o) => {
        if (this.item) {
          let timeDelta = this.item.endTime - this.item.now - n * 1000
          if (timeDelta === 0) {
            unwatch()
            this.btnStatus = {
              btnText: '已结束',
              enabled: false
            }
          } else {
            this.timeData = util.timeTick(timeDelta)
          }
        }
      }, {
        immediate: true
      })
    },
    components: {
      BigButton
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../styl/variable.styl"
.group-item
  position: relative
  display: flex
  justify-content: space-between
  align-items center
  margin-left: 15px
  padding-right: 14px
  padding-top: 17px
  padding-bottom: 17px
  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    right: 0
    height: 1px
    transform: scaleY(.5)
    background-color: #e8ebf0
  &--left
    display: flex
    align-items center
  img
    width: 33px
    height: 33px
    margin-right: 10px
  .btn
    margin-left: 10px
    padding: 8px 12px 8px
    border-radius: 4px
  &--right
    display: flex
  .item-info
    &_p--num
      margin-bottom: 8px
      font-family: "PingFangSC-Medium"
      font-size: 14px
      line-height: 1
      color: $dj-color-dark
      span
        color: $dj-color-red
    &_p--time
      font-family: "PingFangSC-Regular"
      font-size: 12px
      color: $dj-color-grey-light
</style>
