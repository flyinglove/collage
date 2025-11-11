<template>
  <div class="h-full grid grid-cols-[280px_1fr_320px] bg-slate-100">
    <aside class="border-r border-slate-200 bg-white flex flex-col">
      <header class="px-6 py-5 border-b border-slate-200">
        <h1 class="text-lg font-semibold">组件面板</h1>
        <p class="mt-1 text-sm text-slate-500">拖拽组件或容器到画布中</p>
      </header>
      <Palette class="flex-1 overflow-y-auto builder-scrollbar" />
      <footer class="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
        Collage Builder · Vue 3 + Vite
      </footer>
    </aside>

    <main class="relative">
      <div class="absolute inset-0 overflow-auto builder-scrollbar">
        <BuilderCanvas
          :root="rootNode"
          :selected-id="selectedId"
          class="p-8 min-h-full"
          @select="handleSelect"
          @drop-node="handleDrop"
        />
      </div>
      <div class="absolute left-1/2 top-6 -translate-x-1/2 z-10">
        <button
          class="rounded-full bg-blue-600 text-white text-sm px-4 py-2 shadow-lg shadow-blue-500/30 hover:bg-blue-500"
          @click="toggleExport"
        >
          {{ showExport ? '隐藏导出的 JSON' : '导出当前页面 JSON' }}
        </button>
      </div>
      <Transition name="fade">
        <pre
          v-if="showExport"
          class="absolute left-1/2 top-20 -translate-x-1/2 w-[640px] max-h-[60vh] overflow-auto bg-slate-900 text-slate-50 text-xs rounded-xl p-6 shadow-2xl builder-scrollbar"
        >{{ exportedJSON }}</pre>
      </Transition>
    </main>

    <aside class="border-l border-slate-200 bg-white flex flex-col">
      <header class="px-6 py-5 border-b border-slate-200">
        <h2 class="text-lg font-semibold">属性面板</h2>
        <p class="mt-1 text-sm text-slate-500">选中元素即可调整参数</p>
      </header>
      <InspectorPanel
        :node="selectedNode"
        class="flex-1 overflow-y-auto px-6 py-4 builder-scrollbar"
        @update-text="handleTextUpdate"
      />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BuilderCanvas from './components/BuilderCanvas.vue';
import InspectorPanel from './components/InspectorPanel.vue';
import Palette from './components/Palette.vue';
import { useBuilder } from './composables/useBuilder';
import type { ComponentType } from './types';

const { rootNode, selectedId, selectedNode, addChild, toJSON } = useBuilder();
const showExport = ref(false);

const exportedJSON = computed(() => JSON.stringify(toJSON(), null, 2));

function handleDrop({ targetId, type }: { targetId: string; type: ComponentType | 'container' }) {
  addChild(targetId, type);
}

function handleSelect(id: string) {
  selectedId.value = id;
}

function toggleExport() {
  showExport.value = !showExport.value;
}

function handleTextUpdate(newText: string) {
  if (selectedNode.value?.type === 'text') {
    selectedNode.value.props.text = newText;
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
