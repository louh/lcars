import howler from 'howler'

// Global pool of sounds
// As opposed to loading sounds per-component
export const sounds = {}

export function initSounds () {
  sounds.denyBeep1 = new howler.Howl({
    src: ['/sounds/deny_beep_01.ogg'],
    volume: 0.2
  })
}
