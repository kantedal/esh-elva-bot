import {initFacebookMessengerWebhook} from './facebook-webhook';

require('dotenv').config()
import {startChatClient} from './chat-client'
import {startExpressApp} from './start-express-app'
import * as express from 'express'
import {initApiAiWebhook} from './apiai-fulfillment/apiai-webhook'
import {findPublicTransport} from './apiai-fulfillment/actions/public-transport'
import {sendMessage} from './chat-logics/api-ai'

const startServer = async (): Promise<void> => {
  findPublicTransport('Stora torget linköping', 'Ryds alle 19')

  const App: express.Application = await startExpressApp()

  initApiAiWebhook(App)
  startChatClient()
  initFacebookMessengerWebhook(App)


}

startServer()