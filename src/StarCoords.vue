<template>
  <div class="star-coords">
    <div>{{ coord1 }}</div>
    <div>{{ coord2 }}</div>
  </div>
</template>

<style scoped>
.star-coords {
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 2rem;
  color: var(--lcars-color-a2);
}
</style>

<script>
import { makeRandomNumber } from './utils'

const UPDATE_INTERVAL = 200

export default {
  data() {
    return {
      coord1: makeRandomNumber(6, true),
      coord2: makeRandomNumber(6, true)
    }
  },
  mounted() {
    this.timer = window.setInterval(() => {
      this.coord1 = makeRandomNumber(6, true)
      this.coord2 = makeRandomNumber(6, true)
    }, UPDATE_INTERVAL)
  },
  beforeUnmount() {
    if (this.timer) {
      window.clearInterval(this.timer)
    }
  }
}
</script>
