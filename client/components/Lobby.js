import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, getInvitations} from '../store'
import socket from '../socket'
import {RoomList,OnlineUsers, Messages, Invitations} from './index'

/**
 * COMPONENT
 */
class Lobby extends Component {

  componentDidMount(){
    socket.emit('retrieveInvites')
  }

  
  render(){
    const {handleClick, isLoggedIn, invitations, user} = this.props
    const listOfRoomInvites = Object.keys(invitations).filter(id => user.id === (+id)? id: null).map(each => invitations[each])
    return (
      <div className="container-main-lobby">
        {
          listOfRoomInvites.length? <Invitations roomInvites={listOfRoomInvites} userId={user.id}/> : null
        }
        <div className="container-main-lobby-bottom" >
          <div className="container-main-lobby-bottom-comps">
            <div className="container-main-lobby-bottom-comps-room">
              <div className="container-main-lobby-bottom-comps-room-name">
                <h3>Room List</h3>
              </div>
              <RoomList />
            </div>
            <div className="container-main-lobby-bottom-comps-chat">
              <div className="container-main-lobby-bottom-comps-chat-name">
                <h3>All Chat</h3>
              </div>
              <Messages />
            </div>
            <div className="container-main-lobby-bottom-comps-players">
              <div className="container-main-lobby-bottom-comps-players-name">
                <h3>Players Online</h3>
              </div>
              <OnlineUsers />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    invitations: state.invitation
  }
}

export default connect(mapState)(Lobby)

Lobby.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object
}
