const readline = require('node:readline/promises')
const { stdin: input, stdout: output } = require('node:process')

const rl = readline.createInterface({ input, output })

;(async function mainFunc() {
  const input = await rl.question(
    'Please enter a few words or numbers separated by a space '
  )

  const normalizedInput = input.trim().toLowerCase()

  if (normalizedInput === '') {
    console.log('===\nInput can`t be empty string\n===')
    mainFunc()
  }

  if (normalizedInput === 'exit') {
    console.log('===\nBye\n===')
    rl.close()
    return
  }

  const array = normalizedInput.split(' ')

  const values = {
    all: array,
    words: array.filter((word) => isNaN(Number(word))),
    numbers: array.filter((word) => !isNaN(Number(word))),
  }

  const variant = await rl.question(`Pls select option: \n
    a. Sort words alphabetically
    b. Show numbers in ascending order
    c. Show numbers in descending order
    d. Display words in ascending order by number of letters in the word
    e. Show only unique words
    f. Display only unique values from the set of words and numbers\n
    for exit - type 'exit' 
    ***write only one variant(a, b, c...): `)

  switch (variant) {
    case 'a':
      console.log(filterAlphabet(values.words))
      break
    case 'b':
      console.log(filterAscending(values.numbers))
      break
    case 'c':
      console.log(filterDescending(values.numbers))
      break
    case 'd':
      console.log(filterByQuantityOfLetters(values.words))
      break
    case 'e':
      console.log(filterUnique(values.words))
      break
    case 'f':
      console.log(filterUnique(values.all))
      break
    default:
      console.log('Please provide correct variant')
      mainFunc()
      break
  }
  mainFunc()
})()

const filterAlphabet = (array) => {
  return array.sort()
}
const filterAscending = (array) => {
  return array.sort((a, b) => a - b)
}
const filterDescending = (array) => {
  return array.sort((a, b) => b - a)
}
const filterByQuantityOfLetters = (array) => {
  return array.sort((a, b) => a.length - b.length)
}
const filterUnique = (array) => {
  const result = new Set(array)
  return [...result]
}
