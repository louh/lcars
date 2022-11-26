<template>
  <div class="inspect-bracket-container">
    <div class="inspect-bracket">
      <!-- This is the original source file, but we build a custom component
          so that it can be styled -->
      <!-- <img src="./bracket-top-left.svg" width="40"/> -->
      <div class="inspect-bracket-left">
        <InspectBracketTL :width="size" position="topleft" />
        <div class="inspect-bracket-left-bar">
          <div class="iblb-a">
            <div class="iblb-a1" style="height: 40%; top: 25%;" />
            <div class="iblb-scale">
              <div>010</div>
              <div>020</div>
              <div>030</div>
              <div>040</div>
              <div>050</div>
              <div>060</div>
              <div>070</div>
              <div>080</div>
              <div>090</div>
            </div>
          </div>
          <div class="iblb-b">
            <div class="iblb-b1" style="height: 45%; top: 10%;" />
            <div class="iblb-marker" />
          </div>
        </div>
        <InspectBracketTL :width="size" position="bottomleft" />
      </div>
      <div class="inspect-bracket-content">
        <PlanetView3d v-if="isFancy === true" :planet="planet" />
        <PlanetView v-else :planet="planet" />
      </div>
      <div class="inspect-bracket-right">
        <InspectBracketTL :width="size" position="topright" />
        <div class="inspect-bracket-right-bar" dir="rtl">
          <div class="iblb-a">
            <div class="iblb-a1" style="height: 40%; top: 10%;" />
            <div class="iblb-a2" style="height: 25%; top: 15%;" />
            <div class="iblb-scale">
              <div>010</div>
              <div>020</div>
              <div>030</div>
              <div>040</div>
              <div>050</div>
              <div>060</div>
              <div>070</div>
              <div>080</div>
              <div>090</div>
            </div>
          </div>
          <div class="iblb-b" style="height: 62%;">
            <div class="iblb-b1" style="height: 35%; top: 45%;" />
            <div class="iblb-marker" />
          </div>
        </div>
        <InspectBracketTL :width="size" position="bottomright" />
      </div>
    </div>
  </div>
</template>

<script setup>
import InspectBracketTL from './InspectBracketTL.vue'
import PlanetView from './PlanetView.vue';
import PlanetView3d from './PlanetView3d.vue';

const props = defineProps({
  size: {
    default: '100%',
    type: String
  }
})

const isFancy = Math.random() > 0.25
// Set to number of planet images I have
const select = isFancy ? 15 : 7
const planet = Math.floor(Math.random() * select)
</script>

<style scoped>
.inspect-bracket-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  --bracket-color: var(--lcars-color-b2);
  /* Even numbers for best results */
  --bracket-size-lg: 64px;
  --bracket-size-sm: 48px;
  --bracket-size-xs: 32px;
}

.inspect-bracket {
  position: relative;
  z-index: 1;
  width: 80%;
  height: 80%;
  max-width: calc(45vh * 1.5);
  max-height: 45vh;
  display: flex;
}

@media screen and (orientation: portrait) {
  .inspect-bracket {
    max-height: 32vh;
  }
}

svg {
  fill: var(--bracket-color);
}

.inspect-bracket-left,
.inspect-bracket-right {
  position: relative;
  display: flex;
  flex-direction: column;
  /* Primary size control */
  flex-basis: var(--bracket-size-sm);
  flex-shrink: 0;
  flex-grow: 0;
  /* Expand bracket height to above and below content area */
  top: calc(var(--bracket-size-sm) / -3);
  height: calc(100% + var(--bracket-size-sm) / 1.5);
  z-index: 1;
}

.inspect-bracket-left {
  left: calc(var(--bracket-size-sm) / 2);
}

.inspect-bracket-right {
  right: calc(var(--bracket-size-sm) / 2);
}

@media screen and (min-width: 767px) and (min-height: 767px) {
  .inspect-bracket-left,
  .inspect-bracket-right {
    flex-basis: var(--bracket-size-lg);
    top: calc(var(--bracket-size-lg) / -3);
    height: calc(100% + var(--bracket-size-lg) / 1.5);
  }

  .inspect-bracket-left {
    left: calc(var(--bracket-size-lg) / 2);
  }

  .inspect-bracket-right {
    right: calc(var(--bracket-size-lg) / 2);
  }
}

@media screen and (max-width: 450px) and (orientation: portrait) {
  .inspect-bracket-left,
  .inspect-bracket-right {
    flex-basis: var(--bracket-size-xs);
    top: calc(var(--bracket-size-xs) / -3);
    height: calc(100% + var(--bracket-size-xs) / 1.5);
  }

  .inspect-bracket-left {
    left: calc(var(--bracket-size-xs) / 2);
  }

  .inspect-bracket-right {
    right: calc(var(--bracket-size-xs) / 2);
  }
}

/* Fix rounding errors that create gaps at certain bracket sizes */
.inspect-bracket-left > svg:first-child,
.inspect-bracket-right > svg:first-child {
  position: relative;
  top: 2px;
}

.inspect-bracket-left > svg:last-child,
.inspect-bracket-right > svg:last-child {
  position: relative;
  top: -2px;
}

.inspect-bracket-left-bar,
.inspect-bracket-right-bar {
  position: relative;
  display: flex;
  flex-grow: 1;
  background-color: var(--bracket-color);
  width: 50%;
  align-items: center;
}

.inspect-bracket-right-bar {
  align-self: flex-end;
  /* flex-direction: row-reverse; */
}

.iblb-a, .iblb-b,
.iblb-a > div,
.iblb-b > div {
  position: relative;
  border-color: var(--lcars-color-black);
  border-top: 2px solid;
  border-bottom: 2px solid;
}

.iblb-a {
  background-color: var(--lcars-color-b3);
  height: 85%;
  border-inline-end: 2px solid;
  flex-basis: calc(50% + 1.5px);
}

@media screen and (min-width: 767px) and (min-height: 767px) {
  .iblb-a, .iblb-b,
  .iblb-a > div,
  .iblb-b > div {
    border-top: 3px solid;
    border-bottom: 3px solid;
  }

  .iblb-a {
    border-inline-end: 3px solid;
  }
}

.iblb-b {
  background-color: var(--lcars-color-b4);
  height: 70%;
  flex-basis: calc(50% - 1.5px);
}

.iblb-b > div {
  background-color: var(--lcars-color-b5);
}

.iblb-marker {
  position: absolute !important;
  background-color: var(--lcars-color-b1) !important;
  width: 26px;
  height: 18px;
  border-radius: 50%;
  border: 0 !important;
}

@media screen and (max-width: 450px) and (orientation: portrait) {
  .iblb-marker {
    width: 18px;
    height: 12px;
  }
}

.inspect-bracket-left-bar .iblb-marker {
  left: calc(var(--bracket-size-sm) / 3);
  top: 65%;
  animation-duration: 7500ms;
  animation-name: marker-1;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.inspect-bracket-right-bar .iblb-marker {
  right: calc(var(--bracket-size-sm) / 3);
  top: 25%;
  animation-duration: 6000ms;
  animation-name: marker-2;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@media screen and (min-width: 767px) and (min-height: 767px) {
  .inspect-bracket-left-bar .iblb-marker {
    left: calc(var(--bracket-size-lg) / 3);
  }

  .inspect-bracket-right-bar .iblb-marker {
    right: calc(var(--bracket-size-lg) / 3);
  }
}

@keyframes marker-1 {
  from { top: 65%; }
  15%  { top: 10%; }
  30%  { top: 55%; }
  45%  { top: 35%; }
  60%  { top: 85%; }
  85%  { top: 40%; }
  to   { top: 65%; }
}

@keyframes marker-2 {
  from { top: 25%; }
  20%  { top: 85%; }
  40%  { top: 35%; }
  60%  { top: 65%; }
  80%  { top: 10%; }
  to   { top: 25%; }
}

.iblb-scale {
  position: absolute !important;
  top: 0;
  border: 0 !important;
  color: var(--lcars-color-b6);
  line-height: 1;
  font-size: 1.2rem;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* prevent first number from getting cut off on Chrome / Mac */
  padding-top: 2px;
}

.iblb-scale > div {
  display: inline-block;
  vertical-align: text-bottom;
}

.inspect-bracket-left-bar .iblb-scale {
  right: calc(var(--bracket-size-sm) / 3.5);
}

.inspect-bracket-right-bar .iblb-scale {
  left: calc(var(--bracket-size-sm) / 3.5);
}

@media screen and (min-width: 767px) and (min-height: 767px) {
  .inspect-bracket-left-bar .iblb-scale {
    right: calc(var(--bracket-size-lg) / 3.5);
  }

  .inspect-bracket-right-bar .iblb-scale {
    left: calc(var(--bracket-size-lg) / 3.5);
  }
}

.inspect-bracket-left-bar .iblb-scale :nth-child(3),
.inspect-bracket-left-bar .iblb-scale :nth-child(4),
.inspect-bracket-left-bar .iblb-scale :nth-child(5),
.inspect-bracket-right-bar .iblb-scale :nth-child(4),
.inspect-bracket-right-bar .iblb-scale :nth-child(5),
.inspect-bracket-right-bar .iblb-scale :nth-child(6) {
  color: var(--lcars-color-b3);
}

.inspect-bracket-content {
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}
</style>
