<template>
  <div
    class="relative overflow-hidden w-full"
    :style="{ height: node.props.height, borderRadius: `${node.props.radius}px` }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <TransitionGroup name="carousel" tag="div" class="relative w-full h-full">
      <figure v-for="(slide, index) in node.props.slides" :key="slide.src" v-show="index === currentIndex"
        class="absolute inset-0 w-full h-full">
        <img :src="slide.src" :alt="slide.alt" class="w-full h-full object-cover" />
        <figcaption
          v-if="slide.caption"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm"
        >
          {{ slide.caption }}
        </figcaption>
      </figure>
    </TransitionGroup>

    <button
      v-if="node.props.showControls && node.props.slides.length > 1"
      type="button"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-2 transition"
      @click="prevSlide"
      aria-label="上一张"
    >
      ‹
    </button>
    <button
      v-if="node.props.showControls && node.props.slides.length > 1"
      type="button"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-2 transition"
      @click="nextSlide"
      aria-label="下一张"
    >
      ›
    </button>

    <div
      v-if="node.props.showIndicators && node.props.slides.length > 1"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
    >
      <button
        v-for="(slide, index) in node.props.slides"
        :key="slide.src + index"
        type="button"
        class="h-2 w-2 rounded-full transition"
        :class="index === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'"
        @click="goToSlide(index)"
        :aria-label="`跳转到第 ${index + 1} 张`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CarouselNode } from '../../types';

const props = defineProps<{ node: CarouselNode }>();

const currentIndex = ref(0);
const isHovered = ref(false);
const intervalId = ref<number | null>(null);

const slideCount = computed(() => props.node.props.slides.length);
const interval = computed(() => Math.max(props.node.props.interval, 2000));

const startAutoPlay = () => {
  if (!props.node.props.autoPlay || slideCount.value <= 1) {
    return;
  }
  stopAutoPlay();
  intervalId.value = window.setInterval(() => {
    nextSlide();
  }, interval.value);
};

const stopAutoPlay = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

const nextSlide = () => {
  if (!slideCount.value) {
    return;
  }
  currentIndex.value = (currentIndex.value + 1) % slideCount.value;
};

const prevSlide = () => {
  if (!slideCount.value) {
    return;
  }
  currentIndex.value = (currentIndex.value - 1 + slideCount.value) % slideCount.value;
};

const goToSlide = (index: number) => {
  if (!slideCount.value) {
    return;
  }
  currentIndex.value = index % slideCount.value;
};

const handleMouseEnter = () => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
};

watch(isHovered, (value) => {
  if (value) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
});

watch(
  () => props.node.props.autoPlay,
  (value) => {
    if (value) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
  }
);

watch(
  () => props.node.props.interval,
  () => {
    startAutoPlay();
  }
);

watch(
  slideCount,
  (count) => {
    if (count <= 1) {
      currentIndex.value = 0;
      stopAutoPlay();
    } else if (currentIndex.value >= count) {
      currentIndex.value = 0;
    }
  }
);

onMounted(() => {
  startAutoPlay();
});

onBeforeUnmount(() => {
  stopAutoPlay();
});

</script>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.4s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}

figure {
  transition: opacity 0.4s ease;
}
</style>
