import {startChatClient} from './chat-client'
import {startExpressApp} from './start-express-app'
import * as express from 'express'
import {initApiAiWebhook} from './apiai-fulfillment/apiai-webhook'

const startServer = async (): Promise<void> => {
  const App: express.Application = await startExpressApp()
  initApiAiWebhook(App)
  startChatClient()
}

startServer()