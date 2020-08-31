<template>
  <div
    class="star-chart"
    data-observe-resizes
    data-breakpoints='{"SM": 760, "MD": 1200, "LG": 1600, "XL": 1900}'
  >
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
    <div class="label-container">
      <div
        v-for="(item, index) in labeledStars"
        :key="index"
        class="star-label"
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
        <div class="label">{{ item.label }}</div>
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
  opacity: 0.75;
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

.star-label {
  display: flex;
  position: absolute;
  height: 40px;
  align-items: center;
}

.label {
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
.background-star:nth-child(2n),
.labeled-star-container:nth-child(2n),
.star-label:nth-child(2n) {
  display: none;
}

.star-chart.MD .background-star:nth-child(2n) {
  display: inherit;
}

.star-chart.LG .labeled-star-container:nth-child(2n),
.star-chart.LG .star-label:nth-child(2n) {
  display: flex;
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
