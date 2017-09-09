"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require('body-parser');
const request = require('request');
exports.initFacebookMessengerWebhook = (app) => {
    app.listen(app.get('port'), () => {
        console.log('running: port');
    });
};
//# sourceMappingURL=facebook-webhook.js.map