<template>
  <FocusFrame :header-label="headerLabel" :header-number="headerNumber" :footer-label="footerLabel">
    <div class="omega-directive-symbol absolute inset-0 flex items-center justify-center">
      <OmegaSymbol class="h-full" @click="goHome" @keyup.enter="goHome" tabindex="1" />
    </div>
  </FocusFrame>
</template>

<script>
import FocusFrame from './FocusFrame.vue';
import OmegaSymbol from './omega-directive.svg'

export default {
  data() {
    return {
      headerLabel: 'LCARS ACCESS',
      headerNumber: '0001',
      footerLabel: 'STATUS: STAND BY',
    }
  },
  components: {
    FocusFrame,
    OmegaSymbol,
  },
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
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
