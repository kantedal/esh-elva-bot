"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
const token = 'EAAVvTioZBgqYBACMJZCAP92BiHRw9NNL0sLqXAFVrkYv4W2Muc1i6VNZC8bo3Li80RUZA07SeXKqLcXLJZAL5qM70ZCcuyi24MIZCRr8stTQXt74ha7TgFP58RoZBXDQxisqMd8NTZAVoZATuwLcoQI6K9zZBNvzPWvF40l7MGkuoYQBwZDZD';
exports.initFacebookMessengerWebhook = (app) => {
    app.get('/', (req, res) => {
        res.send('Hi, I am Elva...  ');
    });
    app.get('/webhook/', (req, res) => {
        if (req.query['hub.verify_token'] === 'detejubaraetthack') {
            res.send(req.query['hub.challenge']);
        }
        res.send('Wrong token.');
    });
    app.post('/webhook/', (req, res) => {
        const messaging_events = req.body.entry[0].messaging;
        for (const event of messaging_events) {
            const sender = event.sender.id;
            if (event.message && event.message.text) {
                const text = event.message.text;
                sendText(sender, 'Hej');
            }
        }
        res.sendStatus(200);
    });
    app.listen(app.get('port'), () => {
        console.log('running: port');
    });
};
const sendText = (sender, text) => {
    const messageData = { text };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData
        }
    });
};
//# sourceMappingURL=facebook-webhook.js.map