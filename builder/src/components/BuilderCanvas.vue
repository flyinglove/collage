<template>
  <section class="space-y-4">
    <ContainerNode
      :node="root"
      :selected-id="selectedId"
      class="shadow-xl"
      @select="emit('select', $event)"
      @drop-node="emit('drop-node', $event)"
    />
  </section>
</template>

<script setup lang="ts">
import ContainerNode from './ContainerNode.vue';
import type { ContainerNode as ContainerType } from '../types';

interface Props {
  root: ContainerType;
  selectedId: string;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'drop-node', payload: { targetId: string; type: string }): void;
}>();
</script>
