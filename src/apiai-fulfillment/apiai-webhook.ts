import * as express from 'express'
import {findNearestParkingSpot} from './actions/parking'
import {generateResponseJson, IResponseJson} from './generateResponseJson'
import {findPointOfInterest} from './actions/pointOfIntrest'
import {getRandomEventForImmigrants, getSwedishDirections} from './actions/immigrant'
import {getUserFromSessionId, IUser} from '../chat-logics/databaseUser'
import {findPublicTransport} from './actions/public-transport'
import {getWeather} from './actions/weather'
import {translateMessage} from '../chat-logics/translate'
import {setHome, getHome} from './actions/home'
import {takeMeHome} from './actions/takeMeHome'

const enum Actions {
  parking = 'parking',
  address = 'address',
  integration = 'integration',
  immigrantEvent = 'immigrantEvent',
  learnSwedish = 'learnSwedish',
  poiAsTourist = 'poiAsTourist',
  transport = 'transport',
  weather = 'weather',
  setHome = 'setHome',
  getHome = 'getHome',
  takeMeHome = 'takeMeHome',
  test = 'test'
}

export const resolveMessage = async (action: string, parameters: {[parameter: string]: any}, sessionId: string): Promise<any> => {
  let responseJson = {}

  switch (action) {
    case Actions.parking:
      responseJson = generateResponseJson(await findNearestParkingSpot(parameters['address']))
      break
    case Actions.integration:
      break
    case Actions.immigrantEvent:
      responseJson = generateResponseJson(await getRandomEventForImmigrants())
      break
    case Actions.learnSwedish:
      responseJson = generateResponseJson(await getSwedishDirections(parameters['swedishLevel'].toLowerCase()))
      break
    case Actions.poiAsTourist:
      const origParam = parameters['point_of_interest'] || parameters['point_of_interest_any']
      const param = await translateMessage(origParam, 'sv') // Translate the param to swedish for the api
      console.log(`The param is: ${param}`)

      let poiRes = ''
      try {
        poiRes = await findPointOfInterest(param)
      } catch(error) {
        poiRes = `Sorry, couldn't find any results for ${origParam}, try golf instead?`
      }

      responseJson = generateResponseJson(poiRes)
      break
    case Actions.transport:
      let transpRes = ''
      try {
        transpRes = await findPublicTransport(parameters['from-address'], parameters['to-address'])
      } catch(error) {
        transpRes = `Sorry, couldn't generate results for ${parameters['from-address']} and ${parameters['to-address']}.`
      }

      responseJson = generateResponseJson(transpRes)
      break
    case Actions.weather:
      responseJson = generateResponseJson(await getWeather(parameters['date']))
      break
    case Actions.setHome:
      responseJson = generateResponseJson(await setHome(sessionId, parameters['address']))
      break
    case Actions.getHome:
      responseJson = generateResponseJson(await getHome(sessionId))
      break
    case Actions.takeMeHome:
      let takeHomeRes = ''

      try {
        takeHomeRes = await takeMeHome(sessionId, parameters['address'])
      } catch (error) {
        console.log(error)
        takeHomeRes = `Sorry, couldn't compute route from ${parameters['address']}`
      }

      responseJson = generateResponseJson(takeHomeRes)
      break
    case Actions.test:
      responseJson = {
        followupEvent: {
          data: {
            testtest: 'testing testing',
          },
          name: 'fill_slots'
        }
      }
      break
    default:
      responseJson = generateResponseJson('Something went wrong, sorry!')
      break
  }

  return responseJson
}

export const initApiAiWebhook = async (app: express.Application) => {
  // findPointOfInterest()
  app.post('/apiai', async (req: express.Request, res: any) => {
    const { body } = req
    const sessionId = body.sessionId.substr(0, 16)
    const { action, parameters } = body.result

    // const conexts = body.results.contexts
    console.log('session id', body.sessionId)
    console.log('Action: ', action, 'Parameters: ', parameters)

    const user: any = await getUserFromSessionId(body.sessionId)
    console.log('user', user)

    const response: IResponseJson = await resolveMessage(action, parameters, sessionId)

    res.send(JSON.stringify(response))
  })
}
