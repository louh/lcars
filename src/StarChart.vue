<template>
  <div
    class="star-chart"
    data-observe-resizes
    data-breakpoints='{"SM": 760, "MD": 1200, "LG": 1600, "XL": 1900}'
  >
    <div class="stars-container">
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
      <div
        v-for="(item, index) in labeledStars"
        :key="index"
        class="labeled-star"
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
    <div class="label-container">
      <div
        v-for="(item, index) in labeledStars"
        :key="index"
        class="star-label"
        :style="{
          left: item.left + '%',
          top: item.top + '%',
        }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { makeRandomNumber, pickRandomWithoutReplacement, getRandomRange, getRandomInt } from './utils'
import stars from './star-systems.json'

export default {
  name: 'star-chart',
  data() {
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
    const numberStars = getRandomInt(10, 20)
    for (let i = 0; i < numberStars; i++) {
      const star = {
        left: getRandomRange(10, 90),
        top: getRandomRange(20, 90),
        size: getRandomInt(8, 12),
        label: pickRandomWithoutReplacement(stars)
      }
      labeledStars.push(star)
    }

    return {
      numbers,
      backgroundStars,
      labeledStars
    }
  }
}
</script>

<style scoped>
.star-chart {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.grid-container {
  position: absolute;
  width: 240%;
  min-height: 120%;
  margin-left: -10%;
  margin-top: -10%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20vw, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(20vw, 1fr));
  animation-duration: 120s;
  animation-name: pan-right-and-back-1;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
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
}

.star-chart.LG .grid-item {
  min-height: 10vw;
}

.stars-container,
.label-container {
  position: absolute;
  width: 240%;
  height: 120%;
  margin-left: -10%;
  margin-top: -10%;
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

.labeled-star {
  background-color: var(--lcars-color-a1);
}

.star-label {
  display: inline-block;
  position: absolute;
  color: var(--lcars-color-a8);
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 2em;
  margin-left: 0.4em;
  margin-top: -0.5em;
}

/* By default, only show half of stars.
   As screen size gets bigger, progressively display more */
.background-star:nth-child(2n),
.labeled-star:nth-child(2n),
.star-label:nth-child(2n) {
  display: none;
}

.star-chart.MD .background-star:nth-child(2n) {
  display: inherit;
}

.star-chart.LG .labeled-star:nth-child(2n),
.star-chart.LG .star-label:nth-child(2n) {
  display: inherit
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
</style>
