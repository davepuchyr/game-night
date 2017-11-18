

const onlineUsers = []


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

  socket.on('userConnect', (newUserId) => {
    console.log('PAYLOAD SERVER SIDE IS ', newUserId)
    let currentUsersOnlineArr = onlineUsers.map(user => {
      return Object.values(user)[0]
    })
    let userIdArr
    if (!currentUsersOnlineArr.includes(newUserId)) {
      onlineUsers.push({[socket.id]: newUserId})
      userIdArr = onlineUsers.map(user => {
        return Object.values(user)[0]
      })
      socket.emit('updateOnlineUsers', userIdArr)
    } else {
      socket.emit('updateOnlineUsers', currentUsersOnlineArr)      
    }
    console.log('ONLINE USERS ARE ', onlineUsers)
  })

    // let room;

    // socket.on('joinRoom', roomName => {
    //   room = roomName
    //   socket.join(room)
    // })

    // socket.emit('joinRoom', window.location.pathname);

    // socket.on('something', ()=> {
    //   socket.broadcast.to(room).emit('somethingElse', payload)
    // })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
