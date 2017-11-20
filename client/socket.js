import io from 'socket.io-client'

import store, { getOnlineUsers, newMessage, getDraws } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('updateOnlineUsers', onlineUsers => {
    store.dispatch(getOnlineUsers(onlineUsers))
  })

  socket.on('received_new_message', message => {
    store.dispatch(newMessage(message))
  })

  socket.on('addDraw', draws => {
    store.dispatch(getDraws(draws))
  })
})

export default socket
