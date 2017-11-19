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
    <div>
      <div>
        <h1>Welcome to the Lobby!</h1>
        <a href="#" onClick={handleClick}>Logout</a>
      </div>
      {/* <Link to='/messages'>
        <h2>Take me to Messages</h2>
      </Link> */}
        <OnlineUsers />
        <Messages />
        <RoomList />
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

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Lobby)

/**
 * PROP TYPES
 */
Lobby.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
