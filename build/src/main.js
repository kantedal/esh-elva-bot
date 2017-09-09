"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const request = require("request");
const chat_client_1 = require("./chat-client");
const app = express();
chat_client_1.startChatClient();
app.set('port', (process.env.PORT || 5000));
app.get('/', (req, res) => {
    res.send('Hello Worlden');
});
app.get('/webhook', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === 'elva_app_token') {
        console.log('Validating webhook');
        res.status(200).send(req.query['hub.challenge']);
    }
    else {
        console.error('Failed validation. Make sure the validation tokens match.');
        res.sendStatus(403);
    }
});
app.post('/webhook', (req, res) => {
    const data = req.body;
    if (data.object === 'page') {
        data.entry.forEach((entry) => {
            const pageID = entry.id;
            const timeOfEvent = entry.time;
            entry.messaging.forEach((event) => {
                if (event.message) {
                    receivedMessage(event);
                }
                else {
                    console.log('Webhook received unknown event: ', event);
                }
            });
        });
        res.sendStatus(200);
    }
});
const receivedMessage = (event) => {
    const senderID = event.sender.id;
    const recipientID = event.recipient.id;
    const timeOfMessage = event.timestamp;
    const message = event.message;
    console.log('Received message for user %d and page %d at %d with message:', senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));
    const messageId = message.mid;
    const messageText = message.text;
    const messageAttachments = message.attachments;
    if (messageText) {
        switch (messageText) {
            case 'generic':
                sendGenericMessage(senderID);
                break;
            default:
                sendTextMessage(senderID, messageText);
        }
    }
    else if (messageAttachments) {
        sendTextMessage(senderID, 'Message with attachment received');
    }
};
const sendGenericMessage = (recipientId, messageText) => {
};
const sendTextMessage = (recipientId, messageText) => {
    const messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };
    callSendAPI(messageData);
};
const callSendAPI = (messageData) => {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: 'EAARCKrpnZAlABAFkZAfTKSgVt9D3gH1KJhVzROLP7hi7rpPNH78imHdQuxbcV4ZBFyQl7jxi2HZAMAb8zjoqtWvWhEc4K7O016kyAkn08vZAPOj172jHhvE5zyGR8alt6BTEEa0K3FsNRgCE25oj0KtZBACtmTL48hwNraBtt06QZDZD' },
        method: 'POST',
        json: messageData
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const recipientId = body.recipient_id;
            const messageId = body.message_id;
            console.log('Successfully sent generic message with id %s to recipient %s"', messageId, recipientId);
        }
        else {
            console.error('Unable to send message.');
            console.error(response);
            console.error(error);
        }
    });
};
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));
//# sourceMappingURL=main.js.map