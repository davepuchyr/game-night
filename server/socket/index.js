
const onlineUsers = {}

const draws = []


module.exports = (io) => {
  io.on('connection', (socket) => {
    let socketId = socket.id
    console.log(`A socket connection to the server has been made: ${socketId}`)
    /*
    * NEW USERS
    */
    socket.on('userConnect', (newUserId) => {

      onlineUsers[socketId] = newUserId

      const userIdArr = Object.values(onlineUsers)
      console.log('added User, users online are ', onlineUsers)

      io.sockets.emit('updateOnlineUsers', userIdArr)
      // socket.broadcast.emit('updateOnlineUsers', userIdArr)
    })
    /*
    * NEW MESSAGES
    */
    socket.on('new_message', (message) => {
      socket.broadcast.emit('received_new_message', message)
    })
    /*
    * DRAWS
    */
    socket.on('draw', (start, end) => {
      draws.push({start, end})
      socket.broadcast.emit('addDraw', draws)
      // socket.emit('addDraw', draws)
    })

    /*
    * LOGOUT
    */
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)

      delete onlineUsers[socketId]

      const simpleUserArr = Object.values(onlineUsers)

      io.sockets.emit('updateOnlineUsers', simpleUserArr)
      // socket.broadcast.emit('updateOnlineUsers', simpleUserArr)
    })
  })
}
