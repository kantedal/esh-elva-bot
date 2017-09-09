import request = require('request-promise')
const Distance = require('geo-distance')
import * as moment from 'moment'
import {geocodeAddress} from './address'

const parkingApiKey: string = process.env.PARKING_API_KEY
const parkingApiAddress = 'http://parkering.linkoping.se/Parkeringsdata/ParkeringsdataV1.svc/GetParkeringsytaList/'

export interface IParking {
  Id: string
  Name: string
  Latitude: number
  Longitude: number
  ParkingSpaces: number
  TicketMachines: number
  PaymentTypes: number[]
  ChargeDescription: string
  ParkingTypes: number[]
  ParkingAreaTypes: number[]
  visible: boolean
}

export const findNearestParkingSpot = async (address: string) => {
  try {
    const userGeoCode = await geocodeAddress(address)
    const userCoordinate = { lon: userGeoCode.longitude, lat: userGeoCode.latitude }

    try {
      const parkingSpots: IParking[] = JSON.parse(await request(parkingApiAddress + parkingApiKey + '/0')).ParkingAreaNewList

      let nearestParkingSpot: IParking = parkingSpots[0]
      let shortestDistance = Distance('100000 km')
      for (const parkingSpot of parkingSpots) {
        const parkingSpotCoordinate = { lon: parkingSpot.Longitude, lat: parkingSpot.Latitude }
        const distanceToParkingSpot = Distance.between(userCoordinate, parkingSpotCoordinate)

        if (distanceToParkingSpot < Distance(shortestDistance)) {
          nearestParkingSpot = parkingSpot
          shortestDistance = distanceToParkingSpot
        }
      }
      const distanceFromUser = shortestDistance.human_readable().distance + shortestDistance.human_readable().unit
      return `The nearest parking spot is ${nearestParkingSpot.Name} which is ${distanceFromUser} from your current location.`

    } catch (error) {
      return 'Could not find parking spots at the moment.'
    }

  } catch (err) {
    return 'Could not find your current location.'
  }
}