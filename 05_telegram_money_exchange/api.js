import axios from 'axios'

export const getExchangeRate = async () => {
  const { data } = await axios.get(
    'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
  )
  return data
}
