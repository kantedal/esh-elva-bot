"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const SocketIO = require("socket.io");
const databaseUser_1 = require("./chat-logics/databaseUser");
const api_ai_1 = require("./chat-logics/api-ai");
exports.startChatClient = () => {
    const server = require('http').createServer();
    const io = SocketIO(server);
    io.on('connection', (client) => {
        let sessionToken;
        let databaseUser;
        client.on('connectUser', (data) => {
            sessionToken = data.sessionToken;
            databaseUser_1.getDatabaseUser(data.userId, sessionToken).then((user) => {
                databaseUser = user;
                client.emit('userConnected');
            });
        });
        client.on('chatMessage', (message) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            setTimeout(() => client.emit('chatMessageLoading'), 500);
            setTimeout(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const responseMessage = yield api_ai_1.sendMessage(message, sessionToken, databaseUser);
                console.log('heja');
                client.emit('chatMessage', responseMessage);
            }), 1000);
        }));
    });
    server.listen(4000);
};
//# sourceMappingURL=chat-client.js.map