<template>
  <div class="flex items-center justify-center w-full h-full">
    <a
      :href="node.props.action"
      class="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold shadow-lg transition hover:-translate-y-0.5"
      :style="{ background: node.props.background, color: node.props.color }"
    >
      {{ node.props.label }}
    </a>
  </div>
</template>

<script setup lang="ts">
import type { ButtonNode } from '../../types';

const props = defineProps<{ node: ButtonNode }>();
</script>
