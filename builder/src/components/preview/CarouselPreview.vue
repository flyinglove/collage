<template>
  <div
    class="relative w-full overflow-hidden rounded-2xl shadow-inner h-full"
    :style="{ backgroundImage: `url(${currentSlide?.src ?? ''})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <div class="absolute inset-0 bg-slate-900/40" />
    <div class="relative h-full w-full flex flex-col items-center justify-center text-white text-center px-6 py-8 space-y-3">
      <span class="text-xs uppercase tracking-wide bg-white/20 px-3 py-1 rounded-full">轮播图预览</span>
      <h3 class="text-lg font-semibold leading-tight">{{ currentSlide?.alt || '轮播图' }}</h3>
      <p v-if="currentSlide?.caption" class="text-sm text-white/80">{{ currentSlide.caption }}</p>
    </div>
    <div
      v-if="node.props.showIndicators && node.props.slides.length > 1"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
    >
      <span
        v-for="(slide, index) in node.props.slides"
        :key="slide.src + index"
        class="h-1.5 w-6 rounded-full"
        :class="index === 0 ? 'bg-white' : 'bg-white/40'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CarouselNode } from '../../types';

const props = defineProps<{
  node: CarouselNode;
}>();

const currentSlide = computed(() => props.node.props.slides[0]);
</script>
