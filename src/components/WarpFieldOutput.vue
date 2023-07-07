<template>
  <div class="warp-field-output-container">
    <WarpFieldReadout class="o1" placement="left" />
    <WarpFieldReadout class="o2" placement="left" />
    <WarpFieldCenterAxis class="c" />
    <WarpFieldReadout class="o3" placement="right" />
    <WarpFieldReadout class="o4" placement="right" />
  </div>
</template>

<script setup lang="ts">
import WarpFieldReadout from './WarpFieldReadout.vue'
import WarpFieldCenterAxis from './WarpFieldCenterAxis.vue';
</script>

<style scoped>
.warp-field-output-container {
  /* We set up a multi-row grid so we can subgrid the children
     components, and things line up in neat rows */
  display: grid;
  /* We probably don't need to balance out with the left column
     because we have room there ... if we need it, you can put
     it back. e.g. mobile layout */
  grid-template-columns: 6fr 0.75fr 6fr 3fr 6fr 0.75fr 6fr 0.75fr;
  grid-template-rows: min-content 1fr min-content; 
  gap: 0 var(--lcars-gap);
  grid-template-areas:
    "o1 . o2 c o3 . o4 ."
    "o1 . o2 c o3 . o4 ."
    "o1 . o2 c o3 . o4 .";
  width: 100%;
  height: 100%;

  --output-outer-border-radius: 25px;
  --output-inner-border-radius: 25px;
  --center-flange-color: var(--lcars-color-a9);
  --center-column-color: var(--lcars-color-a8);
  --pointer-color: var(--lcars-color-a5);
  --pointer-blink-color: var(--lcars-color-ex1); /* extrapolated color */

  /* "mobile" grid */
  @media (max-width: 768px) and (orientation: portrait) {
    grid-template-columns: 0.25fr 6fr 3fr 6fr 0.25fr;
    grid-template-rows: 0.25fr 1fr 0.25fr 0.05fr 0.25fr 1fr 0.25fr;
    gap: 0 var(--lcars-gap);
    grid-template-areas:
      ". o1 c o3 ."
      ". o1 c o3 ."
      ". o1 c o3 ."
      ". .  c .  ."
      ". o2 c o4 ."
      ". o2 c o4 ."
      ". o2 c o4 .";
    margin: 0.5em 0;
    height: calc(100% - 1em);
  }
}

/* Define grid area classes */
.o1 { grid-area: o1; }
.o2 { grid-area: o2; }
.o3 { grid-area: o3; }
.o4 { grid-area: o4; }
.c { grid-area: c; }

/* Output indicators color schemes */
.o1 {
  --output-frame-color: var(--lcars-color-a3);
  --readout-color-1: var(--lcars-color-a9);
  --readout-color-2: var(--lcars-color-a8);
}
.o2 {
  --output-frame-color: var(--lcars-color-a5);
  --readout-color-1: var(--lcars-color-a9);
  --readout-color-2: var(--lcars-color-a8);
}
.o3 {
  --output-frame-color: var(--lcars-color-a5);
  --readout-color-1: var(--lcars-color-a5);
  --readout-color-2: var(--lcars-color-a2);
}
.o4 {
  --output-frame-color: var(--lcars-color-a3);
  --readout-color-1: var(--lcars-color-a5);
  --readout-color-2: var(--lcars-color-a2);
}
</style>
