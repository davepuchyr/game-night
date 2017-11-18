import io from 'socket.io-client'

import store, { getOnlineUsers } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('updateOnlineUsers', onlineUsers => {
    console.log('I HEAR SOMEONE')
    store.dispatch(getOnlineUsers(onlineUsers))
  })
})


export default socket
