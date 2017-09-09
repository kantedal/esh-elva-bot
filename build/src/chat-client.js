"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketIO = require("socket.io");
exports.startChatClient = () => {
    console.log('chat client started');
    const server = require('http').createServer();
    const io = SocketIO(server);
    io.on('connection', (client) => {
        console.log('client connected');
        client.on('chatMessage', (message) => {
            console.log('message', message);
            setInterval(() => client.emit('chatMessage', 'Det var mig sannerligen en korkad fråga'), 5000);
        });
    });
    server.listen(4000);
};
//# sourceMappingURL=chat-client.js.map