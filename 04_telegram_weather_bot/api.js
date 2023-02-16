import axios from 'axios'

// ! Insert your api key here
const api_key = ''

const lat = '50.51'
const long = '30.79'

export const getForecast = async () => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`
  )
  return data.list
}
