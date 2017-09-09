import * as express from 'express'
import * as request from 'request'
import {startChatClient} from './chat-client'

const app = express()
startChatClient()

app.set('port', (process.env.PORT || 5000));

app.get('/', (req: any, res: any) => {
  res.send('Hello Worlden')
})

app.get('/webhook', (req: any, res: any) => {
  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === 'elva_app_token') {
    console.log('Validating webhook');
    res.status(200).send(req.query['hub.challenge']);
  }
  else {
    console.error('Failed validation. Make sure the validation tokens match.')
    res.sendStatus(403)
  }
})

app.post('/webhook', (req: any, res: any) => {
  const data = req.body

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach((entry) => {
      const pageID = entry.id
      const timeOfEvent = entry.time

      // Iterate over each messaging event
      entry.messaging.forEach((event) => {
        if (event.message) {
          receivedMessage(event);
        }
        else {
          console.log('Webhook received unknown event: ', event);
        }
      })
    })

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
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

  const messageText = message.text
  const messageAttachments = message.attachments

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        sendGenericMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, 'Message with attachment received');
  }
}

const sendGenericMessage = (recipientId: any, messageText?: any) => {
  // To be expanded in later sections
}

const sendTextMessage = (recipientId: any, messageText: any) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  }

  callSendAPI(messageData);
}

const callSendAPI = (messageData: any) => {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAARCKrpnZAlABAFkZAfTKSgVt9D3gH1KJhVzROLP7hi7rpPNH78imHdQuxbcV4ZBFyQl7jxi2HZAMAb8zjoqtWvWhEc4K7O016kyAkn08vZAPOj172jHhvE5zyGR8alt6BTEEa0K3FsNRgCE25oj0KtZBACtmTL48hwNraBtt06QZDZD' },
    method: 'POST',
    json: messageData

  },
  (error: any, response: any, body: any) => {
    if (!error && response.statusCode === 200) {
      const recipientId = body.recipient_id
      const messageId = body.message_id

      console.log('Successfully sent generic message with id %s to recipient %s"', messageId, recipientId);
    }
    else {
      console.error('Unable to send message.');
      console.error(response);
      console.error(error);
    }
  });
}

app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')))
