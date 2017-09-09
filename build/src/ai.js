"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiai = require('apiai');
const app = apiai('414d7edb81324f84ab648cbbe1701c0f');
exports.aiTextRequest = (databaseUser, message) => {
    console.log('text request', message, databaseUser.userId);
    const request = app.textRequest(message, {
        sessionId: databaseUser.userId
    });
    request.on('response', (response) => {
        console.log('response', response.result.fulfillment.messages[0].speech);
    });
    request.on('error', (error) => {
        console.log(error);
    });
    request.end();
};
//# sourceMappingURL=ai.js.map