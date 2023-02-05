import TelegramBot from 'node-telegram-bot-api'
import * as dotenv from 'dotenv'
import { program } from 'commander'
dotenv.config()

const token = process.env.BOT_TOKEN
const chatId = process.env.CHAT_ID

const bot = new TelegramBot(token, { polling: true })

program
  .option('-m, --message <message>', 'Send message to telegram bot')
  .option('-p, --photo <path>', 'Send photo to telegram bot')
  .option('-h, --help', 'Show options')

program.parse(process.argv)

const argv = program.opts()

if (argv.message) {
  await bot.sendMessage(chatId, argv.message)
}

if (argv.photo) {
  await bot.sendPhoto(chatId, argv.photo)
}

if (argv.help) {
  console.log(
    'Options:\n' +
      program.options
        .map((item) => item.flags + ' --> ' + item.description + '\n')
        .join('')
  )
}

process.exit()
