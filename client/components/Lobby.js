import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
//components
import RoomList from './Room-list'
import OnlineUsers from './onlineUsers'
import Messages from './Messages'

/**
 * COMPONENT
 */
export const Lobby = (props) => {
  const {handleClick, isLoggedIn} = props

  return (
    <div className="container-lobby">
        <RoomList />
        <Messages />
        <OnlineUsers />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

export default connect(mapState)(Lobby)

/**
 * PROP TYPES
 */
Lobby.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
