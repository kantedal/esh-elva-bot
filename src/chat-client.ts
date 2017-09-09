import * as SocketIO from 'socket.io'

export const startChatClient = () => {
  console.log('chat client started')
  const server = require('http').createServer()
  const io = SocketIO(server)

  io.on('connection', (client) => {
    console.log('client connected')
    client.on('chatMessage', (message: string) => {
      console.log('message', message)

      setInterval(() => client.emit('chatMessage', 'Det var mig sannerligen en korkad fråga'), 5000)
    })
  })

  server.listen(4000)
}