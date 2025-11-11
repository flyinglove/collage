<template>
  <article
    class="relative rounded-xl border border-transparent hover:border-blue-400 transition flex-1 min-h-[120px]"
    :class="{ 'ring-2 ring-blue-500': isSelected }"
    @click.stop="emit('select', node.id)"
  >
    <component :is="componentName" :node="node" />
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DesignNode } from '../types';
import ButtonPreview from './preview/ButtonPreview.vue';
import CarouselPreview from './preview/CarouselPreview.vue';
import ImagePreview from './preview/ImagePreview.vue';
import NavbarPreview from './preview/NavbarPreview.vue';
import ProductCardPreview from './preview/ProductCardPreview.vue';
import TextPreview from './preview/TextPreview.vue';

const props = defineProps<{
  node: DesignNode;
  selectedId: string;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
}>();

const map = {
  text: TextPreview,
  image: ImagePreview,
  button: ButtonPreview,
  carousel: CarouselPreview,
  navbar: NavbarPreview,
  productCard: ProductCardPreview
} as const;

const isSelected = computed(() => props.node.id === props.selectedId);

const componentName = computed(() => map[props.node.type as keyof typeof map]);
</script>
