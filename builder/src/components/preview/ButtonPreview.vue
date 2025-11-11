<template>
  <div class="flex items-center justify-center h-full w-full">
    <a
      class="inline-flex items-center justify-center rounded-full px-6 py-3 font-medium shadow-md hover:shadow-lg transition"
      :style="{ background: node.props.background, color: node.props.color }"
      :href="node.props.action"
    >
      {{ node.props.label }}
    </a>
  </div>
</template>

<script setup lang="ts">
import type { ButtonNode } from '../../types';

const props = defineProps<{
  node: ButtonNode;
}>();
</script>
