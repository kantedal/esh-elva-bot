"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const databaseUser_1 = require("./databaseUser");
const translate_1 = require("./translate");
const main_1 = require("../main");
const SessionManager_1 = require("../SessionManager");
exports.sendMessage = (message, sessionToken, databaseUser) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield translate_1.setCurrentLanguageForMessage(message, databaseUser.sessionId || databaseUser.userId);
        const translatedMessage = yield translate_1.translateMessage(message, 'en');
        console.log('send message from database user', databaseUser.userId);
        const request = main_1.apiaiApp.textRequest(translatedMessage, {
            sessionId: sessionToken.substring(1, 36)
        });
        request.on('response', (response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const responseMessage = response.result.fulfillment.speech;
                const userLanguage = databaseUser.sessionId ? SessionManager_1.default.Instance.getCurrentLanguageForUser(databaseUser.sessionId || databaseUser.userId) : 'sv';
                const translatedResponseMessage = yield translate_1.translateMessage(responseMessage, userLanguage);
                console.log(response);
                databaseUser_1.setSessionId(databaseUser.userId, response.sessionId);
                resolve(translatedResponseMessage);
            }
            catch (error) {
                console.log('error', error);
            }
        }));
        request.on('error', (error) => {
            reject();
        });
        request.end();
    }));
});
//# sourceMappingURL=api-ai.js.map