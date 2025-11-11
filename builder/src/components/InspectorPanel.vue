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

    <template v-else-if="node.type === 'carousel'">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <label class="label mb-0">轮播图幻灯片</label>
          <button class="text-xs text-blue-600 hover:text-blue-500" type="button" @click="addCarouselSlide">添加幻灯片</button>
        </div>
        <div v-if="node.props.slides.length" class="space-y-3">
          <article
            v-for="(slide, index) in node.props.slides"
            :key="slide.src + index"
            class="rounded-lg border border-slate-200 p-3 space-y-3"
          >
            <header class="flex items-center justify-between text-xs text-slate-500">
              <span>幻灯片 {{ index + 1 }}</span>
              <button
                class="text-red-500 hover:text-red-400"
                type="button"
                @click="removeCarouselSlide(index)"
              >
                删除
              </button>
            </header>
            <div class="space-y-2">
              <div>
                <label class="label">图片链接</label>
                <input v-model="slide.src" class="input" placeholder="https://" type="text" />
              </div>
              <div>
                <label class="label">图片说明</label>
                <input v-model="slide.alt" class="input" type="text" />
              </div>
              <div>
                <label class="label">字幕</label>
                <input v-model="slide.caption" class="input" placeholder="可选" type="text" />
              </div>
            </div>
          </article>
        </div>
        <div class="grid grid-cols-2 gap-4 items-end">
          <div>
            <label class="label mb-1">自动播放</label>
            <div class="flex items-center gap-2 text-xs text-slate-500">
              <input
                v-model="node.props.autoPlay"
                :id="`carousel-autoplay-${node.id}`"
                class="h-4 w-4"
                type="checkbox"
              />
              <label class="cursor-pointer" :for="`carousel-autoplay-${node.id}`">启用自动轮播</label>
            </div>
          </div>
          <div>
            <label class="label">间隔 (毫秒)</label>
            <input v-model.number="node.props.interval" class="input" min="2000" step="500" type="number" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-2">
            <input
              v-model="node.props.showIndicators"
              :id="`carousel-indicators-${node.id}`"
              class="h-4 w-4"
              type="checkbox"
            />
            <label class="text-xs text-slate-500" :for="`carousel-indicators-${node.id}`">显示指示器</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              v-model="node.props.showControls"
              :id="`carousel-controls-${node.id}`"
              class="h-4 w-4"
              type="checkbox"
            />
            <label class="text-xs text-slate-500" :for="`carousel-controls-${node.id}`">显示切换按钮</label>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">高度</label>
            <input v-model="node.props.height" class="input" placeholder="例如 360px" />
          </div>
          <div>
            <label class="label">圆角 (px)</label>
            <input v-model.number="node.props.radius" class="input" min="0" type="number" />
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="node.type === 'navbar'">
      <div class="space-y-4">
        <div>
          <label class="label">Logo 文案</label>
          <input v-model="node.props.logoText" class="input" type="text" />
        </div>
        <div>
          <label class="label">Logo 图片 (可选)</label>
          <input v-model="node.props.logoImage" class="input" placeholder="https://" type="text" />
        </div>
        <div class="flex items-center justify-between">
          <label class="label mb-0">导航链接</label>
          <button class="text-xs text-blue-600 hover:text-blue-500" type="button" @click="addNavbarLink">添加链接</button>
        </div>
        <div v-if="node.props.links.length" class="space-y-3">
          <article
            v-for="(link, index) in node.props.links"
            :key="link.label + index"
            class="rounded-lg border border-slate-200 p-3 space-y-3"
          >
            <header class="flex items-center justify-between text-xs text-slate-500">
              <span>链接 {{ index + 1 }}</span>
              <button class="text-red-500 hover:text-red-400" type="button" @click="removeNavbarLink(index)">删除</button>
            </header>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">标题</label>
                <input v-model="link.label" class="input" type="text" />
              </div>
              <div>
                <label class="label">链接</label>
                <input v-model="link.href" class="input" placeholder="#" type="text" />
              </div>
            </div>
          </article>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">CTA 文案</label>
            <input v-model="node.props.ctaLabel" class="input" placeholder="可选" type="text" />
          </div>
          <div>
            <label class="label">CTA 链接</label>
            <input v-model="node.props.ctaHref" class="input" placeholder="#" type="text" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">背景颜色</label>
            <input v-model="node.props.background" class="input" type="color" />
          </div>
          <div>
            <label class="label">文字颜色</label>
            <input v-model="node.props.textColor" class="input" type="color" />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <input
            v-model="node.props.sticky"
            :id="`navbar-sticky-${node.id}`"
            class="h-4 w-4"
            type="checkbox"
          />
          <label class="text-xs text-slate-500" :for="`navbar-sticky-${node.id}`">滚动时保持吸顶</label>
        </div>
      </div>
    </template>

    <template v-else-if="node.type === 'productCard'">
      <div class="space-y-4">
        <div>
          <label class="label">标题</label>
          <input v-model="node.props.title" class="input" type="text" />
        </div>
        <div>
          <label class="label">描述</label>
          <textarea v-model="node.props.description" class="input resize-none" rows="3"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">价格</label>
            <input v-model="node.props.price" class="input" type="text" />
          </div>
          <div>
            <label class="label">主图链接</label>
            <input v-model="node.props.image" class="input" placeholder="https://" type="text" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">评分</label>
            <input v-model.number="node.props.rating" class="input" max="5" min="0" step="0.1" type="number" />
          </div>
          <div>
            <label class="label">评价数量</label>
            <input v-model.number="node.props.reviewCount" class="input" min="0" type="number" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">CTA 文案</label>
            <input v-model="node.props.ctaLabel" class="input" type="text" />
          </div>
          <div>
            <label class="label">CTA 链接</label>
            <input v-model="node.props.ctaHref" class="input" placeholder="#" type="text" />
          </div>
        </div>
        <div>
          <label class="label">背景颜色</label>
          <input v-model="node.props.background" class="input" type="color" />
        </div>
        <div class="flex items-center justify-between">
          <label class="label mb-0">商品亮点</label>
          <button class="text-xs text-blue-600 hover:text-blue-500" type="button" @click="addProductFeature">添加亮点</button>
        </div>
        <div v-if="node.props.features.length" class="space-y-3">
          <article
            v-for="(feature, index) in node.props.features"
            :key="feature.label + index"
            class="rounded-lg border border-slate-200 p-3 space-y-2"
          >
            <header class="flex items-center justify-between text-xs text-slate-500">
              <span>亮点 {{ index + 1 }}</span>
              <button class="text-red-500 hover:text-red-400" type="button" @click="removeProductFeature(index)">删除</button>
            </header>
            <input v-model="feature.label" class="input" placeholder="例如：支持无线充电" type="text" />
          </article>
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
    case 'carousel':
      return '轮播图组件';
    case 'navbar':
      return '导航栏组件';
    case 'productCard':
      return '商品卡片组件';
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

function addCarouselSlide() {
  if (props.node?.type !== 'carousel') return;
  props.node.props.slides.push({ src: '', alt: '', caption: '' });
}

function removeCarouselSlide(index: number) {
  if (props.node?.type !== 'carousel') return;
  props.node.props.slides.splice(index, 1);
}

function addNavbarLink() {
  if (props.node?.type !== 'navbar') return;
  props.node.props.links.push({ label: '新链接', href: '#' });
}

function removeNavbarLink(index: number) {
  if (props.node?.type !== 'navbar') return;
  props.node.props.links.splice(index, 1);
}

function addProductFeature() {
  if (props.node?.type !== 'productCard') return;
  props.node.props.features.push({ label: '新的卖点' });
}

function removeProductFeature(index: number) {
  if (props.node?.type !== 'productCard') return;
  props.node.props.features.splice(index, 1);
}
</script>

<style scoped>
.label {
  @apply block text-xs font-medium text-slate-500 mb-2;
}

.input {
  @apply w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100;
}
</style>
