import {IUser} from './databaseUser'
import {translateMessage} from './translate'
const apiai = require('apiai')
const translate = require('google-translate-api')

const app = apiai('414d7edb81324f84ab648cbbe1701c0f')

export const sendMessage = async (message: string, sessionToken: string, databaseUser: IUser) => {
  const translatedMessage = message // await translateMessage(message, 'en')

  return new Promise<string>((resolve, reject) => {
    console.log(translatedMessage)
    const request = app.textRequest(translatedMessage, {
      sessionId: sessionToken.substring(100, 136)
    })

    request.on('response', async (response) => {
      console.log(response)
      const responseMessage = response.result.fulfillment.speech
      const translatedResponseMessage = await translateMessage(responseMessage, 'sv')
      console.log(translatedResponseMessage)
      resolve(translatedResponseMessage)
    })

    request.on('error', (error) => {
      reject()
    })

    request.end()
  })
}