<template>
  <div class="h-full w-full">
    <p :class="classes" :style="style">{{ node.props.text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TextNode } from '../../types';

const props = defineProps<{
  node: TextNode;
}>();

const classes = computed(() => [
  'w-full h-full flex items-center justify-center rounded-xl px-4 text-center'
]);

const style = computed(() => ({
  fontSize: `${props.node.props.fontSize}px`,
  color: props.node.props.color,
  textAlign: props.node.props.align
}));
</script>
