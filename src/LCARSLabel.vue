<template>
  <span class="label">
    <div class="label-start"></div>
    <span v-for="(character, index) in label" :key="index">
      <span v-if="character === '1'"><Number1 /></span>
      <span v-else-if="character === '2'"><Number2 /></span>
      <span v-else-if="character === '3'"><Number3 /></span>
      <span v-else-if="character === '4'"><Number4 /></span>
      <span v-else-if="character === '5'"><Number5 /></span>
      <span v-else-if="character === '6'"><Number6 /></span>
      <span v-else-if="character === '7'"><Number7 /></span>
      <span v-else-if="character === '8'"><Number8 /></span>
      <span v-else-if="character === '9'"><Number9 /></span>
      <span v-else-if="character === '0'"><Number0 /></span>
    </span>
    <div class="label-end"></div>
  </span>
</template>

<script setup>
import { makeRandomNumber, getRandomInt } from './utils'
import Number1 from './label/1.svg'
import Number2 from './label/2.svg'
import Number3 from './label/3.svg'
import Number4 from './label/4.svg'
import Number5 from './label/5.svg'
import Number6 from './label/6.svg'
import Number7 from './label/7.svg'
import Number8 from './label/8.svg'
import Number9 from './label/9.svg'
import Number0 from './label/0.svg'

const props = defineProps({
  // Label can be passed in as a prop, or one is randomly selected
  label: {
    default: () => {
      const digits = getRandomInt(2, 5)
      return makeRandomNumber(digits, false)
    },
    type: String
  },
  // Color can be passed in as a prop, or one is randomly selected
  color: {
    default: () => {
      return Math.floor(Math.random() * 9) + 1
    },
    type: Number
  },
})
</script>

<style scoped>
.label {
  color: var(--lcars-color-b6);
  position: absolute;
  top: 0.25em;
  right: 0.25em;
  height: 64px;

  /* font-size: 64px; */
}

svg {
  height: 100%;
  fill: currentColor;
}

.label-start {
  background-color: var(--lcars-color-b6);
  width: 300px;
  height: 100%;
  border-top-left-radius: 100vh;
  border-bottom-left-radius: 100vh;
  display: inline-block;
  margin-right: 0.2em;
}
.label-end {
  background-color: var(--lcars-color-b6);
  width: 100%;
  height: 100%;
  border-top-right-radius: 100vh;
  border-bottom-right-radius: 100vh;
  display: inline-block;
  margin-left: 0.2em;
}
</style>
