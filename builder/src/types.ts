export type ComponentType =
  | 'text'
  | 'image'
  | 'button'
  | 'carousel'
  | 'navbar'
  | 'productCard';

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
  alignSelf: 'auto' | 'stretch' | 'start' | 'center' | 'end';
}

export interface ContainerNode extends BaseNode<'container', ContainerProps> {
  children: DesignNode[];
}

export interface TextNode extends BaseNode<'text', { text: string; align: 'left' | 'center' | 'right'; fontSize: number; color: string }> {}

export interface ImageNode extends BaseNode<'image', { src: string; alt: string; objectFit: 'cover' | 'contain'; radius: number }> {}

export interface ButtonNode extends BaseNode<'button', { label: string; action: string; background: string; color: string }> {}

export interface CarouselSlide {
  src: string;
  alt: string;
  caption?: string;
}

export interface CarouselNode
  extends BaseNode<
    'carousel',
    {
      slides: CarouselSlide[];
      autoPlay: boolean;
      interval: number;
      showIndicators: boolean;
      showControls: boolean;
      height: string;
      radius: number;
    }
  > {}

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarNode
  extends BaseNode<
    'navbar',
    {
      logoText: string;
      logoImage?: string;
      links: NavbarLink[];
      ctaLabel?: string;
      ctaHref?: string;
      background: string;
      textColor: string;
      sticky: boolean;
    }
  > {}

export interface ProductFeature {
  label: string;
}

export interface ProductCardNode
  extends BaseNode<
    'productCard',
    {
      title: string;
      description: string;
      price: string;
      image: string;
      rating: number;
      reviewCount: number;
      ctaLabel: string;
      ctaHref: string;
      features: ProductFeature[];
      background: string;
    }
  > {}

export type DesignNode =
  | ContainerNode
  | TextNode
  | ImageNode
  | ButtonNode
  | CarouselNode
  | NavbarNode
  | ProductCardNode;

export interface PaletteItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  type: 'container' | ComponentType;
}
