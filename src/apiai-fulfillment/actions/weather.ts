import {geocodeAddress} from './address'
import request = require('request-promise')

const Distance = require('geo-distance')

export const getWeather = async (address?: string) => {
  try {
    let weatherCoordinate = null
    let weatherApiAddress = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/15.513/lat/58.417/data.json'

    if(address !== undefined) {
      const userGeoCode = await geocodeAddress(address)
      weatherCoordinate = { lon: userGeoCode.longitude, lat: userGeoCode.latitude }
      weatherApiAddress = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'
        + weatherCoordinate.lon +'/lat/'+ weatherCoordinate.lat +'/data.json'
    }

    try {
      const weatherData = JSON.parse(await request(weatherApiAddress))
      const weatherParameters = weatherData.timeSeries[0].parameters
      let temp
      let sky = -1
      let rain = -1
      let snow = -1
      let wind  = -1
      let thunder = -1
      let weatherMessage = ''

      for(const parameter of weatherParameters){
        if (parameter.name === 't') { // Temperature
          temp = parameter.values[0]
          weatherMessage += 'Currently it is' + temp + '°C degrees.'
        }
      }

      for(const parameter of weatherParameters){
        if (parameter.name === 'tcc_mean') { // Cloudy
          sky = parameter.values[0]
          if (sky < 3) {weatherMessage += '☀ '}
          else if (sky < 6) {weatherMessage += '⛅ '}
          else {weatherMessage += '☁ '}
        } else if (parameter.name === 'pmean') { // Rain
          rain = parameter.values[0]
          if (rain > 0) {weatherMessage += '☔ '}
        } else if (parameter.name === 'ws') { // Wind
          wind = parameter.values[0]
          if (wind > 5) {weatherMessage += '💨 '}
        } else if (parameter.name === 'tstm') {  // Thunder
          thunder = parameter.values[0]
          if (thunder > 50) {weatherMessage += '⚡ '}
        }
      }

      if (temp < 0 && rain > 0) {
        snow = rain
        rain = 0
        if (snow > 0) {weatherMessage += '❄⛄'}
      }

      return weatherMessage
    } catch (error) {
      return 'Could not find weather on this location.'
    }

  } catch (err) {
    return 'Could not find your current location.'
  }
}