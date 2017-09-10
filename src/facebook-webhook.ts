import * as express from 'express'
import {error} from 'util'
import {sendMessage} from './chat-logics/api-ai'
import {getWeather, isRain} from './apiai-fulfillment/actions/weather'
import {getDatabaseUser, IUser} from './chat-logics/databaseUser'
import * as moment from 'moment'

const request = require('request')
const access_token: string = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
const verify_token: string = process.env.MESSENGER_VERIFY_TOKEN

export const initFacebookMessengerWebhook = (app: express.Application) => {
  app.get('/', async (req, res) => {
       const time = Math.floor((moment('2017-09-11').valueOf() - moment().valueOf()) / 3600000)

    res.send(await getWeather('2017-09-11'))
  })

  // Facebook
  app.get('/messenger-webhook/', (req, res) => {
    if(req.query['hub.verify_token'] === verify_token) {
        res.send(req.query['hub.challenge'])
    }
    res.send('Wrong token.')
  })

  app.post('/messenger-webhook/', async (req, res) => {
    console.log(req.body.entry[0].messaging[0].sender)
    const messaging_events = req.body.entry[0].messaging

    for(const event of messaging_events){
      const senderId = event.sender.id

      getDatabaseUser(senderId, senderId).then(async (user: IUser) => {
        if(event.message && event.message.text) {
          const text = event.message.text
          const responseMessage: string = await sendMessage(text, user.sessionId, user)
          sendText(senderId, responseMessage)
        }
      })
    }

    res.sendStatus(200)
  })

}

const sendText = (sender, text) => {
  const messageData = {text}
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData
    }
  })
}
