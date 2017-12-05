import io from 'socket.io-client'

import store, {
  getInvitations,
  getInvite,
  getOnlineUsers,
   newMessage,
   addMessage,
   move_black,
   move_red,
   move_green,
   move_blue,
   addImage,
   addDraws,
   deleteImage,
   updateBackground,
   addRoom
  } from './store'

const socket = io(window.location.origin)

//color dispatcher
function colorDispatcher(coords, color){
  switch(color){
    case 'black':
      store.dispatch(move_black(coords))
      break
    case 'red':
      store.dispatch(move_red(coords))
      break
    case 'green':
      store.dispatch(move_green(coords))
      break
    case 'blue':
      store.dispatch(move_blue(coords))
      break
  }
}

socket.on('connect', () => {

  //updateOnlineUsers
  socket.on('updateOnlineUsers', onlineUsers => {
    store.dispatch(getOnlineUsers(onlineUsers))
  })
  //received message
  socket.on('received_new_message', message => {
    store.dispatch(newMessage(message))
  })

  socket.on('add_new_room', (room) => {
    store.dispatch(addRoom(room))
  })

  socket.on('addDraw', draws => {
    store.dispatch(getDraws(draws))
  })

  //adding messages
  socket.on('addMessage', message => {
    store.dispatch(addMessage(message))
  })

  //initial token position update
  socket.on('initial_token_positions', positions => {
    for(let color in positions){
      colorDispatcher(positions[color], color)
    }
  })

  //current token positions
  socket.on('current_tokens', positions => {
    for(let color in positions){
      colorDispatcher(positions[color], color)
    }
  })

  //moving tokens within the room
  socket.on('moved', (newCoords, color) => {
    colorDispatcher(newCoords, color)
  })

  // user received an invite
  socket.on('invite', room => {
    store.dispatch(getInvite(room))
  })
  // user received an invite
  socket.on('storeInvitations', invites => {
    store.dispatch(getInvitations(invites))
  })

  socket.on('add_group_image', image => {
    image.entry = true
    store.dispatch(addImage(image))
  })

  socket.on('get_group_pics', imgArr => {
    imgArr.forEach(image => {
      image.entry = true
      store.dispatch(addImage(image))
    })
  })

  socket.on('delete_group_pic', imgUrl => {
    store.dispatch(deleteImage(imgUrl))
  })

  socket.on('add_draw', stroke => {
    store.dispatch(addDraws(stroke))
  })

  socket.on('initial_draws', draws => {
    draws.forEach(stroke => {
      store.dispatch(addDraws(stroke))
    })
  })

  socket.on('update_background', (img, roomId) => {
    
    store.dispatch(updateBackground(img))
  })
})

export default socket
