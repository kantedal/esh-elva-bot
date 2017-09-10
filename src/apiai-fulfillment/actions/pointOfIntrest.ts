import request = require('request-promise')
const parseXMLString = require('xml2js').parseString

export interface IPoi {
  name: string
  address?: string
  phone?: string
  link?: string
}

const poiApiAddress1 = 'http://kartan.linkoping.se/isms/poi?service=wfs&request=getfeature&typename='
const poiApiAddress2 = '&version=1.1.0&'

export const findPointOfInterest = async (type: string) => {
  const res1 = await request(poiApiAddress1 + type + poiApiAddress2)

  try {
    return new Promise<string>((resolve, reject) => {
      parseXMLString(res1, async (err, res2) => {
        if (err) {
          console.log(err)
          err.toString()
        }

        let pointsOfInterest = res2['wfs:FeatureCollection']
        if (!pointsOfInterest) {
          reject(`Could not find results for ${type}`)
        }

        pointsOfInterest = pointsOfInterest['gml:featureMember']

        const data: IPoi[] = []

        for (const poi of pointsOfInterest) {
          const poiObject = poi[`ms:${type}`][0]
          const name = poiObject['ms:NAMN'][0]
          const address = poiObject['ms:ADRESS'][0]
          const phone = poiObject['ms:TELEFONNUMMER'][0]
          const link = poiObject['ms:LINK'][0]

          // console.log(name)
          // console.log(address)
          // console.log(phone)
          // console.log(link)

          if (name && address) {
            data.push({name, address, phone, link})
          }
        }

        let returnString: string = `Try the following:\n`
        for (const d of data) {

          // Base case for facebook
          if (returnString.length > 320) {
            break
          }

          returnString += `\n${d.name} at ${d.address} \n`

          if (d.phone) {
            returnString += `Phone: ${d.phone}\n`
          }

          if (d.link) {
            returnString += `Link: ${d.link}\n`
          }

          returnString += `\n`
        }

        // Some max length for facebook
        resolve(returnString.substring(0, 360))
      })
        .then((response) => response)
        .catch((reason) => {
          console.error(reason)
          return reason.toString() || ''
        })
    })
  } catch(error) {
    console.log('error in POINT OF INTEREST')
    console.error(error)
    return 'Sorry, could not find any results. Try something else?'
  }
}
