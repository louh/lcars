<template>
  <div class="readout-container" :class="{ 'place-right': placement === 'right' }">
    <div class="readout-labels">
      <div class="readout-label" v-for="n in 12">
        <span>{{ n * 10 }}</span>
      </div>
    </div>
    <div class="readout-meter">
      <div class="rule-a"></div>
      <div class="rule-b">
        <div class="rule-b-gap" v-for="n in 12" />
      </div>
      <div class="rule-a"></div>
      <div class="rule-b">
        <div class="rule-b-gap" v-for="n in 12" />
      </div>
      <div class="rule-a"></div>
    </div>
    <WarpFieldPointer class="readout-pointers" :animate="[40, 80]" :timing="[1000, 4000]" />
  </div>
</template>

<script setup lang="ts">
import WarpFieldPointer from './WarpFieldPointer.vue'

interface Props {
  placement: 'left' | 'right' | undefined,
}

const props = defineProps<Props>()
</script>

<style scoped>
.readout-container {
  display: flex;
  flex-direction: row;
  position: relative;

  padding-left: 8%;

  &.place-right {
    padding-left: 0;
    padding-right: 8%;
  }
}

.place-right {
  flex-direction: row-reverse;
}

.readout-labels {
  display: flex;
  flex-direction: column;
  flex-basis: 55%;
  justify-content: space-between;
  color: var(--readout-color-1);
}

.readout-label {
  position: relative;
  display: flex;
  justify-content: center;

  > span {
    width: 50%;
    line-height: 0.6;
    background-color: var(--lcars-background);
    margin-top: 5px;
    padding-left: 15%;
  }

  &::before {
    content: ' ';
    position: absolute;
    top: 50%;
    width: 100%;
    z-index: -1;
    border-top: 1px solid var(--readout-color-1);
  }
}

.readout-meter {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-basis: 45%;
  gap: var(--lcars-block-gap);
  border-top: 1px solid var(--readout-color-1);
  border-bottom: 1px solid var(--readout-color-1);
}

.rule-a {
  flex: 1;
  background-color: var(--readout-color-1);
}

.rule-b {
  flex: 1.4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 0;
  background-color: var(--readout-color-2);
}

.rule-b-gap {
  width: 100%;
  height: var(--lcars-block-gap);

  &:not(:first-child):not(:last-child) {
    background-color: var(--lcars-background);
  }
}

.readout-pointers {
  position: absolute;
  width: 47%;
  left: 34%;

  .place-right & {
    left: auto;
    right: 34%;
  }
}
</style>
