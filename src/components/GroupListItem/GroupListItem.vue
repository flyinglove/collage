<template>
  <div class="group-item">
    <img :src="item.avatar" alt="">
    <p>{{item.nickname}}</p>
    <big-button class="btn">
      <span>去参团</span>
    </big-button>
  </div>
</template>

<script>
  import BigButton from '@/base/BigButton/BigButton'
  export default {
    name: 'group-list-item',
    props: {
      item: {
        type: Object,
        default: null
      }
    },
    components: {
      BigButton
    }
  }
</script>

<style lang="stylus" scoped>
.group-list-item
  display: flex
  justify-content: space-between
.btn
  height: 44px
</style>
