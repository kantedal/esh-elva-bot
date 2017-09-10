import {IUser, setSessionId} from './databaseUser'
import {translateMessage, setCurrentLanguageForMessage} from './translate'
import {apiaiApp} from '../main'
import SessionManager from '../SessionManager'

export const sendMessage = async (message: string, sessionToken: string, databaseUser: IUser) => {
  return new Promise<string>(async (resolve, reject) => {
    await setCurrentLanguageForMessage(message, databaseUser.sessionId || databaseUser.userId)
    const translatedMessage = await translateMessage(message, 'en')
    console.log(`User ${databaseUser.userId.substring(0, 10)} sent message: ${message}`)
    console.log(`Translated message (if so): ${translatedMessage}`)

    const request = apiaiApp.textRequest(translatedMessage, {
      sessionId: sessionToken.substring(1, 36)
    })

    request.on('response', async (response) => {
      try {
        const responseMessage = response.result.fulfillment.speech
        const userLanguage = databaseUser.sessionId ? SessionManager.Instance.getCurrentLanguageForUser(databaseUser.sessionId || databaseUser.userId) : 'sv'
        const translatedResponseMessage = await translateMessage(responseMessage, userLanguage)

        console.log(`Apiai response: ${response.result.fulfillment.speech}`)
        console.log(`Apiai translated response (if so): ${translatedResponseMessage}`)

        setSessionId(databaseUser.userId, response.sessionId)

        resolve(translatedResponseMessage)

      } catch(error) {
        console.log('error', error)
      }

    })

    request.on('error', (error) => {
      reject()
    })

    request.end()
  })
}
