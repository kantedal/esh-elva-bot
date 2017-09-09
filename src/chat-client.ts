import * as SocketIO from 'socket.io'
import {getDatabaseUser, IUser} from './chat-logics/databaseUser'
import {sendMessage} from './chat-logics/api-ai'

export const startChatClient = () => {
  const server = require('http').createServer()
  const io = SocketIO(server)

  io.on('connection', (client) => {
    let sessionToken: string
    let databaseUser: IUser

    client.on('connectUser', (data: { userId: string, sessionToken: string}) => {
      sessionToken = data.sessionToken
      getDatabaseUser(data.userId).then((user: IUser) => {
        databaseUser = user
        client.emit('userConnected')
      })
    })

    client.on('chatMessage', async (message: string) => {
      setTimeout(() => client.emit('chatMessageLoading'), 500)
      setTimeout(async () => {
        const responseMessage: string = await sendMessage(message, sessionToken, databaseUser)
        client.emit('chatMessage', responseMessage)
      }, 1000)
    })
  })

  server.listen(4000)
}
