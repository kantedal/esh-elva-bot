import {initFacebookMessengerWebhook} from './facebook-webhook';

require('dotenv').config()
import {startChatClient} from './chat-client'
import {startExpressApp} from './start-express-app'
import * as express from 'express'
import {initApiAiWebhook} from './apiai-fulfillment/apiai-webhook'

const startServer = async (): Promise<void> => {
  console.log('hej')
  console.log(process.env.APIAI_API_KEY)
  const App: express.Application = await startExpressApp()
  initApiAiWebhook(App)
  startChatClient()
  initFacebookMessengerWebhook(App)
}

startServer()
