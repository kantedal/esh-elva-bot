import * as express from 'express'

const bodyParser = require('body-parser')
const request = require('request')

export const initFacebookMessengerWebhook = (app: express.Application) => {



    app.listen(app.get('port'), () => {
        console.log('running: port')
    })
}
