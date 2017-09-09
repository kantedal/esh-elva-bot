import * as express from 'express'
import {findNearestParkingSpot} from './actions/parking'
import {generateResponseJson, IResponseJson} from './generateResponseJson'
import {findPointOfIntrest} from './actions/pointOfIntrest'

const enum Actions {
  parking = 'parking',
  address = 'address',
  integration = 'integration'
}

export const resolveMessage = async (action: string, parameters: {[parameter: string]: any}): Promise<IResponseJson> => {
  let responseMessage = ''
  console.log('NEW EVENT')
  console.log(action)

  switch (action) {
    case Actions.parking:
      responseMessage = await findNearestParkingSpot(parameters['address'])
      break
    case Actions.integration:
      break
    default:
      responseMessage = 'Something went wrong, sorry!'
      break
  }

  return generateResponseJson(responseMessage)
}


export const initApiAiWebhook = async (app: express.Application) => {
  // findPointOfIntrest()
  app.post('/apiai', async (req: express.Request, res: any) => {
    const body = req.body

    const action = body.result.action
    const parameters = body.result.parameters
    // const conexts = body.results.contexts
    console.log(body)

    console.log('Action: ', action, 'Parameters: ', parameters)

    const response: IResponseJson = await resolveMessage(action, parameters)

    res.send(JSON.stringify(response))
  })
}