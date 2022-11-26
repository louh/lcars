<template>
  <div class="bar w-full flex flex-row space-x-1 sm:space-x-1.5 leading-none">
    <div class="w-5 sm:w-6 md:w-8 rounded-l-full"></div>
    <div v-if="position==='right'" class="flex-grow" />
    <h2 v-if="label" class="uppercase whitespace-nowrap">
      {{ label }}
    </h2>
    <div v-if="position==='left'" class="flex-grow" />
    <div class="w-5 sm:w-6 md:w-8 rounded-r-full"></div>
  </div>
</template>

<script setup>
import { typeEnum } from './utils'

const props = defineProps({
  label: String,
  position: typeEnum(['left', 'right'], { default: 'right' }),
})
</script>

<style scoped>
/* mobile default sizing */
h2 {
  font-size: 33px;
  color: #f93; /* TODO: dynamic colors */
}
.bar {
  height: 24px;
}

.bar > div {
  background-color: #c9c; /* TODO: dynamic colors */
}

/* sm breakpoint */
@media (min-width: 640px) {
  h2 {
    font-size: 44px;
  }
  .bar {
    height: 32px;
  }
}

/* md breakpoint */
@media (min-width: 768px) {
  h2 {
    font-size: 56px;
  }
  .bar {
    height: 40px;
  }
}
</style>
