"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const translate_1 = require("./translate");
const apiai = require('apiai');
const translate = require('google-translate-api');
const app = apiai(process.env.APIAI_API_KEY);
exports.sendMessage = (message, sessionToken, databaseUser) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const translatedMessage = yield translate_1.translateMessage(message, 'en');
    return new Promise((resolve, reject) => {
        console.log(translatedMessage);
        const request = app.textRequest(translatedMessage, {
            sessionId: sessionToken.substring(100, 136)
        });
        request.on('response', (response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const responseMessage = response.result.fulfillment.speech;
            const translatedResponseMessage = yield translate_1.translateMessage(responseMessage, 'sv');
            console.log(translatedResponseMessage);
            resolve(translatedResponseMessage);
        }));
        request.on('error', (error) => {
            reject();
        });
        request.end();
    });
});
//# sourceMappingURL=api-ai.js.map