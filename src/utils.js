
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
export function makeRandomNumber (digits, padded, spread) {
  if (!digits) {
    digits = 6
  }
  if (typeof padded === 'undefined') {
    padded = true
  }

  let number
  if (spread) {
    const min = Number.isInteger(spread) ? spread : 1
    const trunc = getRandomInt(min, digits)
    number = Math.floor(Math.random() * Math.pow(10, trunc)).toString()
  } else {
    number = Math.floor(Math.random() * Math.pow(10, digits)).toString()
  }

  if (padded === true && !spread) {
    number = number.padStart(digits, '0')
  }

  return number
}

export function makeRandomLetters (letters) {
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

export function pickRandom (array) {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
