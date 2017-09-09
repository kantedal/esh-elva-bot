"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_ai_1 = require("./chat-logics/api-ai");
const request = require('request');
const token = 'EAAVvTioZBgqYBAKjMA5ZBPjTl3zIY1klJzd3aeePmEoaSvIGdp8dDouen0b9mJNQ4lDkdb9eVhKpN1I1omSuzIFeBup3e77KM2IqdWxrfgDobbXlT8VuGJw79dx8aZAKAi3agv6QNUu9MtTnfxk105Don0ycrwaDOfq0ahyegZDZD';
exports.initFacebookMessengerWebhook = (app) => {
    app.get('/', (req, res) => {
        res.send('Hi, I am Elva...  ');
        console.log('Hi I am Elva');
    });
    app.get('/messenger-webhook/', (req, res) => {
        if (req.query['hub.verify_token'] === 'detejubaraetthack') {
            res.send(req.query['hub.challenge']);
        }
        res.send('Wrong token.');
    });
    app.post('/messenger-webhook/', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(req);
        console.log(res);
        const messaging_events = req.body.entry[0].messaging;
        for (const event of messaging_events) {
            const sender = event.sender.id;
            if (event.message && event.message.text) {
                const text = event.message.text;
                const responseMessage = yield api_ai_1.sendMessage(text, 'session-token', { userId: 'heja blavitt!!' });
                sendText(sender, responseMessage);
            }
        }
        res.sendStatus(200);
    }));
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