import { computed, reactive, ref } from 'vue';
import { v4 as uuid } from 'uuid';
import type {
  ButtonNode,
  CarouselNode,
  ComponentType,
  ContainerNode,
  ContainerProps,
  DesignNode,
  ImageNode,
  NavbarNode,
  PaletteItem,
  ProductCardNode,
  TextNode
} from '../types';

const palette: PaletteItem[] = [
  {
    id: 'container',
    label: '容器',
    description: '用于布局的可嵌套容器',
    icon: 'mdi-grid',
    type: 'container'
  },
  {
    id: 'text',
    label: '文本',
    description: '支持编辑内容与字体的文本块',
    icon: 'mdi-format-text',
    type: 'text'
  },
  {
    id: 'image',
    label: '图片',
    description: '配置链接与填充方式的图片',
    icon: 'mdi-image',
    type: 'image'
  },
  {
    id: 'button',
    label: '按钮',
    description: '可配置颜色与动作的按钮',
    icon: 'mdi-gesture-tap-button',
    type: 'button'
  },
  {
    id: 'carousel',
    label: '轮播图',
    description: '展示多张图片并可自动轮播',
    icon: 'mdi-view-carousel',
    type: 'carousel'
  },
  {
    id: 'navbar',
    label: '导航栏',
    description: '包含 Logo 和导航链接的顶部栏',
    icon: 'mdi-menu',
    type: 'navbar'
  },
  {
    id: 'product-card',
    label: '商品卡片',
    description: '展示商品信息、价格与亮点',
    icon: 'mdi-package-variant',
    type: 'productCard'
  }
];

const defaultContainerProps = (): ContainerProps => ({
  name: '容器',
  layout: 'vertical',
  align: 'stretch',
  justify: 'start',
  gap: 12,
  padding: 16,
  width: '100%',
  height: 'auto',
  alignSelf: 'stretch'
});

const rootNode: ContainerNode = reactive({
  id: uuid(),
  type: 'container',
  props: {
    ...defaultContainerProps(),
    name: '页面根容器',
    padding: 24
  },
  children: []
});

const selectedId = ref(rootNode.id);

function createNode(type: 'container' | ComponentType): DesignNode {
  if (type === 'container') {
    return reactive({
      id: uuid(),
      type: 'container',
      props: defaultContainerProps(),
      children: []
    }) as ContainerNode;
  }

  if (type === 'text') {
    return reactive({
      id: uuid(),
      type: 'text',
      props: {
        text: '双击编辑文本',
        align: 'left',
        fontSize: 18,
        color: '#0f172a'
      }
    }) as TextNode;
  }

  if (type === 'image') {
    return reactive({
      id: uuid(),
      type: 'image',
      props: {
        src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
        alt: '示例图片',
        objectFit: 'cover',
        radius: 12
      }
    }) as ImageNode;
  }

  if (type === 'button') {
    return reactive({
      id: uuid(),
      type: 'button',
      props: {
        label: '立即行动',
        action: '#',
        background: '#2563eb',
        color: '#ffffff'
      }
    }) as ButtonNode;
  }

  if (type === 'carousel') {
    return reactive({
      id: uuid(),
      type: 'carousel',
      props: {
        slides: [
          {
            src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
            alt: '团队协作',
            caption: '打造高效团队协作体验'
          },
          {
            src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
            alt: '产品演示',
            caption: '展示产品核心亮点'
          },
          {
            src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
            alt: '品牌形象'
          }
        ],
        autoPlay: true,
        interval: 4000,
        showIndicators: true,
        showControls: true,
        height: '360px',
        radius: 16
      }
    }) as CarouselNode;
  }

  if (type === 'navbar') {
    return reactive({
      id: uuid(),
      type: 'navbar',
      props: {
        logoText: 'Collage',
        links: [
          { label: '产品', href: '#product' },
          { label: '方案', href: '#solutions' },
          { label: '价格', href: '#pricing' },
          { label: '博客', href: '#blog' }
        ],
        ctaLabel: '免费试用',
        ctaHref: '#',
        background: '#ffffff',
        textColor: '#0f172a',
        sticky: false
      }
    }) as NavbarNode;
  }

  return reactive({
    id: uuid(),
    type: 'productCard',
    props: {
      title: '旗舰智能耳机',
      description: '全新主动降噪与空间音频体验，带来沉浸式音乐享受。',
      price: '¥1999',
      image:
        'https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1200&q=80',
      rating: 4.8,
      reviewCount: 328,
      ctaLabel: '立即购买',
      ctaHref: '#',
      features: [
        { label: '智能降噪 Pro' },
        { label: '续航 28 小时' },
        { label: '无线充电' }
      ],
      background: '#ffffff'
    }
  }) as ProductCardNode;
}

function traverse(node: DesignNode, targetId: string, cb: (node: DesignNode, parent?: ContainerNode) => void, parent?: ContainerNode) {
  if (node.id === targetId) {
    cb(node, parent);
    return true;
  }

  if (node.type === 'container') {
    for (const child of node.children) {
      if (traverse(child, targetId, cb, node)) {
        return true;
      }
    }
  }

  return false;
}

function findNode(targetId: string) {
  let found: DesignNode | undefined;
  traverse(rootNode, targetId, (node) => {
    found = node;
  });
  return found;
}

function addChild(targetId: string, type: 'container' | ComponentType) {
  const parent = findNode(targetId);
  if (!parent || parent.type !== 'container') return;
  const node = createNode(type);
  parent.children.push(node);
  selectedId.value = node.id;
}

function removeNode(targetId: string) {
  if (targetId === rootNode.id) return;
  traverse(rootNode, targetId, (node, parent) => {
    if (!parent) return;
    parent.children = parent.children.filter((child) => child.id !== node.id);
    selectedId.value = parent.id;
  });
}

function toJSON() {
  return JSON.parse(JSON.stringify(rootNode));
}

const selectedNode = computed(() => findNode(selectedId.value) ?? rootNode);

export function useBuilder() {
  return {
    palette,
    rootNode,
    selectedId,
    selectedNode,
    addChild,
    removeNode,
    toJSON
  };
}
