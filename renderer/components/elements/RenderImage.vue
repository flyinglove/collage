<template>
  <figure class="w-full h-full">
    <img
      :src="node.props.src"
      :alt="node.props.alt"
      class="w-full h-full"
      :style="{ objectFit: node.props.objectFit, borderRadius: `${node.props.radius}px` }"
      loading="lazy"
    />
  </figure>
</template>

<script setup lang="ts">
import type { ImageNode } from '../../types';

const props = defineProps<{ node: ImageNode }>();
</script>
