<template>
  <div class="App">
    <section class="lcars-type-01"
      data-observe-resizes
      data-breakpoints='{"SM": 760, "MD": 1200, "LG": 1600, "XL": 1900}'
    >
      <div class="lcars-title">{{title}}</div>
      <div class="sidebar-top">
        <div class="sidebar-block">{{numbers[0]}}</div>
        <div class="sidebar-block">{{numbers[1]}}</div>
      </div>
      <div class="sidebar-bottom">
        <div class="sidebar-block">{{numbers[2]}}</div>
        <div class="sidebar-block bgcolor-2">{{numbers[3]}}</div>
        <div class="sidebar-block bgcolor-6">{{numbers[4]}}</div>
        <div class="sidebar-block bgcolor-3">{{numbers[5]}}</div>
      </div>
      <div class="divider-top"></div>
      <div class="divider-bottom"></div>
      <!-- Can switch between divider types 1 and 2 -->
      <divider-content></divider-content>
      <div class="meta-content">
        <div class="numbers-area">
          <numbers-table :key="numberSequence"></numbers-table>
        </div>
        <div class="buttons-area">
          <lcars-button></lcars-button>
          <lcars-button></lcars-button>
          <lcars-button :color="3"></lcars-button>
          <lcars-button></lcars-button>
          <lcars-button></lcars-button>
          <lcars-button></lcars-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DividerContent from './DividerContent.vue'
import LCARSButton from './LCARSButton.vue'
import NumbersTable from './NumbersTable.vue'
import { makeRandomLetters, makeRandomNumber, pickRandom } from './utils'

export default {
  data() {
    const sidebarLabelType = Math.random()
    const titleType = Math.random()

    const titles = [
      'Chin\'toka Star System',
      'Tactical Cartography',
      'Long Range Navigational Scan',
      'Cerritos Operations',
      'Master Systems Display',
      'Communicator Transponder Scan'
    ]
    let title
    if (titleType < 0.33) {
      // type 1: title only
      title = pickRandom(titles)
    } else if (titleType < 0.66) {
      // type 2: title + dot + number
      title = `${pickRandom(titles)} • ${makeRandomNumber(4, false)}`
    } else if (titleType < 0.825) {
      // type 3a: title + number (no dot)
      title = `${pickRandom(titles)} ${makeRandomNumber(5, false)}`
    } else {
      // type 3b: title + number (no dot), 3 digits with leading zero padded
      title = `${pickRandom(titles)} ${makeRandomNumber(3, true)}`
    }

    return {
      title: title,
      numberSequence: 0,
      numbers: new Array(6).fill(0).map(function () {
        let value

        // type 1
        // 6 random digits
        if (sidebarLabelType < 0.33) {
          value = makeRandomNumber(6)
        } else if (sidebarLabelType < 0.66) {
          // type 2
          // 2 digits - 7 digits - 2 digits
          // verify middle number digits
          value = `${makeRandomNumber(2)}-${makeRandomNumber(7)}-${makeRandomNumber(2)}`
        } else {
          // type 3
          // three letters + 4 numbers
          value = `${makeRandomLetters(3)} ${makeRandomNumber(4)}`
        }

        return value
      })
    }
  },
  components: {
    DividerContent,
    'lcars-button': LCARSButton,
    NumbersTable
  },
  mounted() {
    window.addEventListener('lcars:update_numbers_table', () => {
      this.numberSequence++
    })
  }
}
</script>

<style>
/* otf is not being loaded correctly (by snowpack?) so we converted to woff intead */
@font-face {
  font-family: "lcars";
  src: url("/fonts/HelveticaLTStd-UltraComp.woff") format("woff"),
       url("/fonts/HelveticaLTStd-UltraComp.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}
:root {
  /* Doug Drexler reference colors */
  --lcars-color-a1: #ec943a;
  --lcars-color-a2: #eb9870;
  --lcars-color-a3: #c47d69;
  --lcars-color-a4: #d29a7f;
  --lcars-color-a5: #faa41b;
  --lcars-color-a6: #c082a9;
  --lcars-color-a7: #9c698a;
  --lcars-color-a8: #b6a5d1;
  --lcars-color-a9: #8b72aa;

  /* old colors - do not use */
  --lcars-color-b1: #ffff99;
  --lcars-color-b2: #ffcc66;
  --lcars-color-b3: #ff9933;
  --lcars-color-b4: #664466;
  --lcars-color-b5: #cc99cc;
  --lcars-color-b6: #99ccff;
  --lcars-color-b7: #3366cc;
  --lcars-color-b8: #006699;
  --lcars-color-black: #090909;

  --lcars-gap: 10px;
  --lcars-sidebar-width: 185px;
  --lcars-top-section-height: 210px;
  --lcars-title-size: 50px;
  --lcars-divider-top-height: 16px;
  --lcars-divider-bottom-height: 16px;

  --lcars-block-gap: 5px;
}

html {
  box-sizing: border-box;
  font-size: 20px;
}

html *,
html *::before,
html *::after {
  box-sizing: inherit;
}

body {
  background-color: var(--lcars-color-black);
  margin: 0;
  padding: 0;
  font-family: 'lcars', sans-serif;
  user-select: none;
}

html, body {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.App {
  height: 100vh;
  padding: 40px 56px;
}

.lcars-type-01 {
  --header-content-area: calc(var(--lcars-top-section-height) - var(--lcars-title-size) - var(--lcars-divider-top-height));

  display: grid;
  grid-template-columns:
    [sidebar-start]
      var(--lcars-sidebar-width)
    [sidebar-end content-start]
      auto
    [content-end];
  grid-template-rows:
    [header-start]
      /* poor vertical line metrics means this will be misaligned on Windows */
      /* so we give the title grid a bit more space */
      /* ideally we fix the font, but the easiest way to do it is with fontsquirrel's web font converter and they have blacklisted the font */
      calc(var(--lcars-title-size) * 1.1)
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
  column-gap: 0;
  row-gap: var(--lcars-gap);
  height: 100%;
}

.lcars-title {
  color: var(--lcars-color-a5);
  font-size: calc(var(--lcars-title-size) * 1.25); /* make actual capital letter height match height of row with a multiplier */
  line-height: 1;
  text-transform: uppercase;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  /* truncating a string with custom string is not supported in any browser except Firefox */
  text-overflow: '';
}

.sidebar-top {
  background-color: var(--lcars-color-a6);
  /* background-color: var(--lcars-color-b5); */
  border-bottom-left-radius: 72px 48px;
  position: relative;
  grid-area: sidebar-top;
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
  padding: 10px 50px 2px 5px;
  display: flex;
  flex-direction: column;
}

.sidebar-top .sidebar-block {
  border-bottom: var(--lcars-block-gap) solid var(--lcars-color-black);
  background-color: var(--lcars-color-a3);
  min-height: 62px;
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

.divider-top {
  position: relative;
  grid-row: 3;
  grid-column: 2;
  background-color: var(--lcars-color-a6);
  /* background-color: var(--lcars-color-b5); */
}

.divider-bottom {
  position: relative;
  grid-row: 4;
  grid-column: 2;
  background-color: var(--lcars-color-a1);
  /* background-color: var(--lcars-color-b3); */
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

.meta-content {
  grid-area: meta-content;
  display: flex;
  flex-direction: row;
}

.numbers-area {
  flex-grow: 1;
}

.numbers-area table {
  width: 100%;
}

.lcars-type-01.SM .numbers-area table {
  margin-right: 40px;
  width: calc(100% - 40px);
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
}

.lcars-type-01.SM .buttons-area {
  display: grid;
}

.buttons-area > :nth-child(5),
.buttons-area > :nth-child(6) {
  display: none;
}

.lcars-type-01.LG .buttons-area > :nth-child(5),
.lcars-type-01.LG .buttons-area > :nth-child(6) {
  display: inherit;
}

</style>
