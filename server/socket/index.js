
const onlineUsers = {}
const token_positions = {}
<<<<<<< HEAD
const group_pictures = {}
// const draws = []
=======
>>>>>>> 12c990a9fb78652755cb743aece41eec37da60b5


module.exports = (io) => {
  io.on('connection', (socket) => {
    let socketId = socket.id
<<<<<<< HEAD

=======
    
>>>>>>> 12c990a9fb78652755cb743aece41eec37da60b5
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
<<<<<<< HEAD
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
=======
    * DRAWS
    */
    socket.on('draw', (start, end) => {
      draws.push({start, end})
      socket.broadcast.emit('addDraw', draws)
      // socket.emit('addDraw', draws)
>>>>>>> 12c990a9fb78652755cb743aece41eec37da60b5
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
      const roomId = room.slice(6);
      if (!token_positions[roomId]) {
        token_positions[roomId] = {
          'black': [500, 500],
          'red': [550, 550],
          'green': [600, 600],
          'blue': [650, 650]
        }
      }
      socket.join(room)
<<<<<<< HEAD
        if (group_pictures[roomId]) {
          io.sockets.to(room).emit('get_group_pics', group_pictures[roomId])
        }
        io.sockets.to(room).emit('addMessage', {[nickname]: 'joined room'})
        io.sockets.to(room).emit('current_tokens', token_positions[roomId])
      })

      /*
      * GET ROOM MESSAGE
      */
      socket.on('postRoomMessage', (message, room) => {
        socket.broadcast.to(room).emit('addMessage', message)
      })

      /*
      * LEAVE ROOM
      */
      socket.on('leaveroom', (room, nickname) => {
        io.sockets.to(room).emit('addMessage', {[nickname]: 'left room'})
        socket.leave(room)
      })
=======
      io.sockets.to(room).emit('addMessage', {[nickname]: 'joined room'})
      io.sockets.to(room).emit('current_tokens', token_positions[roomId])
    })

    /*
    * GET ROOM MESSAGE
    */
    socket.on('postRoomMessage', (message, room) => {
      socket.broadcast.to(room).emit('addMessage', message)
    })

   /*
    * LEAVE ROOM
    */
    socket.on('leaveroom', (room, nickname) => {
      io.sockets.to(room).emit('addMessage', {[nickname]: 'left room'})
      socket.leave(room)
    })
>>>>>>> 12c990a9fb78652755cb743aece41eec37da60b5

      /*
      * ADDING GROUP PICS
      */
      socket.on('new_group_image', (image) => {
        const { room } = image
        group_pictures[room] ?
          group_pictures[room].push(image) :
          group_pictures[room] = [image]
        io.sockets.to(`/room/${room}`).emit('add_group_image', image)
      })

      /*
      * DELETING GROUP PICS
      */
      socket.on('delete_group_image', (imageUrl, roomId) => {
        let updatePictureArr = group_pictures[roomId].filter(image => {
          if (image.url === imageUrl) return false
          return true
        })
        group_pictures[roomId] = updatePictureArr
      })

      /*
      * LOGOUT
      */
      socket.on('disconnect', () => {
        console.log(`Connection ${socket.id} has left the building`)

<<<<<<< HEAD
        delete onlineUsers[socketId]

        const simpleUserArr = Object.values(onlineUsers)

        io.sockets.emit('updateOnlineUsers', simpleUserArr)
        // socket.broadcast.emit('updateOnlineUsers', simpleUserArr)
      })
=======
      io.sockets.emit('updateOnlineUsers', simpleUserArr)
    })
>>>>>>> 12c990a9fb78652755cb743aece41eec37da60b5
  })
}
