/**
 * Makes a random number string for labels etc. Although it uses
 * numbers, the result is returned as a string so that leading zeros
 * can be added if needed.
 *
 * @param {Number} digits - Length of string
 * @param {Boolean} padded - If `true`, shorter numbers are padded
 *     with leading zeros until the `digits` length is met. Default
 *     is `true`
 * @param {Boolean|Number} spread - if `true`, distribute random
 *    numbers across the all lengths evenly. You can also pass a
 *    number above 0 to set a lower bound (e.g. if `digits` is 5
 *    and `spread` is 3, it will not return 1- or 2- digit long
 *    strings.) Note that `spread` overrides `padded`.
 * @returns {String}
 */
export function makeRandomNumber (
  digits: number,
  padded: boolean,
  spread: boolean | number,
): string {
  if (!digits) {
    digits = 6
  }
  if (typeof padded === 'undefined') {
    padded = true
  }

  let number, length
  if (spread) {
    const min = typeof spread === 'number' ? spread : 1
    length = getRandomInt(min, digits)
  } else {
    length = digits
  }

  // Numbers that are too big need to use BigInt to render
  if (length >= Number.MAX_SAFE_INTEGER.toString().length) {
    number = BigInt(Math.floor(Math.random() * Math.pow(10, length))).toString()
  } else {
    number = Math.floor(Math.random() * Math.pow(10, length)).toString()
  }

  if (padded === true && !spread) {
    number = number.padStart(digits, '0')
  }

  return number
}

export function makeRandomLetters (letters: number): string {
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

export function pickRandom <T> (array: ReadonlyArray<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function pickRandomWithoutReplacement <T> (array: Array<T>): T {
  const choice = pickRandom(array)
  const index = array.indexOf(choice)
  // Modifies original!
  array.splice(index, 1)
  return choice
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export function getRandomInt (min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Similar to above but does not deal with integers
 */
export function getRandomRange (min: number, max: number): number {
  return Math.random() * (max - min + 1) + min
}

/**
 * Implementation of throttle() by "You Don't Need Lodash"
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle
 *
 * @param {Function} func
 * @param {Number} timeFrame
 * @returns throttledFunc
 */
export function throttle (func: Function, timeFrame: number) {
  let lastTime = 0
  return function () {
    const now = new Date().valueOf()
    if (now - lastTime >= timeFrame) {
      func()
      lastTime = now
    }
  }
}

// The modern Fisher-Yates shuffle algorithm
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export function shuffle<T> (a: Array<T>): Array<T> {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}
