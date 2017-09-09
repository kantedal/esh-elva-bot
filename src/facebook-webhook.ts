import * as express from 'express'
import {error} from 'util'
import {sendMessage} from "./chat-logics/api-ai";

const request = require('request')
// const token: string = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
const token = 'EAAVvTioZBgqYBAKjMA5ZBPjTl3zIY1klJzd3aeePmEoaSvIGdp8dDouen0b9mJNQ4lDkdb9eVhKpN1I1omSuzIFeBup3e77KM2IqdWxrfgDobbXlT8VuGJw79dx8aZAKAi3agv6QNUu9MtTnfxk105Don0ycrwaDOfq0ahyegZDZD'

export const initFacebookMessengerWebhook = (app: express.Application) => {

    app.get('/', (req, res) => {
        res.send('Hi, I am Elva...  ')
        console.log('Hi I am Elva')

    })

    // Facebook
    app.get('/messenger-webhook/', (req, res) => {
        if(req.query['hub.verify_token'] === 'detejubaraetthack') {
            res.send(req.query['hub.challenge'])
        }
        res.send('Wrong token.')
    })

    app.post('/messenger-webhook/', async (req, res) => {
        console.log(req)
        console.log(res)
        const messaging_events = req.body.entry[0].messaging

        for(const event of messaging_events){
            const sender = event.sender.id
            if(event.message && event.message.text) {
                const text = event.message.text
                const responseMessage: string = await sendMessage(text, 'session-token', {userId: 'heja blavitt!!'})
                sendText(sender, responseMessage)
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

    })
}
