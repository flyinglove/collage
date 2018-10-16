<template>
  <div class="group-item">
    <div class="group-item-left">
      <img :src="item.avatar" alt="">
      <p>{{item.nickname}}</p>
    </div>
    <div class="group-item-right">
      <p>
        还差<span>{{item.remainingNum}}人</span>成团
      </p>
      <span>{{timeData.hours}}:{{timeData.minutes}}:{{timeData.seconds}}</span>
      <big-button class="btn">
        <span>去参团</span>
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
        }
      }
    },
    watch: {
      time (o, n) {
        this.timeData = util.timeTick(this.item.endTime - this.item.now - n)
      }
    },
    components: {
      BigButton
    }
  }
</script>

<style lang="stylus" scoped>
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
  &-left
    display: flex
    align-items center
  img
    width: 33px
    height: 33px
    margin-right: 10px
  .btn
    padding: 10px 12px 8px
    border-radius: 4px
  &-right
    display: flex
</style>
