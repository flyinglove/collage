import { computed, reactive, ref } from 'vue';
import { v4 as uuid } from 'uuid';
import type { ButtonNode, ComponentType, ContainerNode, ContainerProps, DesignNode, ImageNode, PaletteItem, TextNode } from '../types';

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
  background: '#ffffff'
});

const rootNode: ContainerNode = reactive({
  id: uuid(),
  type: 'container',
  props: {
    ...defaultContainerProps(),
    name: '页面根容器',
    padding: 24,
    background: '#f8fafc'
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
