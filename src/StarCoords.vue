<template>
  <div class="star-coords">
    <div>{{ coord1 }}</div>
    <div>{{ coord2 }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { makeRandomNumber } from './utils'

const UPDATE_INTERVAL = 200

let timer

const getRandomNumber = () => makeRandomNumber(6, true)
const coord1 = ref(getRandomNumber())
const coord2 = ref(getRandomNumber())

function init () {
  timer = window.setInterval(update, UPDATE_INTERVAL)
}

function update () {
  coord1.value = getRandomNumber()
  coord2.value = getRandomNumber()
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})
</script>

<style scoped>
.star-coords {
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 2rem;
  line-height: 1;
  color: var(--lcars-color-a2);
}
</style>
