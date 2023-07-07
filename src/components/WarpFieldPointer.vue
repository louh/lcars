<template>
  <div
    class="pointer-container"
    :class="{ 'pointer-blink': blink }"
    ref="pointerRef"
  >
    <!-- If either left or right is true, conditionally render them -->
    <template v-if="left || right">
      <div v-if="left" class="pointer-left"><Pointer /></div>
      <div v-if="right" class="pointer-right"><Pointer /></div>
    </template>
    <!-- If neither is true, render both -->
    <template v-else>
      <div class="pointer-left"><Pointer /></div>
      <div class="pointer-right"><Pointer /></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { startAnimation } from '../utils'
import Pointer from './pointer.svg'

interface Props {
  animate: [number, number],
  timing: [number, number],
  blink?: boolean,
  left?: boolean,
  right?: boolean,
}

const props = defineProps<Props>()
const pointerRef = ref()

onMounted(() => {
  startAnimation(
    pointerRef,
    props.animate[0],
    props.animate[1],
    props.timing[0],
    props.timing[1],
  )
})
</script>

<style scoped>
.pointer-container {
  display: flex;
  flex-direction: row;
  gap: var(--lcars-block-gap);
  color: var(--pointer-color);
  position: absolute;
  top: var(--animate-to-position);
  transition: top var(--animate-duration) linear;
}

.pointer-left {
  flex-grow: 1;
}

.pointer-right {
  flex-grow: 1;

  svg {
    transform: rotate(180deg);
  }
}

.pointer-blink {
  animation: 0.35s steps(2, jump-none) infinite alternate pointer-blink;
}

@keyframes pointer-blink {
  from {
    color: var(--pointer-color);
  }

  to {
    color: var(--pointer-blink-color, red);
  }
}
</style>
