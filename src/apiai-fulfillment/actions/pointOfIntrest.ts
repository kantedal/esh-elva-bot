import request = require('request-promise')
const parseXMLString = require('xml2js').parseString

const poiApiAddress1 = 'http://kartan.linkoping.se/isms/poi?service=wfs&request=getfeature&typename='
const poiApiAddress2 = '&version=1.1.0&'

export const findPointOfInterest = async (type: string) => {
  const res = await request(poiApiAddress1 + type + poiApiAddress2)
  parseXMLString(res, (err, res) => {
    const pointsOfInterest = res['wfs:FeatureCollection']['gml:featureMember']
    console.log(pointsOfInterest)
    for (const poi of pointsOfInterest) {
      console.log(poi)
    }

  })

  console.log('poi response from api')
  console.log(res)
  return res.toString()
}
