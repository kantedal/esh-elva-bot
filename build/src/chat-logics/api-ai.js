"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const databaseUser_1 = require("./databaseUser");
const translate_1 = require("./translate");
const apiai = require('apiai');
const translate = require('google-translate-api');
const app = apiai(process.env.APIAI_API_KEY);
exports.sendMessage = (message, sessionToken, databaseUser) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const translatedMessage = yield translate_1.translateMessage(message, 'en');
        console.log('send message from database user', databaseUser.userId);
        const userEntities = [{
                name: 'userFirstName',
                extend: false,
                entries: [
                    {
                        value: 'Filip',
                        synonyms: ['Filip']
                    }
                ]
            }];
        const userEntitiesRequest = app.userEntitiesRequest({
            sessionId: sessionToken,
            entities: userEntities,
        });
        userEntitiesRequest.on('response', (userEntitiesResponse) => {
            console.log('User entities response: ');
            console.log(JSON.stringify(userEntitiesResponse, null, 4));
            const request = app.textRequest(translatedMessage, {
                sessionId: sessionToken.substring(100, 136),
                entities: userEntities
            });
            request.on('response', (response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const responseMessage = response.result.fulfillment.speech;
                const translatedResponseMessage = yield translate_1.translateMessage(responseMessage, 'sv');
                console.log('message successfully sent');
                console.log(response);
                databaseUser_1.setSessionId(databaseUser.userId, response.sessionId);
                resolve(translatedResponseMessage);
            }));
            request.on('error', (error) => {
                reject();
            });
            request.end();
        });
        userEntitiesRequest.on('error', (error) => {
            console.log('error: ' + JSON.stringify(error, null, ''));
        });
        userEntitiesRequest.end();
    }));
});
//# sourceMappingURL=api-ai.js.map