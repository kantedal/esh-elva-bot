"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apiai = require('apiai');
require('dotenv').config();
const chat_client_1 = require("./chat-client");
const start_express_app_1 = require("./start-express-app");
const apiai_webhook_1 = require("./apiai-fulfillment/apiai-webhook");
const facebook_webhook_1 = require("./facebook-webhook");
const startServer = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    exports.apiaiApp = apiai(process.env.APIAI_API_KEY);
    // findPublicTransport('Stora torget linköping', 'Ryds alle 19')
    const App = yield start_express_app_1.startExpressApp();
    apiai_webhook_1.initApiAiWebhook(App);
    chat_client_1.startChatClient();
    facebook_webhook_1.initFacebookMessengerWebhook(App);
    setTimeout(() => facebook_webhook_1.initFacebookMessengerWebhook(App), 2000);
    //const user: IUser = {
    //  userId: '12321'
    //}
    //console.log(await translateMessage('hello my name is jonathan', 'en'))
});
startServer();
//# sourceMappingURL=main.js.map