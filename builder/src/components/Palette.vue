<template>
  <ul class="divide-y divide-slate-100">
    <li
      v-for="item in palette"
      :key="item.id"
      class="px-6 py-4 hover:bg-slate-50 cursor-grab active:cursor-grabbing"
      draggable="true"
      @dragstart="onDragStart($event, item.type)"
    >
      <p class="text-sm font-medium">{{ item.label }}</p>
      <p class="mt-1 text-xs text-slate-500">{{ item.description }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useBuilder } from '../composables/useBuilder';
import type { ComponentType } from '../types';

const emit = defineEmits<{
  (e: 'drag-start', type: ComponentType | 'container'): void;
}>();

const { palette } = useBuilder();

function onDragStart(event: DragEvent, type: ComponentType | 'container') {
  event.dataTransfer?.setData('application/x-collage-node', type);
  event.dataTransfer?.setData('text/plain', type);
  emit('drag-start', type);
}
</script>
