
export function makeRandomNumber (digits, padded) {
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
