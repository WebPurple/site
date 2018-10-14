import translit from 'translit'
import translitMapRU from 'translit-russian'

export const translitRU = translit(translitMapRU) // eslint-disable-line import/prefer-default-export

export const getNoun = (one, two, five) => number => {
  number = Math.abs(number)
  number %= 100
  if (number >= 5 && number <= 20) {
    return five
  }
  number %= 10
  if (number === 1) {
    return one
  }
  if (number >= 2 && number <= 4) {
    return two
  }
  return five
}