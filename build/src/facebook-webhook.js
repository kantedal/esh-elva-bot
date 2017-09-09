"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
exports.initFacebookMessengerWebhook = (app) => {
    app.post('/webhook/', (req, res) => {
        const messaging_events = req.body.entry[0].messaging;
        for (const event of messaging_events) {
            const sender = event.sender.id;
            if (event.message && event.message.text) {
                const text = event.message.text;
                sendText(sender, 'Text echo: ' + text.substring(0, 100));
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