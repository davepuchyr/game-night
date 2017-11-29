import React from 'react'
import socket from '../socket'

const removeInvitation = (userId,room) => {
  socket.emit('removeInvite',userId,room)
}

const Invitations = (props) => {
  const {roomInvites, userId , remove} = props

  return (
    <div className="item-lobby-invitations">
      <h3>Invitations</h3>
      {roomInvites.map((room,ind) =>  <a key={ind} href={`${room}`} onClick={()=> removeInvitation(userId,room)}>You're invited to room # :{room.slice(6)}</a>)}
    </div>

  )
}

export default Invitations
