<template>
  <div class="App">
    <section class="lcars-type-01">
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
    </section>
  </div>
</template>

<script>
import DividerContent from './DividerContent.vue'

function makeRandomNumber (digits, padded) {
  if (!digits) {
    digits = 6
  }
  if (typeof padded === 'undefined') {
    padded = true
  }

  let number = Math.floor(Math.random() * Math.pow(10, digits)).toString()

  if (padded === true) {
    number = number.padStart(digits, '0')
  }

  return number
}

function makeRandomLetters (letters) {
  if (!letters) {
    letters = 3
  }
  
  // Don't pick I or O? (unless we find visual proof these are used)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'

  let set = ''
  for (let i = 0; i < letters; i++) {
    const pick = Math.floor(Math.random() * chars.length)
    set = set + chars.charAt(pick)
  }

  return set
}

function pickRandom (array) {
  return array[Math.floor(Math.random() * array.length)]
}

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
    DividerContent
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
  --lcars-top-section-height: 200px;
  --lcars-title-size: 50px;
  --lcars-divider-top-height: 16px;
  --lcars-divider-bottom-height: 16px;

  --lcars-block-gap: 5px;
}

html {
  box-sizing: border-box;
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
  font-size: 20px;
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
  background-color: var(--lcars-color-a1);
}
.bgcolor-2 {
  background-color: var(--lcars-color-a2);
}
.bgcolor-3 {
  background-color: var(--lcars-color-a3);
}
.bgcolor-4 {
  background-color: var(--lcars-color-a4);
}
.bgcolor-5 {
  background-color: var(--lcars-color-a5);
}
.bgcolor-6 {
  background-color: var(--lcars-color-a6);
}
.bgcolor-7 {
  background-color: var(--lcars-color-a7);
}
.bgcolor-8 {
  background-color: var(--lcars-color-a8);
}
.bgcolor-9 {
  background-color: var(--lcars-color-a9);
}
</style>
