import * as express from 'express'

const bodyParser = require('body-parser')
const request = require('request')

export const initFacebookMessengerWebhook = (app: express.Application) => {

    app.set('port', (process.env.PORT || 5000))
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    // Routes
    app.get('/', (req, res) => {
        res.send('Hi, I am Elva.')

    })

    // Facebook
    app.get('/webhook/', (req, res) =>{
        if(req.query['hub.verify_token'] === process.env.MESSENGER_VERIFY_TOKEN){
            res.send(req.query['hub.challenge'])
        }
        res.send('Wrong token.')
    })

    app.listen(app.get('port'), () => {
        console.log('running: port')
    })
}
