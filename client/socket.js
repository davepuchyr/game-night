import io from 'socket.io-client'

import store, { getOnlineUsers, newMessage, getDraws, moveTokens } from './store'

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

  socket.on('player1_moved', newCoords => {
    store.dispatch(moveTokens(newCoords))
  })
})

export default socket
