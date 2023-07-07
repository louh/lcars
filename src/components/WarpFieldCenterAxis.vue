<template>
  <div class="container">
    <div class="top flange flange-top" />
    <div class="middle column-container">
      <div class="column" />
      <WarpFieldPointer
        class="pointer"
        :animate="[65, 80]"
        :timing="[1000, 3000]"
        blink
      />
    </div>
    <div class="bottom flange flange-bottom" />
  </div>
</template>

<script setup lang="ts">
import WarpFieldPointer from './WarpFieldPointer.vue';
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: subgrid;
}

.top { grid-row: 1 / 1 } /* Only occupy top row */
.middle { grid-row: 2 / -2 } /* Expand to fit all middle rows */
.bottom { grid-row: -1 / -1 } /* Only occupy bottom row */

/* Top and bottom flanges of the center column */
.flange {
  position: relative;
  aspect-ratio: 2 / 1;
  background-color: var(--center-flange-color);

  @media (max-width: 768px) and (orientation: portrait) {
    aspect-ratio: unset;
  }

  /* Flange knockout */
  &::before,
  &::after {
    content: ' ';
    position: absolute;
    width: 40%;
    aspect-ratio: 1 / 1;
    background-color: var(--lcars-background);
  }
}

.flange-top::before {
  bottom: 0;
  left: 0;
  border-top-right-radius: 80%;
}

.flange-top::after {
  bottom: 0;
  right: 0;
  border-top-left-radius: 80%;
}

.flange-bottom::before {
  top: 0;
  left: 0;
  border-bottom-right-radius: 80%;
}

.flange-bottom::after {
  top: 0;
  right: 0;
  border-bottom-left-radius: 80%;
}

.column-container {
  position: relative;
  display: flex;
  justify-content: center;
}

.column {
  position: relative;
  width: 20%;
  margin: var(--lcars-block-gap) auto;
  background-color: var(--center-column-color);
}

.pointer {
  width: 80%;
  padding: var(--lcars-block-gap) 0;
  background-color: var(--lcars-background);
  color: var(--pointer-color);
}
</style>
