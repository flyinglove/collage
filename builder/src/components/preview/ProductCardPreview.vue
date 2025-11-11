<template>
  <article class="w-full rounded-3xl shadow-lg overflow-hidden border border-slate-100 bg-white">
    <div class="h-40 relative">
      <img :src="node.props.image" :alt="node.props.title" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
      <div class="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
        {{ node.props.price }}
      </div>
    </div>
    <div class="p-5 space-y-4" :style="{ background: node.props.background }">
      <header class="space-y-1">
        <h3 class="text-lg font-semibold text-slate-900">{{ node.props.title }}</h3>
        <p class="text-sm text-slate-600 overflow-hidden text-ellipsis" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
          {{ node.props.description }}
        </p>
      </header>
      <ul class="space-y-2 text-xs text-slate-600">
        <li v-for="feature in node.props.features" :key="feature.label" class="flex items-start gap-2">
          <span class="mt-1 text-green-500" aria-hidden="true">•</span>
          <span>{{ feature.label }}</span>
        </li>
      </ul>
      <div class="flex items-center justify-between text-xs text-slate-500">
        <span>评分：{{ node.props.rating.toFixed(1) }}</span>
        <span>评价：{{ node.props.reviewCount }}</span>
      </div>
      <div class="flex items-center justify-center">
        <span class="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
          {{ node.props.ctaLabel }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ProductCardNode } from '../../types';

const props = defineProps<{
  node: ProductCardNode;
}>();
</script>
