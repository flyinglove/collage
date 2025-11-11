<template>
  <main class="max-w-6xl mx-auto py-16 px-6">
    <header class="mb-12 text-center space-y-3">
      <p class="text-sm text-slate-500 uppercase tracking-[0.35em]">Collage Runtime</p>
      <h1 class="text-4xl font-bold">页面渲染预览</h1>
      <p class="text-slate-500">该页面根据搭建器导出的 JSON 动态渲染，可直接用于 SEO 友好的落地页。</p>
    </header>
    <section v-if="design" class="space-y-8">
      <RenderNode :node="design" />
    </section>
    <p v-else class="text-center text-slate-500">未找到页面配置，请确认 public/design.json 是否存在。</p>
  </main>
</template>

<script setup lang="ts">
import RenderNode from '~/components/RenderNode.vue';
import type { ContainerNode } from '~/types';

const { data: design } = await useAsyncData<ContainerNode>('design', () => $fetch('/design.json'));
</script>
