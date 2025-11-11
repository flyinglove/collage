export type ComponentType = 'text' | 'image' | 'button';

export interface BaseNode<TType extends string = string, TProps extends Record<string, unknown> = Record<string, unknown>> {
  id: string;
  type: TType;
  props: TProps;
}

export interface ContainerProps {
  name: string;
  layout: 'vertical' | 'horizontal';
  align: 'stretch' | 'start' | 'center' | 'end';
  justify: 'start' | 'center' | 'end' | 'between' | 'around';
  gap: number;
  padding: number;
  width: string;
  height: string;
  background: string;
}

export interface ContainerNode extends BaseNode<'container', ContainerProps> {
  children: DesignNode[];
}

export interface TextNode extends BaseNode<'text', { text: string; align: 'left' | 'center' | 'right'; fontSize: number; color: string }> {}

export interface ImageNode extends BaseNode<'image', { src: string; alt: string; objectFit: 'cover' | 'contain'; radius: number }> {}

export interface ButtonNode extends BaseNode<'button', { label: string; action: string; background: string; color: string }> {}

export type DesignNode = ContainerNode | TextNode | ImageNode | ButtonNode;
