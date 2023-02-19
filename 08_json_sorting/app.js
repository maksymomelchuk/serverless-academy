import axios from 'axios'

const api = [
  'https://jsonbase.com/sls-team/json-793',
  'https://jsonbase.com/sls-team/json-955',
  'https://jsonbase.com/sls-team/json-231',
  'https://jsonbase.com/sls-team/json-931',
  'https://jsonbase.com/sls-team/json-93',
  'https://jsonbase.com/sls-team/json-342',
  'https://jsonbase.com/sls-team/json-770',
  'https://jsonbase.com/sls-team/json-491',
  'https://jsonbase.com/sls-team/json-281',
  'https://jsonbase.com/sls-team/json-718',
  'https://jsonbase.com/sls-team/json-310',
  'https://jsonbase.com/sls-team/json-806',
  'https://jsonbase.com/sls-team/json-469',
  'https://jsonbase.com/sls-team/json-258',
  'https://jsonbase.com/sls-team/json-516',
  'https://jsonbase.com/sls-team/json-79',
  'https://jsonbase.com/sls-team/json-706',
  'https://jsonbase.com/sls-team/json-521',
  'https://jsonbase.com/sls-team/json-350',
  'https://jsonbase.com/sls-team/json-64',
]

const fetch = async (url, attempts = 3) => {
  while (attempts > 0) {
    try {
      const response = await axios.get(url)
      if (response.status === 200) {
        return await response.data
      }
    } catch (error) {
      // console.log(error)
    }
    attempts -= 1
  }
  // console.log(`Can`t fetch ${url} after 3 attempts`)
  return null
}

const findProperty = (obj, key) => {
  if (obj.hasOwnProperty(key)) {
    return obj[key]
  }
  // Recursive
  if (typeof obj === 'object' && obj !== null) {
    for (const prop in obj) {
      if (findProperty(obj[prop], key)) {
        return obj[prop][key]
      }
    }
  }
  return false
}

const query = async (arr) => {
  const results = []
  for (const url of arr) {
    const response = await fetch(url)
    if (response) {
      const isDone = findProperty(response, 'isDone')
      console.log(`[Success] ${url}: isDone - ${isDone}`)
      results.push(isDone)
    } else {
      console.log(`[Fail] ${url}: The endpoint is unavailable`)
    }
  }

  const trully = results.filter((el) => el === true).length
  const falsy = results.length - trully
  const failed = arr.length - results.length

  console.log(`Found True values: ${trully}`)
  console.log(`Found False values: ${falsy}`)
  console.log(`Found Failed values: ${failed}`)

  return results
}

query(api)
