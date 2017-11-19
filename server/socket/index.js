

const onlineUsers = {}


module.exports = (io) => {
  io.on('connection', (socket) => {
    let socketId = socket.id
    console.log(`A socket connection to the server has been made: ${socketId}`)

  
  socket.on('userConnect', (newUser) => {

    onlineUsers[socketId] = newUser
    
    const simpleUserArr = Object.values(onlineUsers)
    
    socket.emit('updateOnlineUsers', simpleUserArr)
    socket.broadcast.emit('updateOnlineUsers', simpleUserArr)
  })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)

      delete onlineUsers[socketId]

      const simpleUserArr = Object.values(onlineUsers)

      socket.emit('updateOnlineUsers', simpleUserArr)
      socket.broadcast.emit('updateOnlineUsers', simpleUserArr)
    })
  })
}
