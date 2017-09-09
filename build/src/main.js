"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require('dotenv').config();
const chat_client_1 = require("./chat-client");
const start_express_app_1 = require("./start-express-app");
const apiai_webhook_1 = require("./apiai-fulfillment/apiai-webhook");
const startServer = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const App = yield start_express_app_1.startExpressApp();
    apiai_webhook_1.initApiAiWebhook(App);
    chat_client_1.startChatClient();
});
startServer();
//# sourceMappingURL=main.js.map