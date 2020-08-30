<template>
  <div className="numbers" ref="container">
    <div v-for="(row, index) in numbers" :key="index" class="numbers-row hidden">
      <span
        v-for="(item, index) in row"
        :key="item"
        className="numbers-cell"
        :style="{
          width: lengths[index] * 7 + 10 + 'px'
        }"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
import { makeRandomLetters, makeRandomNumber, pickRandom, getRandomInt } from './utils'

// Give it plenty of columns on wide monitors
const HARDCODED_NUMBER_OF_COLUMNS = 18 * 3
const HARDCODED_NUMBER_OF_ROWS = 6

// The modern Fisher-Yates shuffle algorithm
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffle (a) {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

function generateData () {
  const data = []

  // For each column, randomly determine how wide it is.
  // Minimum length is 2, maximum length is 10.
  // Commented out because the balance is weird
  // Better solution (below) for now is to use the original
  // hardcoded columns but shuffle it
  // const lengths = []
  // for (let i = 0; i < HARDCODED_NUMBER_OF_COLUMNS; i++) {
  //   lengths.push(Math.floor(Math.random() * 9) + 2)
  // }

  const selection = [
    6, 4, 3, 10, 2, 5, 4, 2, 4, 8, 5, 2, 3, 6, 5, 7, 2, 3,
    6, 4, 3, 10, 2, 5, 4, 2, 4, 8, 5, 2, 3, 6, 5, 7, 2, 3,
    6, 4, 3, 10, 2, 5, 4, 2, 4, 8, 5, 2, 3, 6, 5, 7, 2, 3,
  ]
  const lengths = shuffle(selection)

  // Some long columns get truncated
  let truncs = []
  for (let i = 0; i < HARDCODED_NUMBER_OF_COLUMNS; i++) {
    if (lengths[i] >= 6 && Math.random() > 0.5) {
      truncs.push(true)
    } else {
      truncs.push(false)
    }
  }

  for (let i = 0; i < HARDCODED_NUMBER_OF_ROWS; i++) {
    const row = []
    for (let j = 0; j < HARDCODED_NUMBER_OF_COLUMNS; j++) {
      const length = lengths[j]
      if (truncs[j] === true) {
        row.push(makeRandomNumber(length, false, 2))
      } else {
        row.push(makeRandomNumber(length, false))
      }
    }

    data.push(row)
  }

  return [data, lengths]
}

export default {
  name: 'numbers-table',
  data: function () {
    const [numbers, lengths] = generateData()
    return {
      numbers,
      lengths
    }
  },
  mounted() {
    this.$nextTick(() => {
      // Every cell has a 2% chance of remaining dark
      // Content must be hidden (not jus empty) or it throws off the
      // spacing of rows.
      const cells = this.$refs.container.querySelectorAll('.numbers-cell')
      for (let i = 0; i < cells.length; i++) {
        const rand = Math.random()
        if (rand < 0.02) {
          cells[i].style.opacity = 0
        }
      }

      // Animate in each row
      const rows = this.$refs.container.querySelectorAll('.numbers-row')
      let prevDelay = 0

      for (let i = 0; i < rows.length; i++) {
        const randomDelay = getRandomInt(25, 200)
        const delay = prevDelay + randomDelay

        // Record previous delay so that next row always appears after previous
        prevDelay = delay

        window.setTimeout(() => {
          rows[i].classList.remove('hidden')
        }, delay)
      }

      // After all rows have animated in, do the highlighting thing
      const randomWait = getRandomInt(100, 500)
      let prevHighlightDelay = 0
      window.setTimeout(() => {
        for (let i = 0; i < rows.length + 2; i++) {
          const randomDelay = getRandomInt(0, 250)
          const delay = prevHighlightDelay + randomDelay

          // Record previous delay so that next row always appears after previous
          prevHighlightDelay = delay

          window.setTimeout(() => {
            if (rows[i - 2]) {
              rows[i - 2].classList.remove('highlighted')
            }
            if (rows[i]) {
              rows[i].classList.add('highlighted')
            }
          }, delay)
        }

        // Lastly, re-render the view
        const randomBuffer = getRandomInt(0, 1000)
        const totalTime = prevDelay + randomWait + prevHighlightDelay + randomBuffer
        window.setTimeout(() => {
          // This resets the key on the parent component level, which forces
          // component to recompute all values and re-render!
          window.dispatchEvent(new CustomEvent('lcars:update_numbers_table'))
        }, totalTime)
      }, prevDelay + randomWait)
    })
  }
}
</script>

<style scoped>
  .numbers {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    /* This line height probably needs to be adjusted if the height of
    the display area changes at all */
    line-height: 1.2;
  }

  .numbers-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; /* This allows content to disappear responsively */
    justify-content: space-between;
    overflow: hidden; /* This allows content to disappear responsively */
  }

  .numbers-cell {
    color: var(--lcars-color-a9);
    text-align: right;
    margin-left: 10px;
  }

  .numbers-row.hidden {
    opacity: 0;
  }

  .numbers-row.highlighted .numbers-cell {
    color: var(--lcars-color-a8);
  }
</style>
