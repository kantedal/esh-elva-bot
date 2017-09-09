import request = require('request-promise')
const parseXMLString = require('xml2js').parseString

const poiApiAddress1 = 'http://kartan.linkoping.se/isms/poi?service=wfs&request=getfeature&typename='
const poiApiAddress2 = '&version=1.1.0&'

export const findPointOfIntrest = async () => {
  const type = 'bangolf'
  const res = await request(poiApiAddress1 + type + poiApiAddress2)
  parseXMLString(res, (err, res) => {
    const pointsOfIntrest = res['wfs:FeatureCollection']['gml:featureMember']
    console.log(pointsOfIntrest)
    for (const poi of pointsOfIntrest) {
      console.log(poi)
    }
  })
}
