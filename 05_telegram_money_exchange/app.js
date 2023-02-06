import TelegramBot from 'node-telegram-bot-api'
import * as dotenv from 'dotenv'
import { getExchangeRate } from './api.js'
dotenv.config()

// Enter your data here
const token = process.env.BOT_TOKEN
const chatId = process.env.CHAT_ID

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true })

await bot.sendMessage(chatId, 'Обмін валют', {
  reply_markup: {
    keyboard: [['Курс валют']],
  },
})

bot.on('message', (msg) => {
  if (msg.text.toString().toLowerCase().includes('курс')) {
    bot.sendMessage(msg.chat.id, 'Виберіть валюту', {
      reply_markup: {
        keyboard: [['USD'], ['EUR']],
      },
    })
  }
})

bot.on('message', async (msg) => {
  const currency = msg.text.toString().toLowerCase()
  if (currency.includes('usd') || currency.includes('eur')) {
    const data = await getExchangeRate()
    const { buy, sale } = data.find(
      (item) => item.ccy.toLowerCase() === currency
    )
    bot.sendMessage(
      msg.chat.id,
      `Купівля - ${buy.slice(0, 5)}UAH\nПродаж - ${sale.slice(0, 5)}UAH`
    )
  }
})

bot.onText(/\/start/, () => {
  bot.sendMessage(chatId, 'Обмін валют', {
    reply_markup: {
      keyboard: [['Курс валют']],
    },
  })
})
