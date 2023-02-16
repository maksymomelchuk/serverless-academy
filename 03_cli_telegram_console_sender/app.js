import { program } from 'commander'

import TelegramBot from 'node-telegram-bot-api'

//! Enter your values
const token = ''
let chatId = ''

const bot = new TelegramBot(token, { polling: true })

program
  .version('0.0.1')
  .option('-m, --message <message>', 'Send message to telegram bot')
  .option('-p, --photo <path>', 'Send photo to telegram bot')
  .parse(process.argv)

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
