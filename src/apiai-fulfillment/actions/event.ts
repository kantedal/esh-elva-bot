const rp = require('request-promise');

export const findEvent = async (parameters: {[key: string]: any}) => {

    return new Promise((resolve, reject) => {

        let isEvent: number = 1
        if(parameters['passive-or-active'] === 'passive') {
            isEvent = 1
        }
        if(parameters['passive-or-active'] === 'active') {
            isEvent = 0
        }
        const category = parameters['category'] ? parameters['category'] : ''
        console.log('URL')
        console.log('http://visitlinkoping.se/evenemang?q='+parameters['activity']+'&type='+isEvent+'&category='+category+'&date_from='+parameters['date']+'&date_to='+parameters['date']+'&_format=json&render=raw')

        const options = {
            uri: 'http://visitlinkoping.se/evenemang?q='+parameters['activity']+'&type='+isEvent+'&category='+category+'&date_from='+parameters['date']+'&date_to='+parameters['date']+'&_format=json&render=raw',
            headers: {
                'User-Agent': 'Request-Promise'
            }
        }

        rp(options)
          .then((jsonString: string) => {
              let jsonArray;
              console.log(jsonString);
              try {
                  jsonArray = JSON.parse(jsonString)
              } catch(error) {
                  console.log('JSON.parse(data) crashed'+ error)
                  // Remove empty character in json
                  jsonString = jsonString.slice(1)
              }
              jsonArray = JSON.parse(jsonString)
              console.log(jsonArray);
              for(const event of jsonArray) {
                const title = event.title[0].value
                console.log(title)
                const url = 'http://www.google.com/search?q=visitlinkoping.se '+title+'&btnI'
                const imgUrl = event.field_image_current[0]
                console.log(url)
                const searchString = parameters['activity'].toLowerCase()

                console.log(searchString)
                const lowerCaseTitle = title.toLowerCase()
                if(lowerCaseTitle.indexOf(searchString) !== -1 || isEvent) {
                    resolve({
                        speech: 'I found this event that you may find interesting.',
                        displayText: 'I found this event that you may find interesting.',
                        data:{url, eventName: title, imgUrl}
                    })
                    return
                }
              }
              resolve({
                speech: 'Sorry, I couldn\'t find any event for you',
                displayText: 'Sorry, I couldn\'t find any event for you',
                data:''
              })
          })
          .catch((error: string) => {
              return {
                  speech: 'Failed to get data',
                  displayText: 'Failed to get data',
                  data:''
              }
          })
    })
}
