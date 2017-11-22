
const onlineUsers = {}
const token_positions = {}
// const draws = []


module.exports = (io) => {
  io.on('connection', (socket) => {
    let socketId = socket.id
    /*
    * NEW USERS
    */
    socket.on('userConnect', (newUserId) => {

      onlineUsers[socketId] = newUserId

      const userIdArr = Object.values(onlineUsers)

      io.sockets.emit('updateOnlineUsers', userIdArr)
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
    * INITIALLIZE TOKEN POSITIONS IN NEWLY CREATED ROOM
    */
    socket.on('created_room', (roomId) => {
      token_positions[roomId] = {
        'black': [500, 500],
        'red': [550, 550],
        'green': [600, 600],
        'blue': [650, 650]
      }
      socket.emit('initial_token_positions', token_positions[roomId])
    })
    /*
    * MOVING TOKENS
    */
    socket.on('move_token', (newCoords, color, roomId) => {
      token_positions[roomId][color] = newCoords
      io.sockets.to('/room/'+roomId).emit('moved', newCoords, color)
    })

    /*
    * JOINROOM
    */
    socket.on('joinroom', (room, nickname) => {
      socket.join(room)
      io.sockets.to(room).emit('addMessage', {[nickname]: 'joined room'})
      io.sockets.to(room).emit('current_tokens', token_positions[room.slice(6)])
    })

    /*
    * GET ROOM MESSAGE
    */
    socket.on('postRoomMessage', (message, room) => {
      socket.broadcast.to(room).emit('addMessage', message)
      console.log('someone posted a message', message, room)
    })

   /*
    * LEAVE ROOM
    */
    socket.on('leaveroom', (room, nickname) => {
      console.log('someone left a room', room)
      io.sockets.to(room).emit('addMessage', {[nickname]: 'left room'})
      socket.leave(room)
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
