import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {rooms} from '../store'

/**
 * COMPONENT
 */
export const RoomList = (props) => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    allRooms: state.rooms
  }
}

export default connect(mapState)(RoomList)

/**
 * PROP TYPES
 */
RoomList.propTypes = {
  allRooms: PropTypes.string
}
