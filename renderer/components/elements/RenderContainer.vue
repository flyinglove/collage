<template>
  <section :style="containerStyle" class="rounded-3xl shadow-sm border border-slate-200 bg-white">
    <template v-if="node.children?.length">
      <RenderNode v-for="child in node.children" :key="child.id" :node="child" />
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ContainerNode } from '../../types';
import RenderNode from '../RenderNode.vue';

const props = defineProps<{ node: ContainerNode }>();

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around'
} as const;

const alignMap = {
  stretch: 'stretch',
  start: 'flex-start',
  center: 'center',
  end: 'flex-end'
} as const;

const containerStyle = computed(() => ({
  display: 'flex',
  flexDirection: props.node.props.layout === 'vertical' ? 'column' : 'row',
  gap: `${props.node.props.gap}px`,
  padding: `${props.node.props.padding}px`,
  justifyContent: justifyMap[props.node.props.justify],
  alignItems: alignMap[props.node.props.align],
  width: props.node.props.width,
  height: props.node.props.height,
  background: props.node.props.background,
  flex: '1 1 0%'
}));
</script>
