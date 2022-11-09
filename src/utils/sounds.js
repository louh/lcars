import howler from 'howler'

// Global pool of sounds
// As opposed to loading sounds per-component
export const sounds = {}

export function initSounds () {
  sounds.denyBeep1 = new howler.Howl({
    src: ['/sounds/deny_beep_01.ogg'],
    volume: 0.2
  })
  // Three beeps in quick succession
  sounds.panelBeep03 = new howler.Howl({
    src: ['/sounds/panel_beep_03.ogg'],
    volume: 0.1
  })
  // Single tap beep
  sounds.panelBeep07 = new howler.Howl({
    src: ['/sounds/panel_beep_07.ogg'],
    volume: 0.2
  })
  sounds.panelBeep08 = new howler.Howl({
    src: ['/sounds/panel_beep_08.ogg'],
    volume: 0.2
  })
  sounds.panelBeep13 = new howler.Howl({
    src: ['/sounds/panel_beep_13.ogg'],
    volume: 0.2
  })
  // Two beeps, short silent gap in between
  sounds.panelBeep14 = new howler.Howl({
    src: ['/sounds/panel_beep_14.ogg'],
    volume: 0.1
  })
}
