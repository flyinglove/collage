<template>
  <section v-if="node" class="space-y-6">
    <header>
      <p class="text-sm font-semibold text-slate-700">{{ title }}</p>
      <p class="text-xs text-slate-500">ID：{{ node.id }}</p>
    </header>

    <template v-if="node.type === 'container'">
      <div class="space-y-4">
        <div>
          <label class="label">容器名称</label>
          <input v-model="node.props.name" class="input" type="text" />
        </div>
        <div>
          <label class="label">布局方向</label>
          <select v-model="node.props.layout" class="input">
            <option value="vertical">纵向</option>
            <option value="horizontal">横向</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">主轴对齐</label>
            <select v-model="node.props.justify" class="input">
              <option value="start">头部</option>
              <option value="center">居中</option>
              <option value="end">尾部</option>
              <option value="between">两端对齐</option>
              <option value="around">环绕</option>
            </select>
          </div>
          <div>
            <label class="label">交叉轴</label>
            <select v-model="node.props.align" class="input">
              <option value="stretch">拉伸</option>
              <option value="start">头部</option>
              <option value="center">居中</option>
              <option value="end">尾部</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">间距 (px)</label>
            <input v-model.number="node.props.gap" class="input" min="0" type="number" />
          </div>
          <div>
            <label class="label">内边距 (px)</label>
            <input v-model.number="node.props.padding" class="input" min="0" type="number" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">宽度</label>
            <input v-model="node.props.width" class="input" placeholder="例如 100% 或 320px" />
          </div>
          <div>
            <label class="label">高度</label>
            <input v-model="node.props.height" class="input" placeholder="例如 auto 或 480px" />
          </div>
        </div>
        <div>
          <label class="label">交叉轴定位</label>
          <select v-model="node.props.alignSelf" class="input">
            <option value="auto">自动</option>
            <option value="stretch">拉伸</option>
            <option value="start">头部</option>
            <option value="center">居中</option>
            <option value="end">尾部</option>
          </select>
        </div>
      </div>
    </template>

    <template v-else-if="node.type === 'text'">
      <div class="space-y-4">
        <div>
          <label class="label">文本内容</label>
          <textarea v-model="textValue" class="input resize-none" rows="4" @blur="emit('update-text', textValue)"></textarea>
        </div>
        <div>
          <label class="label">字体大小</label>
          <input v-model.number="node.props.fontSize" class="input" min="12" type="number" />
        </div>
        <div>
          <label class="label">对齐方式</label>
          <select v-model="node.props.align" class="input">
            <option value="left">左对齐</option>
            <option value="center">居中</option>
            <option value="right">右对齐</option>
          </select>
        </div>
        <div>
          <label class="label">字体颜色</label>
          <input v-model="node.props.color" class="input" type="color" />
        </div>
      </div>
    </template>

    <template v-else-if="node.type === 'image'">
      <div class="space-y-4">
        <div>
          <label class="label">图片链接</label>
          <input v-model="node.props.src" class="input" type="text" placeholder="https://" />
        </div>
        <div>
          <label class="label">说明文字</label>
          <input v-model="node.props.alt" class="input" type="text" />
        </div>
        <div>
          <label class="label">填充方式</label>
          <select v-model="node.props.objectFit" class="input">
            <option value="cover">充满容器</option>
            <option value="contain">完整显示</option>
          </select>
        </div>
        <div>
          <label class="label">圆角 (px)</label>
          <input v-model.number="node.props.radius" class="input" min="0" type="number" />
        </div>
      </div>
    </template>

    <template v-else-if="node.type === 'button'">
      <div class="space-y-4">
        <div>
          <label class="label">按钮文案</label>
          <input v-model="node.props.label" class="input" type="text" />
        </div>
        <div>
          <label class="label">跳转链接</label>
          <input v-model="node.props.action" class="input" type="text" placeholder="#" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">背景色</label>
            <input v-model="node.props.background" class="input" type="color" />
          </div>
          <div>
            <label class="label">文字颜色</label>
            <input v-model="node.props.color" class="input" type="color" />
          </div>
        </div>
      </div>
    </template>
  </section>
  <p v-else class="text-sm text-slate-400">请选择一个元素进行配置。</p>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { DesignNode } from '../types';

const props = defineProps<{
  node: DesignNode | undefined;
}>();

const emit = defineEmits<{
  (e: 'update-text', value: string): void;
}>();

const title = computed(() => {
  if (!props.node) return '未选择元素';
  switch (props.node.type) {
    case 'container':
      return props.node.props.name || '容器';
    case 'text':
      return '文本组件';
    case 'image':
      return '图片组件';
    case 'button':
      return '按钮组件';
    default:
      return '元素配置';
  }
});

const textValue = ref('');

watch(
  () => props.node,
  (node) => {
    if (node?.type === 'text') {
      textValue.value = node.props.text;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.label {
  @apply block text-xs font-medium text-slate-500 mb-2;
}

.input {
  @apply w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100;
}
</style>
