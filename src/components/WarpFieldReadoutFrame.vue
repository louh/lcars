<template>
  <div class="output-column" :class="{ 'place-right': placement === 'right' }">
    <div class="column" />
    <div class="indicator" ref="indicatorRef">
      <div class="indicator-end">
        <!-- TODO: Extra pointy bits -->
        <!-- <Pointer /> -->
      </div>
      <div class="indicator-bg">
        <WarpFieldPointer
          class="indicator-pointer"
          :animate="[30, 55]"
          :timing="[500, 3000]"
          :left="placement !== 'right'"
          :right="placement === 'right'"
        />
      </div>
      <div class="indicator-end">
        <!-- TODO: Extra pointy bits -->
        <!-- <Pointer /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { startAnimation } from '../utils'
import WarpFieldPointer from './WarpFieldPointer.vue'

interface Props {
  placement: 'left' | 'right' | undefined,
}

const props = defineProps<Props>()
const indicatorRef = ref()

onMounted(() => {
  startAnimation(indicatorRef, 10, 32, 1000, 4000)
})
</script>

<style scoped>
.output-column {
  display: flex;
  position: relative;
  flex-basis: 15%;
  justify-content: flex-end;

  &.place-right {
    justify-content: flex-start;
  }

  .column {
    width: 60%;
    height: 100%;
    background-color: var(--output-frame-color);
  }
}

.indicator {
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 58%;
  width: 100%;
  color: var(--pointer-color);
  position: absolute;
  top: var(--animate-to-position);
  transition: top var(--animate-duration) linear;
}

.indicator-end {
  position: relative;
  aspect-ratio: 1 / 1.1;
  background-color: var(--output-frame-color);
  color: var(--output-frame-color);
}

.indicator-bg {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  background-color: var(--lcars-background);
  z-index: 1;
  position: relative;

  /* Prevents pointer from getting too big in mobile view */
  container-type: size;
}

.indicator-pointer {
  position: absolute;
  right: 0;
  width: 175%;
  aspect-ratio: 2 / 1;

  .place-right & {
    left: 0;
    right: auto;
  }

  /* Prevents pointer from getting too big in mobile view */
  @container (max-height: 100px) {
    width: 100%;
  }
}
</style>
