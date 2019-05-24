const SlackBot = require('slackbots')

const BOT_NAME = process.env.COMZBOT_NAME

var bot = new SlackBot({
  token: process.env.COMZBOT_TOKEN,
  name: BOT_NAME
})

bot.on('start', () => {
  console.log(`${BOT_NAME} initialized`)
})

bot.on('message', (data) => {
  if (data.type !== 'message') {
    return
  }
  bot.getUserById(data.user).then((user) => {
    if (user.name !== BOT_NAME) handleMessage(data)
  })
})

/* ========== Helper Methods ========== */

function handleMessage (data) {
  switch (data.text) {
    case 'hi':
    case 'hello':
      sendGreeting(data)
      break
    default:
      // echo(data)
  }
}

function sendGreeting (data) {
  bot.getChannelById(data.channel).then((channel) => {
    bot.getUserById(data.user).then((user) => {
      bot.postMessageToChannel(channel.name, getGreeting(user.name))
    })
  })
}

function getGreeting (userId) {
  var greetings = [
    `hello <@${userId}>!`,
    `hi there <@${userId}>!`,
    `cheerio <@${userId}>!`,
    `how do you do!`,
    `¡hola!`
  ]
  return greetings[Math.floor(Math.random() * greetings.length)]
}

/*
Do not uncomment unless you want ComzBot to repeat everything you say...
function echo (data) {
  bot.getChannelById(data.channel).then((channel) => {
    bot.postMessageToChannel(channel.name, data.text)
  })
}
*/

module.exports = bot
