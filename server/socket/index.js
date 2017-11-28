
const onlineUsers = {} // SOCKETID : USERID
const token_positions = {}
const invitations = {} // USERID : ROOM
const group_pictures = {}
<<<<<<< HEAD
const draws = {}
=======
>>>>>>> 40d52903afc8c30cad874465b292d31c3864cc24


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
      // socket.broadcast.emit('received_new_message', message)
      io.sockets.to('/lobby').emit('received_new_message', message)
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
      const roomId = room.slice(6);
      if (!token_positions[roomId]) {
        token_positions[roomId] = {
          'black': [500, 500],
          'red': [550, 550],
          'green': [600, 600],
          'blue': [650, 650]
        }
      }
<<<<<<< HEAD
      socket.join(room)
        if (group_pictures[roomId]) {
          io.sockets.to(room).emit('get_group_pics', group_pictures[roomId])
        }
        io.sockets.to(room).emit('addMessage', {[nickname]: 'joined room'})
        io.sockets.to(room).emit('current_tokens', token_positions[roomId])
        if (draws[roomId]) {
          socket.emit('initial_draws', draws[roomId])
        }
      })
=======
    socket.join(room)
      if (group_pictures[roomId]) {
        io.sockets.to(room).emit('get_group_pics', group_pictures[roomId])
      }
      io.sockets.to(room).emit('addMessage', {[nickname]: 'joined room'})
      io.sockets.to(room).emit('current_tokens', token_positions[roomId])
    })
>>>>>>> 40d52903afc8c30cad874465b292d31c3864cc24

    /*
    * GET ROOM MESSAGE
    */
    socket.on('postRoomMessage', (message, room, nickname) => {
      socket.broadcast.to(room).emit('addMessage', message)
    })

    /*
    * INVITATION RECEIVED AND NOW SEND TO EACH USER
    */
    socket.on('invite', (listOfUsers, room) => {
      const invite = listOfUsers.map(userId => {
        invitations[userId] = room
        return Object.keys(onlineUsers).find(key => onlineUsers[key].id === userId)
      })
      invite.forEach(friend => {
        io.sockets.to(friend).emit('invite', room)
      })
      socket.broadcast.emit('storeInvitations', invitations)
    })

    /*
    * REMOVE INVITE
    */
    socket.on('removeInvite', (userId, room) => {
      for(let id in invitations){
        if((+id) === userId && invitations[id] === room){
          delete invitations[id]
        }
      }
      socket.broadcast.emit('storeInvitations', invitations)
    })

    /*
    * SEND EVERY INVITES AVAIALABLE
    */
    socket.on('retreiveInvites', () => {
      io.sockets.emit('storeInvitations', invitations)
    })

      /*
      * ADDING DRAW
      */
      socket.on('new_draw', (stroke) => {
        draws[stroke.room] ? draws[stroke.room].push(stroke)
        :
        draws[stroke.room] = [stroke]
        stroke.erase ? 
        io.sockets.to(`/room/${stroke.room}`).emit('add_draw', stroke)
        :
        socket.broadcast.to(`/room/${stroke.room}`).emit('add_draw', stroke)
      })

   /*
    * LEAVE ROOM
    */
    socket.on('leaveroom', (room, nickname) => {
      io.sockets.to(room).emit('addMessage', {[nickname]: 'left room'})
      socket.leave(room)
    })
    
    /*
    * DICE RESULT
    */
    socket.on('die_result', (result, dieType, room, user) => {
      let splitted = result.split(' ')
      let rolledResult = splitted[splitted.length-1]

      let message = `[${user}] has rolled (${dieType}) and got ${rolledResult}!!!`

      io.sockets.to(room).emit('addMessage', {['Die Master']: message})
    })

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

      delete onlineUsers[socketId]

      const simpleUserArr = Object.values(onlineUsers)

      io.sockets.emit('updateOnlineUsers', simpleUserArr)
      // socket.broadcast.emit('updateOnlineUsers', simpleUserArr)
    })
  })
}
