import * as express from 'express'
import {error} from 'util'

const request = require('request')
const token: string = process.env.FACEBOOK_PAGE_ACCESS_TOKEN

export const initFacebookMessengerWebhook = (app: express.Application) => {

    app.post('/webhook/', (req, res) => {
        const messaging_events = req.body.entry[0].messaging
        for(const event of messaging_events){
            const sender = event.sender.id
            if(event.message && event.message.text) {
                const text = event.message.text
                sendText(sender, 'Text echo: ' + text.substring(0,100))
            }
        }

        res.sendStatus(200)
    })

    app.listen(app.get('port'), () => {
        console.log('running: port')
    })
}

const sendText = (sender, text) => {
    const messageData = {text}
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
        }

        /*(error, response, body) => {
        if(error){
            console.log('sending error')
        }else if(response.body.error){
            console.log('response body error')
        }*/

    })
}
