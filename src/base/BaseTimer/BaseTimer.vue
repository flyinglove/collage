<template>
  <div class="base-timer">
    <span>{{time.hours}}</span>
    <span>{{time.minutes}}</span>
    <span>{{time.seconds}}</span>
  </div>
</template>

<script>
  export default {
    name: 'base-timer',
    props: {
      end: {
        type: Number,
        default: -1
      },
      start: {
        type: Number,
        default: -1
      }
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
