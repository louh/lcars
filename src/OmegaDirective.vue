<template>
  <FocusFrame :header-label="headerLabel" :header-number="headerNumber" :footer-label="footerLabel">
    <div class="omega-directive-symbol">
      <router-link to="/"><OmegaSymbol /></router-link>
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
  }
}
</script>

<style>
.omega-directive-symbol {
  max-width: 600px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.omega-directive-symbol svg {
  fill: #9cf;
  object-fit: contain;
  width: fit-content;
  height: auto;
}
</style>
