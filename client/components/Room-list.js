import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {rooms} from '../store'

/**
 * COMPONENT
 */
class RoomList extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h3>Welcome, {this.props.user.nickname}</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    allRooms: state.rooms,
    user: state.user
  }
}

export default connect(mapState)(RoomList)

/**
 * PROP TYPES
 */
RoomList.propTypes = {
  allRooms: PropTypes.string
}
