import React from 'react'
import socket from '../socket'

const removeInvitation = (userId,room) => {
  socket.emit('removeInvite',userId,room)
}

const Invitations = (props) => {
  const {roomInvites, userId , remove} = props

  return (
    <div className="container-main-lobby-bottom-comps-room-invitations">
      {roomInvites.map((room,ind) =>  <a key={ind} href={`${room}`} onClick={()=> removeInvitation(userId,room)}>Invitation to room: {room.slice(6)}</a>)}
    </div>
  )
}

export default Invitations
