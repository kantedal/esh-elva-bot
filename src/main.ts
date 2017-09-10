const apiai = require('apiai')
require('dotenv').config()
import {startChatClient} from './chat-client'
import {startExpressApp} from './start-express-app'
import * as express from 'express'
import {initApiAiWebhook} from './apiai-fulfillment/apiai-webhook'
import {IUser} from './chat-logics/databaseUser'
import {findPublicTransport} from './apiai-fulfillment/actions/public-transport'
import {sendMessage} from './chat-logics/api-ai'
import {initFacebookMessengerWebhook} from './facebook-webhook'
import {findPointOfInterest} from './apiai-fulfillment/actions/pointOfIntrest'
import {generateResponseJson} from './apiai-fulfillment/generateResponseJson'

export let apiaiApp

const startServer = async (): Promise<void> => {
  apiaiApp = apiai(process.env.APIAI_API_KEY)

  findPublicTransport('Stora torget linköping', 'Ryds alle 19')

  const App: express.Application = await startExpressApp()

  initApiAiWebhook(App)
  startChatClient()
  initFacebookMessengerWebhook(App)

}

startServer()
