<template>
  <div
    class="rounded-2xl border border-dashed border-slate-300 bg-white"
    :class="{ 'ring-2 ring-blue-500 border-transparent': isSelected }"
    :style="containerStyle"
    @click.stop="handleSelect"
    @dragover.prevent
    @drop.stop.prevent="handleDrop"
  >
    <header class="flex items-center justify-between px-4 py-2 bg-slate-100 rounded-t-2xl">
      <div class="flex items-center space-x-2 text-xs text-slate-500 uppercase">
        <span class="font-semibold text-slate-700">{{ node.props.name }}</span>
        <span>容器</span>
      </div>
      <button
        class="text-xs text-blue-600 hover:text-blue-500"
        type="button"
        @click.stop="emit('select', node.id)"
      >
        配置
      </button>
    </header>
    <section class="relative min-h-[160px] rounded-b-2xl" :style="bodyStyle">
      <template v-if="node.children.length">
        <template v-for="child in node.children" :key="child.id">
          <div class="flex-1 min-h-[120px]">
            <ContainerNode
              v-if="child.type === 'container'"
              :node="child"
              :selected-id="selectedId"
              @select="emit('select', $event)"
              @drop-node="emit('drop-node', $event)"
            />
            <LeafNode v-else :node="child" :selected-id="selectedId" @select="emit('select', $event)" />
          </div>
        </template>
      </template>
      <div v-else class="flex h-full items-center justify-center text-xs text-slate-400">
        将组件拖拽到这里
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ContainerNode as ContainerType } from '../types';
import LeafNode from './LeafNode.vue';

defineOptions({
  name: 'ContainerNode'
});

const props = defineProps<{
  node: ContainerType;
  selectedId: string;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'drop-node', payload: { targetId: string; type: string }): void;
}>();

const isSelected = computed(() => props.selectedId === props.node.id);

const containerStyle = computed(() => ({
  width: props.node.props.width,
  height: props.node.props.height,
  background: props.node.props.background
}));

const justifyMap: Record<ContainerType['props']['justify'], string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around'
};

const alignMap: Record<ContainerType['props']['align'], string> = {
  stretch: 'stretch',
  start: 'flex-start',
  center: 'center',
  end: 'flex-end'
};

const bodyStyle = computed(() => ({
  display: 'flex',
  flex: '1 1 0%',
  flexDirection: props.node.props.layout === 'vertical' ? 'column' : 'row',
  gap: `${props.node.props.gap}px`,
  padding: `${props.node.props.padding}px`,
  justifyContent: justifyMap[props.node.props.justify],
  alignItems: alignMap[props.node.props.align]
}));

function handleDrop(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/x-collage-node');
  if (!type) return;
  emit('select', props.node.id);
  emit('drop-node', { targetId: props.node.id, type });
}

function handleSelect() {
  emit('select', props.node.id);
}
</script>
