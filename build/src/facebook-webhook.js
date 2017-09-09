"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require('body-parser');
const request = require('request');
exports.initFacebookMessengerWebhook = (app) => {
    app.get('/webhook/', (req, res) => {
        if (req.query['hub.verify_token'] === process.env.MESSENGER_VERIFY_TOKEN) {
            res.send(req.query['hub.challenge']);
        }
        res.send('Wrong token.');
    });
    app.listen(app.get('port'), () => {
        console.log('running: port');
    });
};
//# sourceMappingURL=facebook-webhook.js.map