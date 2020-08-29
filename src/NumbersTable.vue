<template>
  <table name="table" ref="container">
    <tr v-for="(row, index) in numbers" :key="index" class="hidden">
      <td v-for="item in row" :key="item">
        {{ item }}
      </td>
    </tr>
  </table>
</template>

<script>
import { makeRandomLetters, makeRandomNumber, pickRandom } from './utils'

const HARDCODED_NUMBER_OF_COLUMNS = 18
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

  const selection = [6, 4, 3, 10, 2, 5, 4, 2, 4, 8, 5, 2, 3, 6, 5, 7, 2, 3]
  const lengths = shuffle(selection)

  for (let i = 0; i < HARDCODED_NUMBER_OF_ROWS; i++) {
    const row = []
    for (let j = 0; j < HARDCODED_NUMBER_OF_COLUMNS; j++) {
      row.push(makeRandomNumber(lengths[j], false))
    }

    data.push(row)
  }

  return data
}

export default {
  name: 'numbers-table',
  data: function () {
    return {
      numbers: generateData()
    }
  },
  mounted() {
    this.$nextTick(() => {
      // Every cell has a 2% chance of remaining dark
      const cells = this.$refs.container.querySelectorAll('td')
      for (let i = 0; i < cells.length; i++) {
        const rand = Math.random()
        if (rand < 0.02) {
          cells[i].style.opacity = 0
        }
      }

      // Animate in each row
      const rows = this.$refs.container.querySelectorAll('tr')
      let prevDelay = 0

      for (let i = 0; i < rows.length; i++) {
        const randomDelay = Math.floor(Math.random() * 175) + 25
        const delay = prevDelay + randomDelay

        // Record previous delay so that next row always appears after previous
        prevDelay = delay

        window.setTimeout(() => {
          rows[i].classList.remove('hidden')
        }, delay)
      }

      // After all rows have animated in, do the highlighting thing
      const randomWait = Math.floor(Math.random() * 500) + 200
      let prevHighlightDelay = 0
      window.setTimeout(() => {
        for (let i = 0; i < rows.length + 2; i++) {
          const randomDelay = Math.floor(Math.random() * 350) + 50
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
        const randomBuffer = Math.floor(Math.random() * 1000) + 200
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
  table {
    line-height: 1;
  }

  td {
    color: var(--lcars-color-a9);
    text-align: right;
    padding-left: 10px;
  }

  tr.hidden {
    opacity: 0;
  }

  tr.highlighted > td {
    color: var(--lcars-color-a8);
  }

  td:nth-child(9),
  td:nth-child(10),
  td:nth-child(11),
  td:nth-child(12),
  td:nth-child(13),
  td:nth-child(14),
  td:nth-child(15),
  td:nth-child(16) {
    display: none;
  }

  @media (min-width: 1280px) {
    td:nth-child(9),
    td:nth-child(10),
    td:nth-child(11),
    td:nth-child(12) {
      display: table-cell;
    }
  }

  @media (min-width: 1800px) {
    td:nth-child(13),
    td:nth-child(14),
    td:nth-child(15),
    td:nth-child(16) {
      display: table-cell;
    }
  }
</style>
