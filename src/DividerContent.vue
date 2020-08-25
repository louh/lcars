<template>
  <div class="divider-grid" :data-type="type">
    <div class="dg1a"></div>
    <div class="dg1b"></div>
    <div class="dg1c"></div>
    <div class="dg1d"></div>
    <div class="dg2a"></div>
    <div class="dg2b"></div>
    <div class="dg2c"></div>
    <div class="dg2d"></div>
  </div>
</template>

<script>
export default {
  props: {
    // Type can be passed in as a prop, or one is randomly selected
    type: {
      default: () => {
        return Math.floor(Math.random() * 2) + 1
      },
      type: Number
    }
  }
}
</script>

<style scoped>
.divider-grid {
  position: relative;
  display: grid;
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

[data-type="1"] .dg2b::after {
  content: ' ';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(var(--lcars-divider-top-height) / 2);
  background-color: var(--lcars-color-black);
}

[data-type="2"] {
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

[data-type="2"] .dg1b::before {
  content: ' ';
  position: absolute;
  top: -8px;
  left: 0;
  width: 160px;
  height: 3px;
  background-color: var(--lcars-color-a6);
}

[data-type="2"] .dg1b::after {
  content: ' ';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 160px;
  height: calc(var(--lcars-divider-top-height) / 5 * 2);
  background-color: var(--lcars-color-black);
  border-top-right-radius: 3px;
}

[data-type="2"] .dg2b::before {
  content: ' ';
  position: absolute;
  bottom: -13px;
  left: 0;
  width: 160px;
  height: 8px;
  background-color: var(--lcars-color-a6);
}

[data-type="2"] .dg2b::after {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 160px;
  height: calc(var(--lcars-divider-top-height) / 5 * 2);
  background-color: var(--lcars-color-black);
  border-bottom-right-radius: 3px;
}

[data-type="2"] .dg1d,
[data-type="2"] .dg2d {
  display: none;
}
</style>
