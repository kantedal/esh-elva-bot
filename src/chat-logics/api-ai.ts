import {IUser, setSessionId} from './databaseUser'
import {translateMessage} from './translate'
import {apiaiApp} from '../main'
const translate = require('google-translate-api')

export const sendMessage = async (message: string, sessionToken: string, databaseUser: IUser) => {
  return new Promise<string>(async (resolve, reject) => {
    const translatedMessage = await translateMessage(message, 'en')
    console.log('send message from database user', databaseUser.userId)

    const userEntities = [{
      name: 'userFirstName',
      extend: false,
      entries: [
        {
          value: 'Filip',
          synonyms: ['Filip']
        }
      ]
    }]

    const userEntitiesRequest = apiaiApp.userEntitiesRequest({
      sessionId: sessionToken,
      entities: userEntities,
    })

    userEntitiesRequest.on('response', (userEntitiesResponse) => {
      console.log('User entities response: ')
      console.log(JSON.stringify(userEntitiesResponse, null, 4))

      const request = apiaiApp.textRequest(translatedMessage, {
        sessionId: sessionToken.substring(1, 36),
        entities: userEntities
      })

      request.on('response', async (response) => {
        const responseMessage = response.result.fulfillment.speech
        const translatedResponseMessage = await translateMessage(responseMessage, 'sv')

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

    userEntitiesRequest.on('error', (error) => {
      console.log('error: ' + JSON.stringify(error, null, ''))
    })

    userEntitiesRequest.end()

  })
}
