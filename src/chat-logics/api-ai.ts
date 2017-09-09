import {IUser, setSessionId} from './databaseUser'
import {translateMessage, setCurrentLanguageForMessage} from './translate'
import {apiaiApp} from '../main'
import SessionManager from '../SessionManager'

export const sendMessage = async (message: string, sessionToken: string, databaseUser: IUser) => {
  return new Promise<string>(async (resolve, reject) => {
    await setCurrentLanguageForMessage(message, databaseUser.sessionId || databaseUser.userId)
    const translatedMessage = await translateMessage(message, 'en')
    console.log('send message from database user', databaseUser.userId)

    const request = apiaiApp.textRequest(translatedMessage, {
      sessionId: sessionToken.substring(1, 36)
    })

    request.on('response', async (response) => {
      const responseMessage = response.result.fulfillment.speech
      const translatedResponseMessage = await translateMessage(responseMessage, 'sv')

      console.log('message successfully sent')
      console.log(response)
      setSessionId(databaseUser.userId, response.sessionId)

      request.on('response', async (response) => {
        const responseMessage = response.result.fulfillment.speech
        const userLanguage = databaseUser.sessionId ? SessionManager.Instance.getCurrentLanguageForUser(databaseUser.sessionId || databaseUser.userId) : 'sv'
        const translatedResponseMessage = await translateMessage(responseMessage, userLanguage)

        console.log('message successfully sent')
        console.log(response)
        setSessionId(databaseUser.userId, response.sessionId)

        resolve(translatedResponseMessage)
      })

      request.on('error', (error) => {
        reject()
      })

      request.end()
    })

    request.on('error', (error) => {
      reject()
    })

    request.end()
  })
}
