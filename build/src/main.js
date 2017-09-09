"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const facebook_webhook_1 = require("./facebook-webhook");
require('dotenv').config();
const chat_client_1 = require("./chat-client");
const start_express_app_1 = require("./start-express-app");
const apiai_webhook_1 = require("./apiai-fulfillment/apiai-webhook");
const public_transport_1 = require("./apiai-fulfillment/actions/public-transport");
const startServer = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    public_transport_1.findPublicTransport('Stora torget linköping', 'Ryds alle 19');
    const App = yield start_express_app_1.startExpressApp();
    apiai_webhook_1.initApiAiWebhook(App);
    chat_client_1.startChatClient();
    facebook_webhook_1.initFacebookMessengerWebhook(App);
});
startServer();
//# sourceMappingURL=main.js.map