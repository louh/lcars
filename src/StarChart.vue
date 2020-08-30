<template>
  <div
    class="star-chart"
    data-observe-resizes
    data-breakpoints='{"SM": 760, "MD": 1200, "LG": 1600, "XL": 1900}'
  >
    <div class="stars">
      <div
        v-for="(item, index) in stars"
        :key="index"
        class="star"
        :style="{
          left: item.left + '%',
          top: item.top + '%',
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
  </div>
</template>

<script>
import { makeRandomNumber } from './utils'

export default {
  name: 'star-chart',
  data() {
    const numbers = []
    for (let i = 0; i < 100; i++) {
      numbers.push(makeRandomNumber(4, true))
    }

    const stars = []
    for (let i = 0; i < 100; i++) {
      const star = {
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.floor(Math.random() * 12) + 1
      }
      stars.push(star)
    }

    return {
      numbers,
      stars
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

.stars {
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

.star {
  position: absolute;
  border-radius: 50%;
  background-color: var(--lcars-color-a5);
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
