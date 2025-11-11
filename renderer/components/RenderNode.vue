<template>
  <component :is="component" />
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import type { PropType } from 'vue';
import type { DesignNode } from '../types';
import RenderButton from './elements/RenderButton.vue';
import RenderCarousel from './elements/RenderCarousel.vue';
import RenderContainer from './elements/RenderContainer.vue';
import RenderImage from './elements/RenderImage.vue';
import RenderNavbar from './elements/RenderNavbar.vue';
import RenderProductCard from './elements/RenderProductCard.vue';
import RenderText from './elements/RenderText.vue';

const props = defineProps({
  node: {
    type: Object as PropType<DesignNode>,
    required: true
  }
});

const component = computed(() => {
  switch (props.node.type) {
    case 'container':
      return h(RenderContainer, { node: props.node });
    case 'text':
      return h(RenderText, { node: props.node });
    case 'image':
      return h(RenderImage, { node: props.node });
    case 'button':
      return h(RenderButton, { node: props.node });
    case 'carousel':
      return h(RenderCarousel, { node: props.node });
    case 'navbar':
      return h(RenderNavbar, { node: props.node });
    case 'productCard':
      return h(RenderProductCard, { node: props.node });
    default:
      return h('div', '未知组件');
  }
});
</script>
