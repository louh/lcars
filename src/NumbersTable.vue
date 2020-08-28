<template>
  <table>
    <tr>
      <td>{{makeRandomNumber(6, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>
      <td>{{makeRandomNumber(3, false)}}</td>
      <td>{{makeRandomNumber(10, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>

      <td>{{makeRandomNumber(8, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(3, false)}}</td>
      <td>{{makeRandomNumber(6, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(7, false)}}</td>
    </tr>
    <tr class="highlighted">
      <td>{{makeRandomNumber(6, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>
      <td>{{makeRandomNumber(3, false)}}</td>
      <td>{{makeRandomNumber(10, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>

      <td>{{makeRandomNumber(8, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(3, false)}}</td>
      <td>{{makeRandomNumber(6, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(7, false)}}</td>
    </tr>
    <tr class="highlighted">
      <td>{{makeRandomNumber(6, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>
      <td>{{makeRandomNumber(3, false)}}</td>
      <td>{{makeRandomNumber(10, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>

      <td>{{makeRandomNumber(8, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(3, false)}}</td>
      <td>{{makeRandomNumber(6, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(7, false)}}</td>
    </tr>
    <tr>
      <td>{{makeRandomNumber(6, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>
      <td>{{makeRandomNumber(3, false)}}</td>
      <td>{{makeRandomNumber(10, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>

      <td>{{makeRandomNumber(8, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(3, false)}}</td>
      <td>{{makeRandomNumber(6, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(7, false)}}</td>
    </tr>
    <tr>
      <td>{{makeRandomNumber(6, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>
      <td>{{makeRandomNumber(3, false)}}</td>
      <td>{{makeRandomNumber(10, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(4, false)}}</td>

      <td>{{makeRandomNumber(8, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(2, false)}}</td>
      <td>{{makeRandomNumber(3, false)}}</td>
      <td>{{makeRandomNumber(6, false)}}</td>
      <td>{{makeRandomNumber(5, false)}}</td>
      <td>{{makeRandomNumber(7, false)}}</td>
    </tr>
  </table>
</template>

<script>
import { makeRandomLetters, makeRandomNumber, pickRandom } from './utils'

const els = document.querySelectorAll('tr')
for (let i = 0; i < els.length; i++) {
  const el = els[i]
  console.log(el)
  el.classList.add('highlighted')
}

export default {
  data: function () {
    return {
      makeRandomNumber
    }
  }
}
</script>

<style scoped>
  td {
    color: var(--lcars-color-a9);
    text-align: right;
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
