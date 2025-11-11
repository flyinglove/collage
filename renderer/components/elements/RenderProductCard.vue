<template>
  <article
    class="w-full max-w-4xl mx-auto rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-[1.2fr_1fr]"
    :style="{ background: node.props.background }"
  >
    <div class="relative h-72 md:h-full">
      <img :src="node.props.image" :alt="node.props.title" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
      <div class="absolute top-4 left-4 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold text-slate-700">
        {{ node.props.price }}
      </div>
    </div>
    <div class="p-8 space-y-6 flex flex-col justify-between">
      <header class="space-y-2">
        <h3 class="text-2xl font-semibold text-slate-900">{{ node.props.title }}</h3>
        <p class="text-slate-600">{{ node.props.description }}</p>
        <div class="flex items-center gap-2 text-amber-500">
          <span class="font-semibold">{{ node.props.rating.toFixed(1) }}</span>
          <div class="flex items-center" aria-hidden="true">
            <span v-for="index in 5" :key="`star-${index}`" class="inline-block">
              <svg
                v-if="index <= Math.round(node.props.rating)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4 text-slate-300"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </span>
          </div>
          <span class="text-sm text-slate-500">({{ node.props.reviewCount }} 条评价)</span>
        </div>
      </header>

      <ul class="space-y-2 text-sm text-slate-600">
        <li v-for="feature in node.props.features" :key="feature.label" class="flex items-start gap-2">
          <span class="mt-1 text-green-500" aria-hidden="true">•</span>
          <span>{{ feature.label }}</span>
        </li>
      </ul>

      <a
        :href="node.props.ctaHref"
        class="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-700 transition"
      >
        {{ node.props.ctaLabel }}
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ProductCardNode } from '../../types';

const props = defineProps<{ node: ProductCardNode }>();
</script>
