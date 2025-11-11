<template>
  <header :class="headerClass" :style="{ background: node.props.background, color: node.props.textColor }">
    <div class="max-w-6xl mx-auto flex items-center justify-between gap-8 py-4 px-6">
      <div class="flex items-center gap-3">
        <img
          v-if="node.props.logoImage"
          :src="node.props.logoImage"
          :alt="node.props.logoText"
          class="h-10 w-10 object-cover rounded-full"
        />
        <span class="text-xl font-semibold">{{ node.props.logoText }}</span>
      </div>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
        <a
          v-for="link in node.props.links"
          :key="link.label + link.href"
          :href="link.href"
          class="transition-colors hover:text-blue-600"
        >
          {{ link.label }}
        </a>
      </nav>
      <a
        v-if="node.props.ctaLabel && node.props.ctaHref"
        :href="node.props.ctaHref"
        class="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 transition"
      >
        {{ node.props.ctaLabel }}
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NavbarNode } from '../../types';

const props = defineProps<{ node: NavbarNode }>();

const headerClass = computed(() => {
  const classes = ['w-full shadow-sm'];
  if (props.node.props.sticky) {
    classes.push('sticky top-0 z-50 backdrop-blur');
  }
  return classes.join(' ');
});
</script>
