<template>
  <FocusFrame :header-label="headerLabel" :footer-label="footerLabel">
    <div class="omega-directive-symbol absolute inset-0 flex items-center justify-center">
      <OmegaSymbol class="h-full" @click="goHome" @keyup.enter="goHome" tabindex="1" />
    </div>
  </FocusFrame>
</template>

<script setup>
import { useRouter } from 'vue-router'
import FocusFrame from './FocusFrame.vue';
import OmegaSymbol from './omega-directive.svg'
import { sounds } from './utils/sounds'

const router = useRouter()

const headerLabel = 'LCARS ACCESS 0001'
const footerLabel = 'STATUS: STAND BY'

function goHome () {
  // for some reason sound will sometimes be truncated unless we put
  // the play inside an instant setTimeout
  window.setTimeout(() => {
    sounds.panelBeep07.play()
  }, 0)
  router.push('/')
}
</script>

<style scoped>
.omega-directive-symbol {
  padding: 4%;
}

.omega-directive-symbol svg {
  fill: #9cf;
}
</style>
