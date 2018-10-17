<template>
  <button class="big-button" @click="btnClick">
    <slot>立即开团</slot>
  </button>
</template>

<script>
  export default {
    name: 'big-button',
    methods: {
      btnClick () {
        this.$emit('btn-click')
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "../../styl/variable.styl"
.big-button
  display: flex
  align-items: center
  border-radius: 2px
  border: none
  text-align: center
  background-color: $dj-color-red
  outline: none
  span
    flex: 1
    text-align: center
    color: #ffffff
  &.btn-disable
    background-color: $dj-btn-disabled
</style>
