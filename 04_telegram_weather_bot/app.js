import TelegramBot from 'node-telegram-bot-api'
import { getForecast } from './api.js'

// ! Insert your telegram token here
const token = ''

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true })

bot.setMyCommands([
  { command: '/start', description: 'Want to check weather?' },
])

bot.on('message', (msg) => {
  if (msg.text.toString().toLowerCase().includes('brovary')) {
    bot.sendMessage(msg.chat.id, 'Choose time period', {
      reply_markup: {
        keyboard: [['3 hours'], ['6 hours']],
      },
    })
  }
})

bot.on('message', async (msg) => {
  const interval = msg.text.toString().toLowerCase()[0]
  if (interval.includes('3') || interval.includes('6')) {
    const forecast = await getForecast()
    const dataToDisplay = []
    for (let i = 0; i < forecast.length; i += interval / 3) {
      dataToDisplay.push(forecast[i])
    }

    bot.sendMessage(
      msg.chat.id,
      `Weather forecast with ${interval} hours interval:\n\n${dataToDisplay
        .slice(0, 21)
        .map((el) => {
          const {
            main: { temp, pressure, humidity },
            dt_txt,
          } = el
          return `📅Дата та час: ${dt_txt}\n🌡Температура повітря: ${temp}°\n🌪Атмосферний тиск: ${pressure}мбар\n💦Вологість повітря: ${humidity}%`
        })
        .join('\n------\n')}`
    )
  }
})

bot.onText(/\/start|start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Forecast in Brovary ♥:', {
    reply_markup: {
      keyboard: [['Brovary']],
    },
  })
})
