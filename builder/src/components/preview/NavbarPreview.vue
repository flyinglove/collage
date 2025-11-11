<template>
  <header class="w-full rounded-xl shadow bg-white" :style="{ background: node.props.background, color: node.props.textColor }">
    <div class="px-6 py-4 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div
          class="h-10 w-10 rounded-full bg-white/40 flex items-center justify-center text-sm font-semibold text-slate-700"
        >
          {{ logoInitials }}
        </div>
        <span class="text-base font-semibold">{{ node.props.logoText }}</span>
      </div>
      <nav class="hidden md:flex items-center gap-4 text-xs font-medium">
        <span v-for="link in node.props.links" :key="link.label + link.href" class="px-2 py-1 rounded-full bg-black/5">
          {{ link.label }}
        </span>
      </nav>
      <span
        v-if="node.props.ctaLabel"
        class="inline-flex items-center justify-center rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white"
      >
        {{ node.props.ctaLabel }}
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NavbarNode } from '../../types';

const props = defineProps<{
  node: NavbarNode;
}>();

const logoInitials = computed(() => props.node.props.logoText.slice(0, 2).toUpperCase());
</script>
