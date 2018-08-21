<template>
  <div class="panel">
    <div class="panel--top">
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>
    <div class="panel--content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Panel'
  }
</script>

<style lang="stylus" scoped>
.panel
  &--top
    display flex
    justify-content space-between
    align-items center
    padding: 16px 15px 14px
</style>
