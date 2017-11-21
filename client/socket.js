import io from 'socket.io-client'

import store, { 
  getOnlineUsers,
   newMessage,
   getDraws,
   addMessage, 
   moveBlack, 
   moveRed, 
   moveGreen, 
   moveBlue 
  } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('updateOnlineUsers', onlineUsers => {
    console.log('I heard a socket, and it gave me online users. they are ', onlineUsers)
    store.dispatch(getOnlineUsers(onlineUsers))
  })

  socket.on('received_new_message', message => {
    store.dispatch(newMessage(message))
  })

  socket.on('addDraw', draws => {
    store.dispatch(getDraws(draws))
  })

  socket.on('addMessage', message => {
    store.dispatch(addMessage(message))
  })


  //tokens movement
  socket.on('black_moved', newCoords => {
    store.dispatch(moveBlack(newCoords))
  })

  socket.on('red_moved', newCoords => {
    store.dispatch(moveRed(newCoords))
  })

  socket.on('green_moved', newCoords => {
    store.dispatch(moveGreen(newCoords))
  })

  socket.on('blue_moved', newCoords => {
    store.dispatch(moveBlue(newCoords))
  })
})

export default socket
