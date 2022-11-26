<template>
  <div
    class="star-chart"
    data-observe-resizes
    data-breakpoints='{"SM": 760, "MD": 1200, "LG": 1600, "XL": 1900}'
  >
    <div class="interstellar-clouds">
      <canvas ref="clouds"></canvas>
    </div>
    <div class="stars-container">
      <div
        v-for="(item, index) in labeledStars"
        :key="index"
        class="labeled-star-container"
        :style="{
          left: `calc(${item.left}% - 40px / 2)`,
          top: `calc(${item.top}% - 40px / 2)`,
        }"
      >
        <div
          class="labeled-star"
          :style="{
            width: item.size + 'px',
            height: item.size + 'px'
          }"
        >
        </div>
      </div>
      <div
        v-for="(item, index) in backgroundStars"
        :key="index"
        class="background-star"
        :style="{
          left: `calc(${item.left}% - ${item.size}px / 2)`,
          top: `calc(${item.top}% - ${item.size}px / 2)`,
          width: item.size + 'px',
          height: item.size + 'px'
        }"
      >
      </div>
    </div>
    <div class="grid-container">
      <div v-for="(item, index) in numbers" :key="index" class="grid-item">
        {{ item }}
      </div>
    </div>
    <div class="label-container" ref="labels">
      <div
        v-for="(item, index) in labeledStars"
        :key="index"
        class="label star-label"
        :style="{
          left: `calc(${item.left}% - 40px / 2)`,
          top: `calc(${item.top}% - 40px / 2)`,
        }"
      >
        <div class="select">
          <div class="select-left">
            <div class="select-bracket"></div>
          </div>
          <div class="select-right">
            <div class="select-bracket"></div>
          </div>
        </div>
        <div class="label-text">{{ item.label }}</div>
      </div>
    </div>
    <ForwardScanner v-if="type === 'nav'" />
    <StarCoords v-if="type === 'nav'" />
    <InspectBracket v-if="type === 'planet'" />
  </div>
</template>

<script setup>
/* global noise */
import { ref, onMounted, onUnmounted, nextTick} from 'vue'
import {
  makeRandomNumber,
  pickRandomWithoutReplacement,
  getRandomRange,
  getRandomInt,
  throttle,
  typeEnum
} from './utils'
import ForwardScanner from './ForwardScanner.vue'
import InspectBracket from './InspectBracket.vue'
import StarCoords from './StarCoords.vue'
import stars from './star-systems.json'

const COLLISION_BUFFER = 10

const props = defineProps({
  type: typeEnum(['nav', 'planet'], { default: 'nav' }),
})

const labels = ref(null)
const clouds = ref(null)

function drawInterstellarClouds (canvas) {
  // Perlin noise implementation and canvas rendering based on
  // https://github.com/josephg/noisejs
  const rect = canvas.getBoundingClientRect()

  canvas.width = rect.width
  canvas.height = rect.height

  const ctx = canvas.getContext('2d')
  const image = ctx.createImageData(canvas.width, canvas.height)
  const data = image.data

  noise.seed(Math.floor(Math.random() * 65535) + 1)

  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      // controls scale of noise
      // base it on canvas.height so that it still looks right on large screens
      let value = noise.perlin2(x / (canvas.height / 2), y / (canvas.height / 2))
      value *= 256

      const cell = (x + y * canvas.width) * 4
      if (value > 75) {
        // data[cell] = data[cell + 1] = data[cell + 2] = value
        // data[cell] += Math.max(0, (25 - value) * 8)
        data[cell] = 19 // R
        data[cell + 1] = 11 // G
        data[cell + 2] = 129 // B
        data[cell + 3] = 96 // alpha
      } else if (value > 25) {
        // data[cell] = data[cell + 1] = data[cell + 2] = value
        // data[cell] += Math.max(0, (25 - value) * 8)
        data[cell] = 19 // R
        data[cell + 1] = 11 // G
        data[cell + 2] = 129 // B
        data[cell + 3] = 72 // alpha
      } else if (value > -25) {
        // data[cell] = data[cell + 1] = data[cell + 2] = value
        // data[cell] += Math.max(0, (25 - value) * 8)
        data[cell] = 19 // R
        data[cell + 1] = 11 // G
        data[cell + 2] = 129 // B
        data[cell + 3] = 24 // alpha
      }
    }
  }

  ctx.putImageData(image, 0, 0)
}

function checkLabelCollision (labelContainer) {
  const labelEls = labelContainer.querySelectorAll('.label')
  const metrics = []

  // Batch read all dimensions at once
  for (let i = 0; i < labelEls.length; i++) {
    const data = labelEls[i].getBoundingClientRect()
    data.textContent = labelEls[i].textContent
    metrics.push(data)
  }

  // For each label, check collision with all others
  for (let i = 0; i < metrics.length; i++) {
    const label = metrics[i]

    for (let j = 0; j < metrics.length; j++) {
      const toCheck = metrics[j]
      // Don't check self
      if (label === toCheck) continue
      // Don't re-check previously checked items
      if (toCheck.checked === true) continue
      // Don't need to continue checking something that collides
      if (label.collide === true) continue

      // Test for collision and mark it if true
      label.collide = testCollision(label, toCheck, COLLISION_BUFFER)
    }

    // Mark a label as checked so it doesn't need to be rechecked
    label.checked = true
  }

  // Batch hide all collided labels
  for (let i = 0; i < labelEls.length; i++) {
    if (metrics[i].collide === true) {
      labelEls[i].classList.add('collide')
    } else {
      // Remove a previously applied class if element no longer collides
      labelEls[i].classList.remove('collide')
    }
  }
}

// Create a throttled version of this for window resize listener
const throttledCheckLabelCollision = throttle(() => {
  checkLabelCollision(labels.value)
}, 20)

function testCollision (candidate, check, buffer = 0) {
  if (
    candidate.top > check.bottom + buffer ||
    candidate.right < check.left - buffer ||
    candidate.bottom < check.top - buffer ||
    candidate.left > check.right + buffer
  ) {
    return false
  }

  return true
}

// Create some values for the render
const numbers = []
for (let i = 0; i < 150; i++) {
  numbers.push(makeRandomNumber(4, true))
}

const backgroundStars = []
for (let i = 0; i < 100; i++) {
  const star = {
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: getRandomInt(1, 10)
  }
  backgroundStars.push(star)
}

const labeledStars = []
const numberStars = getRandomInt(6, 18)
for (let i = 0; i < numberStars; i++) {
  const star = {
    left: getRandomRange(2, 80),
    top: getRandomRange(10, 90),
    size: getRandomInt(8, 12),
    label: pickRandomWithoutReplacement(stars)
  }
  labeledStars.push(star)
}

async function init () {
  await nextTick()
  drawInterstellarClouds(clouds.value)
  checkLabelCollision(labels.value)

  // Throttle the collision check when the window is resized to
  // limit calculations and layout thrashing
  // TODO: watch ResizeObserver on the element, instead of watching
  // window resize
  window.addEventListener('resize', throttledCheckLabelCollision)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  window.removeEventListener('resize', throttledCheckLabelCollision)
})
</script>

<style scoped>
.star-chart {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.interstellar-clouds {
  position: absolute;
  width: 200%;
  height: 100%;
  left: 0;
  top: 0;
  animation-duration: 120s;
  animation-name: pan-right-and-back-3;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.interstellar-clouds canvas {
  width: 100%;
  height: 100%;
}

.grid-container {
  position: absolute;
  width: 240%;
  min-height: 120%;
  left: -10%;
  top: -10%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25vw, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(25vw, 1fr));
  animation-duration: 120s;
  animation-name: pan-right-and-back-1;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.star-chart.SM .grid-container {
  grid-template-columns: repeat(auto-fit, minmax(20vw, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(20vw, 1fr));
}

.star-chart.LG .grid-container {
  grid-template-columns: repeat(auto-fit, minmax(10vw, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(10vw, 1fr));
}

.grid-item {
  border-left: 1px solid var(--lcars-color-a3);
  border-bottom: 1px solid var(--lcars-color-a3);
  padding: 10px;
  color: var(--lcars-color-a4);
  min-height: 20vw;
  opacity: 0.75;
}

.star-chart.LG .grid-item {
  min-height: 10vw;
}

.stars-container,
.label-container {
  position: absolute;
  width: 240%;
  height: 100%;
  top: 0;
  left: 0;
  animation-duration: 120s;
  animation-name: pan-right-and-back-2;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.background-star,
.labeled-star {
  position: absolute;
  border-radius: 50%;
}

.background-star {
  background-color: var(--lcars-color-a5);
}

.labeled-star-container {
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-left {
  position: absolute;
  left: 0;
  height: 75%;
  width: 10px;
  overflow: hidden;
}

.select-right {
  position: absolute;
  right: 0;
  height: 75%;
  width: 10px;
  overflow: hidden;
}

.select-bracket {
  position: absolute;
  height: 100%;
  width: 40px;
  border: 5px solid var(--lcars-color-b2);
  border-radius: 12px / 8px;
}

.select-left .select-bracket {
  left: 0;
}

.select-right .select-bracket {
  right: 0;
}

.labeled-star {
  background-color: var(--lcars-color-a1);
}

.label.collide {
  border: 1px solid red;
  opacity: 0;
  pointer-events: none;
}

.star-label {
  display: flex;
  position: absolute;
  height: 40px;
  align-items: center;
}

.label-text {
  color: var(--lcars-color-a8);
  text-transform: uppercase;
  white-space: nowrap;
  height: 40px;
  font-size: 2em;
  margin-left: 0.2em;
  /* Manual vertical alignment */
  line-height: 1.25;
}

/* By default, only show half of stars.
   As screen size gets bigger, progressively display more */
.background-star:nth-child(2n) {
  display: none;
}

.star-chart.MD .background-star:nth-child(2n) {
  display: inherit;
}

@keyframes pan-right-and-back-1 {
  from {
    transform: translateX(0);
  }

  48% {
    transform: translateX(-50%);
  }

  50% {
    transform: translateX(-50%);
  }

  98% {
    transform: translateX(0);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes pan-right-and-back-2 {
  from {
    transform: translateX(0);
  }

  48% {
    transform: translateX(-40%);
  }

  50% {
    transform: translateX(-40%);
  }

  98% {
    transform: translateX(0);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes pan-right-and-back-3 {
  from {
    transform: translateX(0);
  }

  48% {
    transform: translateX(-30%);
  }

  50% {
    transform: translateX(-30%);
  }

  98% {
    transform: translateX(0);
  }

  to {
    transform: translateX(0);
  }
}
</style>
