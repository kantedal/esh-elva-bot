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

    res.send(await getWeather('2017-09-12'))
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
          const responseData: any = await sendMessage(text, user.sessionId, user)

          sendText(senderId, responseData)

        }
      })
    }

    res.sendStatus(200)
  })

}

const sendText = (sender, responseData) => {
  let messageData
  if(responseData.dataObject) {
      messageData = {
          attachment:{
              type:'template',
              payload:{
                  template_type:'generic',
                  elements:[
                      {
                          title:responseData.eventName,
                          image_url:responseData.imgUrl,
                          buttons:[
                              {
                                  type:'web_url',
                                  url:responseData.url,
                                  title:'More information'
                              }
                          ]
                      }
                  ]
              }
          }
      }
  } else {
    messageData = {text:responseData.translatedResponseMessage}
  }
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
