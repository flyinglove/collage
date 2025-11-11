<template>
  <section :style="containerStyle">
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

const selfAlignMap = {
  auto: 'auto',
  stretch: 'stretch',
  start: 'flex-start',
  center: 'center',
  end: 'flex-end'
} as const;

const containerStyle = computed(() => {
  const width = props.node.props.width;
  const isFlexible = width === 'auto' || width === '' || width === '100%';
  return {
    display: 'flex',
    flexDirection: props.node.props.layout === 'vertical' ? 'column' : 'row',
    gap: `${props.node.props.gap}px`,
    padding: `${props.node.props.padding}px`,
    justifyContent: justifyMap[props.node.props.justify],
    alignItems: alignMap[props.node.props.align],
    width,
    height: props.node.props.height,
    alignSelf: selfAlignMap[props.node.props.alignSelf],
    flex: isFlexible ? '1 1 0%' : '0 0 auto'
  };
});
</script>
