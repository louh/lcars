<!-- Note: resize observer contentRect.width does NOT include padding! 
    Unfortunately this means that breakpoints need to manually account for
    CSS padding -->
<template>
  <div class="screen"
    data-observe-resizes
    data-breakpoints='{"XS": 0, "SM": 708, "MD": 1280, "LG": 1600, "XL": 1900, "XXL": 3000}'
  >
    <section class="lcars-type-01">
      <div class="lcars-title small">
        <LCARSBar align="left" :color-scheme="titleType">{{title}}</LCARSBar>
      </div>
      <div class="lcars-title large" :data-type="titleType">
        <span class="short-title">{{title}}</span>
        <span class="long-title">{{longTitle}}</span>
      </div>
      <div class="sidebar-top">
        <button class="sidebar-block bgcolor-3 linkable" @click="enterFullscreen">
          {{displayLcarsLabel ? lcarsLabel : numbers[0]}}
        </button>
        <div class="sidebar-block">{{numbers[1]}}</div>
      </div>
      <div class="sidebar-bottom">
        <div class="sidebar-block">{{numbers[2]}}</div>
        <div class="sidebar-block bgcolor-2">{{numbers[3]}}</div>
        <button class="sidebar-block bgcolor-6 linkable" @click="goOmegaDirective">
          {{numbers[4]}}
        </button>
        <button class="sidebar-block bgcolor-3 linkable" @click="goTransmission">
          {{numbers[5]}}
        </button>
      </div>
      <div class="divider-top"></div>
      <div class="divider-bottom"></div>
      <!-- Can switch between divider types 1 and 2 -->
      <DividerContent />
      <div class="meta-content">
        <div class="numbers-area">
          <NumbersTable :key="numberSequence" />
        </div>
        <div class="buttons-area">
          <LCARSButton @click="toggleStarChartType" />
          <LCARSButton :blank="true" />
          <LCARSButton :blank="true" :color="3" />
          <LCARSButton :blank="true" />
          <LCARSButton :blank="true" />
          <LCARSButton :blank="true" />
        </div>
      </div>
      <div class="main-content">
        <StarChart :type="starChartType" />
      </div>
      <footer>
        <LCARSBar align="right" :color-scheme="titleType">
          {{displayLcarsLabel ? lcarsLabel : ''}}
        </LCARSBar>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from './stores/main'
import DividerContent from './DividerContent.vue'
import LCARSBar from './LCARSBar.vue'
import LCARSButton from './LCARSButton.vue'
import LCARSLabel from './LCARSLabel.vue'
import NumbersTable from './NumbersTable.vue'
import StarChart from './StarChart.vue'
import { makeRandomLetters, makeRandomNumber, pickRandom } from './utils'
import { startResizeObserver } from './utils/resize-observer'
import { sounds } from './utils/sounds'

const router = useRouter()

const store = useMainStore()
const { setTheme } = store

/**
 * Makes labels for LCARS UI.
 * Types:
 *  1. 6 random digits
 *  2. 2 digits - 7 digits - 2 digits (note: verify length of middle section)
 *  3. three letters + up to 4 numbers
 * 
 * if `type` is not provided, pick one at random.
 * 
 * @param {Number} type of label to make
 * @returns {String}
 */

function makeLabels (type) {
  switch (type) {
    case 1:
      return makeLabelType1()
    case 2:
      return makeLabelType2()
    case 3:
      return makeLabelType3()
    case 4:
      return makeLabelType4()
    default: {
      const rand = Math.ceil(Math.random() * 4)
      return makeLabels(rand)
    }
  }
}

function makeLabelType1 () {
  return makeRandomNumber(6)
}

function makeLabelType2 () {
  return `${makeRandomNumber(2)}-${makeRandomNumber(7)}-${makeRandomNumber(2)}`
}

function makeLabelType3 () {
  return `${makeRandomLetters(3)} ${makeRandomNumber(4, false, 3)}`
}

function makeLabelType4 () {
  return `${makeRandomNumber(2)}-${makeRandomNumber(6)}`
}

function makeLCARSLabel () {
  return `LCARS ${makeRandomNumber(5)}`
}

// Make values for template
const sidebarLabelType = Math.ceil(Math.random() * 5)
const appendageType = Math.random()

const titles = [
  // 'Chin\'toka Star System',
  'Tactical Cartography',
  'Stellar Cartography',
  'Long Range Scan',
  'Astrometrics',
  'Astrometrics Lab',
  // 'Cerritos Operations',
  // 'Master Systems Display',
  // 'Communicator Transponder Scan'
]
const title = pickRandom(titles)

let appendage = ''
if (appendageType < 0.33) {
  // type 1: title only
  appendage = ''
} else if (appendageType < 0.66) {
  // type 2: title + dot + number
  appendage = ` • ${makeRandomNumber(4, false)}`
} else if (appendageType < 0.825) {
  // type 3a: title + number (no dot)
  appendage = ` ${makeRandomNumber(5, false)}`
} else {
  // type 3b: title + number (no dot), 3 digits with leading zero padded
  appendage = ` ${makeRandomNumber(3, true)}`
}

const longTitle = title + appendage
const titleType = Math.ceil(Math.random() * 2)
const lcarsLabel = makeLCARSLabel()
const numbers = new Array(6).fill(0).map(function (item, index) {
  return makeLabels(sidebarLabelType)
})
const displayLcarsLabel = Math.random() > 0.35

// Refs
const starChartType = ref(Math.random() > 0.5 ? 'nav' : 'planet')
const numberSequence = ref(0)

// Set global state
const colorScheme = Math.random() > 0.75 ? 2 : 1
setTheme(colorScheme)

function incrementNumberSequence () {
  numberSequence.value++
}

function enterFullscreen () {
  if (document.fullscreenEnabled) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        if (sounds.panelBeep13.playing() === false) {
          sounds.panelBeep13.play()
        }
      }).catch(err => {
        sounds.denyBeep1.play()
      })
    } else {
      document.exitFullscreen()
      sounds.panelBeep08.play()
    }
  }
}

function toggleStarChartType (event) {
  if (starChartType.value === 'planet') {
    starChartType.value = 'nav'
    if (sounds.panelBeep14.playing() === false) {
      sounds.panelBeep14.play()
    }
  } else {
    starChartType.value = 'planet'
    if (sounds.panelBeep03.playing() === false) {
      sounds.panelBeep03.play()
    }
  }
}

function goOmegaDirective () {
  sounds.panelBeep07.play()
  router.push('/omega-directive')
}

function goTransmission () {
  sounds.panelBeep07.play()
  router.push('/transmission')
}

onMounted(() => {
  startResizeObserver()

  window.addEventListener('lcars:update_numbers_table', incrementNumberSequence)
})

onUnmounted(() => {
  window.removeEventListener('lcars:update_numbers_table', incrementNumberSequence)
})
</script>

<style>
.lcars-type-01 {
  --header-content-area: calc(var(--lcars-top-section-height) - var(--lcars-title-size) - var(--lcars-divider-top-height));

  display: grid;
  column-gap: 0;
  row-gap: var(--lcars-gap);
  height: 100%;
}

.screen.XS > .lcars-type-01 {
  /* small (mobile/PADD) layout */
  grid-template-columns:
    [content-start]
      1fr
    [content-end];
  grid-template-rows:
    [header-start]
      var(--lcars-xs-title-size)
    [header-end main-start]
      auto
    [main-end footer-start]
      var(--lcars-xs-title-size)
    [footer-end];
  grid-template-areas:
    "title"
    "main-content"
    "footer";
}

.screen.SM > .lcars-type-01 {
  grid-template-columns:
    [sidebar-start]
      var(--lcars-sidebar-width)
    [sidebar-end content-start]
      auto
    [content-end];
  grid-template-rows:
    [header-start]
      var(--lcars-title-size)
      var(--header-content-area)
      var(--lcars-divider-top-height)
    [header-end main-start]
      var(--lcars-divider-bottom-height)
      auto
    [main-end];
  grid-template-areas:
    "sidebar-top title"
    "sidebar-top meta-content"
    "sidebar-top divider"
    "sidebar-bottom divider"
    "sidebar-bottom main-content";
}

.lcars-title {
  color: var(--lcars-color-a5);
  /* make actual capital letter height match height of row with a multiplier */
  font-size: calc(var(--lcars-xs-title-size) * 1.36);
  line-height: 1;
  text-transform: uppercase;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  /* truncating a string with custom string is not supported in any browser except Firefox */
  text-overflow: '';
}

.lcars-title.large,
.lcars-title.large > .long-title {
  display: none;
}

.screen.SM .lcars-title.small {
  display: none;
}

.screen.SM .lcars-title.large,
.screen.SM .lcars-title.large > .short-title {
  display: block;
}

.screen.MD .lcars-title.large > .short-title {
  display: none;
}

.screen.MD .lcars-title.large > .long-title {
  display: block;
}

.screen.SM .lcars-title {
  font-size: calc(var(--lcars-sm-title-size) * 1.25);
}

.screen.MD .lcars-title {
  /* make actual capital letter height match height of row with a multiplier */
  font-size: calc(var(--lcars-title-size) * 1.25);
}

.lcars-title[data-type="2"] {
  color: var(--lcars-color-a8);
}

.sidebar-top {
  background-color: var(--lcars-color-a6);
  /* background-color: var(--lcars-color-b5); */
  border-bottom-left-radius: 72px 48px;
  position: relative;
  grid-area: sidebar-top;
  display: none;
}

.screen.SM .sidebar-top {
  display: block;
}

.sidebar-top::after {
  content: ' ';
  background-color: var(--lcars-color-black);
  position: absolute;
  top: 0;
  right: 0;
  width: 34px;
  height: calc(100% - var(--lcars-divider-top-height));
  border-bottom-left-radius: 32px 24px;
}

.sidebar-bottom {
  border-top-left-radius: 72px 48px;
  background-color: var(--lcars-color-a1);
  /* background-color: var(--lcars-color-b3); */
  position: relative;
  grid-area: sidebar-bottom;
  display: none;
}

.screen.SM .sidebar-bottom {
  /* Align all blocks to bottom of bar */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.sidebar-bottom::after {
  content: ' ';
  background-color: var(--lcars-color-black);
  position: absolute;
  bottom: 0;
  right: 0;
  width: 34px;
  height: calc(100% - var(--lcars-divider-bottom-height));
  border-top-left-radius: 32px 24px;
}

.sidebar-block {
  text-align: right;
  align-items: flex-end; /* Required on Chrome to align stuff in a button */
  /* padding: 10px 50px 2px 5px; */
  padding: 6px 48px 0px 5px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.sidebar-top .sidebar-block {
  border-bottom: var(--lcars-block-gap) solid var(--lcars-color-black);
  background-color: var(--lcars-color-a3);
  min-height: 62px;
  width: 100%;
  height: 60%;
  justify-content: flex-end;
}

.sidebar-top .sidebar-block:last-child {
  background-color: transparent;
  border: 0;
  justify-content: flex-start;
}

.sidebar-bottom .sidebar-block {
  border-top: var(--lcars-block-gap) solid var(--lcars-color-black);
  min-height: 62px;
  height: 60%;
  justify-content: flex-start;
}

.sidebar-bottom .sidebar-block:first-child {
  background-color: transparent !important;
  border: 0;
  justify-content: flex-end;
}

.sidebar-block > a {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 10px 50px 2px 5px;
  text-decoration: none;
  color: inherit;
}

.divider-top {
  position: relative;
  grid-row: 3;
  grid-column: 2;
  background-color: var(--lcars-color-a6);
  /* background-color: var(--lcars-color-b5); */
  display: none;
}

.divider-bottom {
  position: relative;
  grid-row: 4;
  grid-column: 2;
  background-color: var(--lcars-color-a1);
  /* background-color: var(--lcars-color-b3); */
  display: none;
}

.screen.SM .divider-top,
.screen.SM .divider-bottom {
  display: block;
}

.screen.SM .divider-grid {
  display: grid;
}

.bgcolor-1 {
  background-color: var(--lcars-color-a1) !important;
}
.bgcolor-2 {
  background-color: var(--lcars-color-a2) !important;
}
.bgcolor-3 {
  background-color: var(--lcars-color-a3) !important;
}
.bgcolor-4 {
  background-color: var(--lcars-color-a4) !important;
}
.bgcolor-5 {
  background-color: var(--lcars-color-a5) !important;
}
.bgcolor-6 {
  background-color: var(--lcars-color-a6) !important;
}
.bgcolor-7 {
  background-color: var(--lcars-color-a7) !important;
}
.bgcolor-8 {
  background-color: var(--lcars-color-a8) !important;
}
.bgcolor-9 {
  background-color: var(--lcars-color-a9) !important;
}

.bgcolor-2.linkable:hover {
  background-color: var(--lcars-color-a1) !important;
}
.bgcolor-3.linkable:hover {
  background-color: var(--lcars-color-a2) !important;
}
.bgcolor-6.linkable:hover {
  background-color: var(--lcars-color-a9) !important;
}

.meta-content {
  grid-area: meta-content;
  flex-direction: row;
  margin-left: 20px;
  margin-bottom: 5px;
  display: none;
}

.screen.SM .meta-content {
  display: flex;
}

.numbers-area {
  flex-grow: 1;
}

.numbers-area table {
  width: 100%;
}

.buttons-area {
  display: none;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: var(--lcars-block-gap);
  column-gap: var(--lcars-gap);
  justify-content: right;
  justify-items: right;
  align-content: flex-end;
  grid-auto-flow: column;
  margin-left: 20px;
}

.screen.MD .buttons-area {
  display: grid;
}

.screen.LG .buttons-area {
  margin-left: 40px;
}

.buttons-area > :nth-child(5),
.buttons-area > :nth-child(6) {
  display: none;
}

.screen.XL .buttons-area > :nth-child(5),
.screen.XL .buttons-area > :nth-child(6) {
  display: inherit;
}

.main-content {
  grid-area: main-content;
}

.screen.SM .main-content {
  margin-left: 20px;
  margin-top: 20px;
}

.screen.SM footer {
  display: none;
}

/* hack */
.screen.XS:not(.SM) .label-text {
  line-height: 47px;
}
</style>
