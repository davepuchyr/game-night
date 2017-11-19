
const onlineUsers = {}


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

      socket.emit('updateOnlineUsers', userIdArr)
      socket.broadcast.emit('updateOnlineUsers', userIdArr)
    })
    /*
    * NEW MESSAGES
    */
    socket.on('new_message', (message) => {
      socket.broadcast.emit('received_new_message', message)
    })
    /*
    * LOGOUT
    */
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)

      delete onlineUsers[socketId]

      const simpleUserArr = Object.values(onlineUsers)

      socket.emit('updateOnlineUsers', simpleUserArr)
      socket.broadcast.emit('updateOnlineUsers', simpleUserArr)
    })
  })
}
