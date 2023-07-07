<template>
  <div class="container">
    <div class="top output-bracket" :class="placement === 'left' ? 'bracket-top-left' : 'bracket-top-right'" />
    <div class="middle output" :class="placement === 'left' ? 'align-left' : 'align-right'">
      <WarpFieldReadoutFrame :placement="placement" />
      <WarpFieldReadoutContent class="output-readout" :placement="placement" />
    </div>
    <div class="bottom output-bracket" :class="placement === 'left' ? 'bracket-bottom-left' : 'bracket-bottom-right'" />
  </div>
</template>

<script setup lang="ts">
import WarpFieldReadoutContent from './WarpFieldReadoutContent.vue'
import WarpFieldReadoutFrame from './WarpFieldReadoutFrame.vue'

interface Props {
  placement: 'left' | 'right' | undefined,
}

const props = defineProps<Props>()
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: subgrid;
}

/* Don't know what to call this... just "output" */
.output {
  display: flex;
  flex-direction: row;

  &.align-right {
    flex-direction: row-reverse;

    /* kind of hack, would love to specify this on parent */
    .output-readout {
      --pointer-color: var(--lcars-color-a8);
    }
  }
}

.output-readout {
  flex-grow: 1;
}

.output-bracket {
  position: relative;
  background-color: var(--output-frame-color);

  &::after {
    content: ' ';
    position: absolute;
    /* This needs to match the center bar layout */
    width: calc(85%);
    aspect-ratio: 4.25 / 1;
    background-color: var(--lcars-background);
  }
}

.bracket-top-left {
  border-top-left-radius: var(--output-outer-border-radius);

  &::after {
    right: 0;
    bottom: 0;
    border-top-left-radius: var(--output-inner-border-radius);
  }
}

.bracket-top-right {
  border-top-right-radius: var(--output-outer-border-radius);

  &::after {
    left: 0;
    bottom: 0;
    border-top-right-radius: var(--output-inner-border-radius);
  }
}

.bracket-bottom-left {
  border-bottom-left-radius: var(--output-outer-border-radius);

  &::after {
    right: 0;
    top: 0;
    border-bottom-left-radius: var(--output-inner-border-radius);
  }
}

.bracket-bottom-right {
  border-bottom-right-radius: var(--output-outer-border-radius);

  &::after {
    left: 0;
    top: 0;
    border-bottom-right-radius: var(--output-inner-border-radius);
  }
}
</style>
