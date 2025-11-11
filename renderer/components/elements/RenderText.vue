<template>
  <p :style="style" class="w-full h-full flex items-center justify-center text-center">
    {{ node.props.text }}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TextNode } from '../../types';

const props = defineProps<{ node: TextNode }>();

const style = computed(() => ({
  fontSize: `${props.node.props.fontSize}px`,
  color: props.node.props.color,
  textAlign: props.node.props.align
}));
</script>
