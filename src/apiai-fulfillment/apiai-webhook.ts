import * as express from 'express'
import {findNearestParkingSpot} from './actions/parking'
import {generateResponseJson, IResponseJson} from './generateResponseJson'
import {findPointOfInterest} from './actions/pointOfIntrest'
import {getRandomEventForImmigrants, getSwedishDirections} from './actions/immigrant'
import {getUserFromSessionId, IUser} from '../chat-logics/databaseUser'
import {findPublicTransport} from './actions/public-transport'
import {getWeather} from './actions/weather'

const enum Actions {
  parking = 'parking',
  address = 'address',
  integration = 'integration',
  immigrantEvent = 'immigrantEvent',
  learnSwedish = 'learnSwedish',
  poiAsTourist = 'poiAsTourist',
  transport = 'transport',
  weather = 'weather',
  test = 'test'
}

export const resolveMessage = async (action: string, parameters: {[parameter: string]: any}): Promise<any> => {
  let responseMessage = ''

  switch (action) {
    case Actions.parking:
      responseMessage = await findNearestParkingSpot(parameters['address'])
      break
    case Actions.integration:
      break
    case Actions.immigrantEvent:
      responseMessage = await getRandomEventForImmigrants()
      break
    case Actions.learnSwedish:
      responseMessage = await getSwedishDirections(parameters['swedishLevel'].toLowerCase())
      break
    case Actions.poiAsTourist:
      const param = parameters['point_of_interest'] || parameters['point_of_interest_any']
      console.log(`The param is: ${param}`)
      responseMessage = await findPointOfInterest(param) // ?
      break
    case Actions.transport:
      console.log('transport action', parameters['from-address'], parameters['to-address'])
      responseMessage = await findPublicTransport(parameters['from-address'], parameters['to-address'])
      break
    case Actions.weather:
      responseMessage = await getWeather()
      break
    case Actions.test:
      console.log('test action')
      return {
        followupEvent: {
          data: {
            testtest: 'testing testing',
          },
          name: 'fill_slots'
        }
      }
    default:
      responseMessage = 'Something went wrong, sorry!'
      break
  }

  return generateResponseJson(responseMessage)
}

export const initApiAiWebhook = async (app: express.Application) => {
  // findPointOfInterest()
  app.post('/apiai', async (req: express.Request, res: any) => {
    const body = req.body

    console.log(body)
    const action = body.result.action
    const parameters = body.result.parameters

    // const conexts = body.results.contexts
    console.log('session id', body.sessionId)
    console.log('Action: ', action, 'Parameters: ', parameters)

    const user: any = await getUserFromSessionId(body.sessionId)
    console.log('user', user)

    const response: IResponseJson = await resolveMessage(action, parameters)

    res.send(JSON.stringify(response))
  })
}
