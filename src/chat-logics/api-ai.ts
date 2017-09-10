import {IUser, setSessionId} from './databaseUser'
import {translateMessage, setCurrentLanguageForMessage} from './translate'
import {apiaiApp} from '../main'
import SessionManager from '../SessionManager'

export const sendMessage = async (message: string, sessionToken: string, databaseUser: IUser) => {
  return new Promise<any>(async (resolve, reject) => {
    await setCurrentLanguageForMessage(message, databaseUser.sessionId || databaseUser.userId)
    const translatedMessage = await translateMessage(message, 'en')
    console.log(`User ${databaseUser.userId.substr(0, 16)} sent message: ${message}`)
    console.log(`Translated message (if so): ${translatedMessage}`)

    const request = apiaiApp.textRequest(translatedMessage, {
      sessionId: sessionToken.substr(0, 16)
    })

    request.on('response', async (response) => {
      try {
        const responseMessage = response.result.fulfillment.speech
        const dataObject = response.result.fulfillment.data
        const userLanguage = databaseUser.sessionId ? SessionManager.Instance.getCurrentLanguageForUser(databaseUser.sessionId || databaseUser.userId) : 'sv'
        const translatedResponseMessage = await translateMessage(responseMessage, userLanguage)

        console.log(`Apiai response: ${response.result.fulfillment.speech}`)
        console.log(`Apiai translated response (if so): ${translatedResponseMessage}`)

        setSessionId(databaseUser.userId, response.sessionId)

        resolve({translatedResponseMessage, dataObject})

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
