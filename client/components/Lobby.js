import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, getInvitations} from '../store'
import socket from '../socket'
//components
import {RoomList,OnlineUsers, Messages, Invitations} from './index'

/**
 * COMPONENT
 */
class Lobby extends Component {

  componentDidMount(){
    socket.emit('retreiveInvites')
  }

  render(){
    const {handleClick, isLoggedIn, invitations, user} = this.props
    const listOfRoomInvites = Object.keys(invitations).filter(id => user.id === (+id)? id: null).map(each => invitations[each])
    return (
      <div className="container-lobby">
          {
            listOfRoomInvites.length? <Invitations roomInvites={listOfRoomInvites} userId={user.id}/> : null
          }
          <div className="container-lobby-bottom" >
            <RoomList />
            <Messages />
            <OnlineUsers />
          </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    invitations: state.invitation
  }
}
export default connect(mapState)(Lobby)

/**
 * PROP TYPES
 */
Lobby.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object
}
