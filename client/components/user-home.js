import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import RoomList from './Room-list'
import OnlineUsers from './onlineUsers.js'
// establishes socket connection
import '../socket'

/**
 * COMPONENT
 */
 class Lobby extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    
    return (
      <div>
        <h3>Welcome, {this.props.user.nickname}</h3>
        <RoomList />
        <OnlineUsers />
      </div>
    )
  }
 }

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    onlineUsers: state.onlineUsers
  }
}

export default connect(mapState)(Lobby)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
