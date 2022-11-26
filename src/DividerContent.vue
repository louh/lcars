<template>
  <div class="divider-grid" :data-type="type">
    <div class="dg1a"></div>
    <div class="dg1b">
      <div class="dg1b-x"></div>
    </div>
    <div class="dg1c"></div>
    <div class="dg1d"></div>
    <div class="dg2a"></div>
    <div class="dg2b">
      <div class="dg2b-x"></div>
    </div>
    <div class="dg2c"></div>
    <div class="dg2d"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  // Type can be passed in as a prop, or one is randomly selected
  type: {
    default: () => {
      return Math.floor(Math.random() * 3) + 1
    },
    type: Number
  }
})
</script>

<style scoped>
.divider-grid {
  --blob-radius: 3px;

  position: relative;
  /* Parent element controls visibility */
  display: none;
  grid-area: divider;
  grid-template-rows: var(--lcars-divider-top-height) var(--lcars-divider-bottom-height);
  row-gap: var(--lcars-gap);
  justify-self: end;
}

.divider-grid > div {
  position: relative;
  border-left: var(--lcars-block-gap) solid var(--lcars-color-black);
  padding: 1px 5px;
  align-content: center;
  text-align: right;
}

[data-type="1"] {
  grid-template-columns: 40px 180px auto 50px;
  width: 65%;
}

[data-type="1"] .dg1a,
[data-type="1"] .dg1d,
[data-type="1"] .dg1c {
  background-color: var(--lcars-color-a2);
}

[data-type="1"] .dg1b,
[data-type="1"] .dg2b {
  background-color: var(--lcars-color-a3);
}

[data-type="1"] .dg2a,
[data-type="1"] .dg2c {
  background-color: var(--lcars-color-a7);
}

[data-type="1"] .dg1b-x {
  display: none;
}

[data-type="1"] .dg2b-x {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(var(--lcars-divider-bottom-height) / 2);
  background-color: var(--lcars-color-black);
}

[data-type="2"] {
  --blob-width: 160px;

  grid-template-columns: 50px auto 45px;
  width: 70%;
}

[data-type="2"] .dg1a,
[data-type="2"] .dg1c {
  background-color: var(--lcars-color-a2);
}

[data-type="2"] .dg1b,
[data-type="2"] .dg2b {
  background-color: var(--lcars-color-a1);
}

[data-type="2"] .dg2a,
[data-type="2"] .dg2c {
  background-color: var(--lcars-color-a7);
}

[data-type="2"] .dg1b-x {
  position: absolute;
  bottom: 0;
  left: 0;
  width: var(--blob-width);
  height: calc(var(--lcars-divider-top-height) / 5 * 2);
  background-color: var(--lcars-color-black);
  border-top-right-radius: var(--blob-radius);
}

[data-type="2"] .dg1b-x::before {
  content: ' ';
  position: absolute;
  bottom: calc(var(--lcars-divider-top-height) + 4px);
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--lcars-color-a6);
}

[data-type="2"] .dg2b-x {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: var(--blob-width);
  height: calc(var(--lcars-divider-bottom-height) / 5 * 2);
  background-color: var(--lcars-color-black);
  border-bottom-right-radius: var(--blob-radius);
}

[data-type="2"] .dg2b-x::before {
  content: ' ';
  position: absolute;
  top: calc(var(--lcars-divider-bottom-height) + 4px);
  left: 0;
  width: 100%;
  height: 8px;
  background-color: var(--lcars-color-a6);
}

[data-type="2"] .dg2b-x::after {
  content: ' ';
  position: absolute;
  /* 4px is spacing between stuff; 8px is height of thick line */
  top: calc(var(--lcars-divider-bottom-height) + 4px + 8px + 4px);
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--lcars-color-a6);
}

[data-type="2"] .dg1d,
[data-type="2"] .dg2d {
  display: none;
}

[data-type="3"] {
  --blob-width: 120px;

  grid-template-columns: 75px 1fr 1fr 45px;
  width: 98%;
}

[data-type="3"] .dg1a {
  background-color: var(--lcars-color-a7);
}

[data-type="3"] .dg1b,
[data-type="3"] .dg1d,
[data-type="3"] .dg2a {
  background-color: var(--lcars-color-a8);
}

[data-type="3"] .dg2b {
  background-color: var(--lcars-color-a9);
}

[data-type="3"] .dg1c {
  background-color: var(--lcars-color-a7);
}

[data-type="3"] .dg2c,
[data-type="3"] .dg2d {
  background-color: var(--lcars-color-a6);
}

[data-type="3"] .dg1b-x {
  position: absolute;
  bottom: 0;
  right: 0;
  width: var(--blob-width);
  height: calc(var(--lcars-divider-top-height) / 5 * 2);
  background-color: var(--lcars-color-black);
  border-top-left-radius: var(--blob-radius);
}

[data-type="3"] .dg1b-x::before {
  content: ' ';
  position: absolute;
  bottom: calc(var(--lcars-divider-top-height) + 6px);
  right: 0;
  width: 100%;
  height: 3px;
  background-color: var(--lcars-color-a7);
}

[data-type="3"] .dg2b-x {
  content: ' ';
  position: absolute;
  top: 0;
  right: 0;
  width: var(--blob-width);
  height: calc(var(--lcars-divider-bottom-height) / 5 * 2);
  background-color: var(--lcars-color-black);
  border-bottom-left-radius: var(--blob-radius);
}

[data-type="3"] .dg2b-x::before {
  content: ' ';
  position: absolute;
  top: calc(var(--lcars-divider-bottom-height) + 6px);
  right: 0;
  width: 100%;
  height: 3px;
  background-color: var(--lcars-color-a7);
}

[data-type="3"] .dg2b-x::after {
  content: ' ';
  position: absolute;
  top: calc(-1 * var(--lcars-divider-bottom-height) / 5 * 3.5);
  right: 0;
  width: calc(var(--blob-width) / 5);
  height: calc(var(--lcars-divider-bottom-height) / 5 * 4);
  background-color: var(--lcars-color-a8);
}
</style>
