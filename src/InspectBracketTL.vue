<template>
  <svg :width="width" :height="height" :fill="fill" :style="orientation" viewBox="0 0 38 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(0.264583,0,0,0.264583,-321,-333)">
        <path d="M1213.23,1334.17L1213.23,1341.73L1285.04,1341.73L1285.04,1326.61C1285.04,1311.5 1300.16,1300.16 1315.28,1300.16L1337.95,1300.16L1337.95,1258.58L1285.04,1258.58C1247.24,1258.58 1213.23,1288.82 1213.23,1334.17Z"/>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      default: '100%',
      type: String
    },
    height: {
      default: '',
      type: String
    },
    fill: {
      default: 'black',
      type: String
    },
    position: {
      default: 'topleft',
      type: String,
      validator: value => {
        return [
          'topleft',
          'topright',
          'bottomleft',
          'bottomright'
        ].includes(value)
      }
    }
  },
  computed: {
    orientation() {
      switch (this.position) {
        case 'topleft':
          return ''
        case 'topright':
          return 'transform:scaleX(-1);'
        case 'bottomleft':
          return 'transform:scaleY(-1);'
        case 'bottomright':
          return 'transform:rotate(180deg);'
      }
    }
  }
}
</script>
