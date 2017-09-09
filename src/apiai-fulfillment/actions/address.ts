const  NodeGeocoder = require('node-geocoder')
const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  formatter: null
}
const geocoder = NodeGeocoder(options)

export interface IGeoCode {
  formattedAddress: string
  latitude: number
  longitude: number
  streetNumber: string
  streetName: string
  city: string
  country: string
  countryCode: string
  zipcode: string
}

export const geocodeAddress = async (address: string) => {
  const geocode: IGeoCode = await geocoder.geocode(address)
  return geocode[0]
}