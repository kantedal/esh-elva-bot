"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseUser_1 = require("./databaseUser");
const apiai = require('apiai');
const app = apiai('414d7edb81324f84ab648cbbe1701c0f');
let databaseUser;
exports.establishChat = (userId, sessionId) => {
    databaseUser = new databaseUser_1.DatabaseUser(userId, sessionId);
};
//# sourceMappingURL=establishChat.js.map