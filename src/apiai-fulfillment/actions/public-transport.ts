const request = require('request-promise')
import {geocodeAddress, IGeoCode} from './address'

export const findPublicTransport = async (from: string, to: string) => {
  try {
    const geoPoints: IGeoCode[] = await Promise.all([geocodeAddress(from), geocodeAddress(to)])

    const apiCallUrl = `https://api.resrobot.se/v2/trip.json?key=${process.env.OGT_API_KEY}&originCoordLat=${geoPoints[0].latitude}&originCoordLong=${geoPoints[0].longitude}&destCoordLat=${geoPoints[1].latitude}&destCoordLong=${geoPoints[1].longitude}`

    const res = JSON.parse(await request(apiCallUrl))
    const legList = res.Trip[0].LegList.Leg

    let responseMessage = 'Your best alternative is to '

    if (legList.length > 1) {
      responseMessage += 'first '
    }

    let count = 0
    for (const leg of legList) {
      if (count !== 0) responseMessage += 'Then '
      switch (leg.type) {
        case 'WALK':
          responseMessage += `walk 🚶 to ${leg.Destination.name}, this will take approximately ${leg.duration[2]} minutes ⌚. `
          break
        case 'JNY':
          responseMessage += `take bus 🚌 ${leg.Product.name} which leaves at ${leg.Origin.time} and arrives at ${leg.Destination.time}. `
          break
        default:
          break
      }

      count++
    }

    console.log(responseMessage)
    return responseMessage.substr(0,360)
  } catch (err) {
    console.log('error', err)
    return 'Could not parse addresses.'
  }
}