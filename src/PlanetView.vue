<template>
  <div class="planet-view">
    <!-- following images from NASA https://nasa.tumblr.com/post/150044040289/top-10-star-trek-planets-chosen-by-our-scientists -->
    <img v-if="planet === 1" src="./planets/andoria.jpg" class="img-cover" />
    <img v-else-if="planet === 2" src="./planets/earth.jpg" />
    <img v-else-if="planet === 3" src="./planets/janus.jpg" />
    <img v-else-if="planet === 4" src="./planets/risa.jpg" class="img-cover" />
    <img v-else-if="planet === 5" src="./planets/shoreleave.jpg" class="img-cover" />
    <img v-else-if="planet === 6" src="./planets/vendikar.jpg" class="img-cover" />
    <img v-else-if="planet === 7" src="./planets/vulcan.jpg" class="img-cover" />
    <!-- think this is from Memory Alpha? -->
    <img v-else src="./planets/kronos.webp" />
  </div>
</template>

<script setup>
const props = defineProps({
  planet: {
    type: Number,
    default: 1
  }
})
</script>

<style scoped>
.planet-view {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: black;
}

.planet-view img {
  width: 95%;
  height: 95%;
  object-fit: contain;
  object-position: center;
}

.planet-view img.img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
