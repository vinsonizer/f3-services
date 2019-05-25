const SlackBot = require('slackbots')
const wp = require('./worshipplanning')

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
  handleMessage(data)
})

/* ========== Helper Methods ========== */

function handleMessage (data) {
  if (data.text.includes(bot.self.id)) {
    if (data.text.includes('AOs')) {
      wp.getEvents((err, events) => {
        if (err) console.log(err)
        sendMessage(data, 'hi', { blocks: JSON.stringify(formatAOs(events)) })
      })
    }
  }
  // echo(data)
}

function formatAOs (events) {
  const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }

  let fullAOs = events.map((event) => {
    return event.location
  })
  let blockAOs = fullAOs.filter(unique).sort().map((theAO) => {
    return blockify(theAO)
  })
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Here is what I know'
      }
    },
    {
      type: 'actions',
      elements: blockAOs
    }
  ]
}

function blockify (location) {
  return {
    type: 'button',
    text: {
      type: 'plain_text',
      text: location,
      emoji: true
    },
    value: location
  }
}

function sendMessage (data, content, params) {
  bot.getChannelById(data.channel).then((channel) => {
    bot.getUserById(data.user).then((user) => {
      bot.postMessageToChannel(channel.name, content, params)
    })
  }).catch((err) => {
    console.log(err)
  })
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
