"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_ai_1 = require("./chat-logics/api-ai");
const weather_1 = require("./apiai-fulfillment/actions/weather");
const databaseUser_1 = require("./chat-logics/databaseUser");
const request = require('request');
const access_token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
const verify_token = process.env.MESSENGER_VERIFY_TOKEN;
exports.initFacebookMessengerWebhook = (app) => {
    app.get('/', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (weather_1.isRain()) {
            res.send('rain');
        }
        else {
            res.send('no rain');
        }
    }));
    // Facebook
    app.get('/messenger-webhook/', (req, res) => {
        if (req.query['hub.verify_token'] === verify_token) {
            res.send(req.query['hub.challenge']);
        }
        res.send('Wrong token.');
    });
    app.post('/messenger-webhook/', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(req.body.entry[0].messaging[0].sender);
        const messaging_events = req.body.entry[0].messaging;
        for (const event of messaging_events) {
            const senderId = event.sender.id;
            databaseUser_1.getDatabaseUser(senderId, senderId).then((user) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (event.message && event.message.text) {
                    const text = event.message.text;
                    const responseMessage = yield api_ai_1.sendMessage(text, user.sessionId, user);
                    sendText(senderId, responseMessage);
                }
            }));
        }
        res.sendStatus(200);
    }));
};
const sendText = (sender, text) => {
    const messageData = { text };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData
        }
    });
};
//# sourceMappingURL=facebook-webhook.js.map