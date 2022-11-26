<template>
  <button
    :class="{
      'button-square': square,
      'button-rounded-left': roundedLeft,
      'button-rounded-right': roundedRight,
      'bgcolor-1': color === 1,
      'bgcolor-2': color === 2,
      'bgcolor-3': color === 3,
      'bgcolor-4': color === 4,
      'bgcolor-5': color === 5,
      'bgcolor-6': color === 6,
      'bgcolor-7': color === 7,
      'bgcolor-8': color === 8,
      'bgcolor-9': color === 9
    }"
    v-on:click="handleClick"
  >
    {{label}}
  </button>
</template>

<script setup>
import { makeRandomNumber } from './utils'
import { sounds } from './utils/sounds'

const props = defineProps({
  // Label can be passed in as a prop, or one is randomly selected
  label: {
    default: () => {
      return makeRandomNumber(5, false)
    },
    type: String
  },
  // Background color can be passed in as a prop, or one is randomly selected
  color: {
    default: () => {
      return Math.floor(Math.random() * 9) + 1
    },
    type: Number
  },
  square: {
    default: false,
    type: Boolean
  },
  roundedLeft: {
    default: false,
    type: Boolean
  },
  roundedRight: {
    default: false,
    type: Boolean
  },
  // Pass "disabled" attribute to make it invisible, it'll automatically be
  // applied to <button> as the <button disabled> attribute
  disabled: {
    default: false,
    type: Boolean
  },
  // a "blank" prop means the button doesn't do anything and should play
  // the "deny" beep
  blank: {
    default: false,
    type: Boolean
  }
  // OTHER TODO PROPS
  // Blinking (look for examples for interval and transition)
  // Transitioning between two colors
})

const emit = defineEmits(['click'])

function handleClick (event) {
  emit('click', event)
  if (props.blank === true && sounds.denyBeep1.playing() === false) {
    sounds.denyBeep1.play()
  }
}
</script>

<style scoped>
button {
  --button-width: 140px;
  --button-height: 58px;

    /* A minimum value; this can be expanded by flexbox spacing */
  --button-spacing: var(--lcars-block-gap);

  appearance: none;
  width: var(--button-width);
  height: var(--button-height);
  border-radius: calc(var(--button-height) / 2);
  border-width: 0;

  display: flex;
  justify-content: right;
  align-items: flex-end;
  padding: 0.10em 20px;
  margin: var(--button-spacing);

  font-family: 'lcars', sans-serif;
  font-size: 1rem;
}

button[disabled] {
  opacity: 0;
}

.button-square {
  border-radius: 0;
}

.button-rounded-left {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.button-rounded-right {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
