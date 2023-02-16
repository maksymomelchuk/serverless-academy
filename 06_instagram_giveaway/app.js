import fs from 'fs/promises'
import path from 'path'

const dir = './words'
const array = await fs.readdir(dir, (_, files) => {
  return files.length
})

// Read all files
async function readFile(file) {
  try {
    const data = (await fs.readFile(file, 'utf8')) || '[]'
    return data
  } catch (error) {
    console.error(error)
  }
}
// Create array of arrays
const newArr = await Promise.all(
  array.map(async (el) => {
    const data = await readFile(path.resolve(`./words/${el}`))
    return [...new Set(data.split('\n'))]
  })
)
// Performance counter
const countPerformance = (cb, arr) => {
  const start = performance.now()
  cb(arr)
  const end = performance.now()
  console.log(
    `Time to calculate - ${((end - start) / 1000).toFixed(2)} seconds.`
  )
}
// Found unique values from all files
const uniqueValues = (arr) => {
  const set = new Set(arr.flat(1)).size
  console.log(`In all files were found ${set} unique values`)
  return set
}
// Found unique values that exists in all files
const existInAllFiles = (arr) => {
  const counts = {}

  for (let i = 0; i < arr.length; i++) {
    for (const value of arr[i]) {
      if (counts[value]) {
        counts[value] += 1
      } else {
        counts[value] = 1
      }
    }
  }
  const all = Object.values(counts).filter((el) => el === 20).length
  console.log(`It were found ${all} unique values that exists in all files`)
  return all
}
// Found unique values that exist in at least 10 files
const existInAtleastTen = (arr) => {
  const counts = {}

  for (let i = 0; i < arr.length; i++) {
    for (const value of arr[i]) {
      if (counts[value]) {
        counts[value] += 1
      } else {
        counts[value] = 1
      }
    }
  }
  const tenOrMore = Object.values(counts).filter((el) => el >= 10).length
  console.log(
    `It were found ${tenOrMore} values that exists in ten or more files`
  )
  return tenOrMore
}
// All in one function
const bestPerformance = (arr) => {
  const counts = {}

  for (let i = 0; i < arr.length; i++) {
    for (const value of arr[i]) {
      if (counts[value]) {
        counts[value] += 1
      } else {
        counts[value] = 1
      }
    }
  }
  const data = Object.values(counts)
  const total = data.length
  const tenOrMore = data.filter((el) => el >= 10).length
  const inAll = data.filter((el) => el === 20).length
  console.log(`\n\nCombine function
                \n${total} unique values in all files
                \n${tenOrMore} unique values that exists in at least ten files
                \n${inAll} unique values that exists in all files`)
  return { tenOrMore, total, inAll }
}

countPerformance(uniqueValues, newArr)
countPerformance(existInAtleastTen, newArr)
countPerformance(existInAllFiles, newArr)

// All in one function, uncomment if needed
// countPerformance(bestPerformance, newArr)
