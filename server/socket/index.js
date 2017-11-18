

const onlineUsers = []


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    
    let currentUsersOnlineArr = onlineUsers.map(user => {
      return Object.values(user)[0]
    })
    socket.emit('updateOnlineUsers', currentUsersOnlineArr)      

  socket.on('userConnect', (newUserId) => {
    console.log('PAYLOAD SERVER SIDE IS ', newUserId)
    let userIdArr
    if (!currentUsersOnlineArr.includes(newUserId)) {
      onlineUsers.push({[socket.id]: newUserId})
    } 
    userIdArr = onlineUsers.map(user => {
      return Object.values(user)[0]
    })
    console.log('!!!!!!!', userIdArr)
    socket.emit('updateOnlineUsers', userIdArr)
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
        let currentUsersOnlineArr = onlineUsers.map(user => {
        return Object.keys(user)[0]
      })
      console.log('ONLINE USER', onlineUsers)
      console.log('currentUsersOnlineArr',currentUsersOnlineArr)
      console.log(socket.id)
      let toRemove = currentUsersOnlineArr.indexOf(socket.id)
      console.log(toRemove)
      if (toRemove >= 0) {
        onlineUsers.splice(toRemove, 1)
      let currentUsersIdArray = onlineUsers.map(user => {
        return Object.values(user)[0]
      })
        socket.emit('updateOnlineUsers', currentUsersIdArray)
        console.log('EMITTED############')
      } 
    })
  })
}
