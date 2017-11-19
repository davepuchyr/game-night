import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchRoomList, createRoom } from '../store'

/**
 * COMPONENT
 */
class RoomList extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getRooms()
    
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addRoom(event.target.name.value, event.target.game.value, this.props.user.id)
  }



  render () {
    return (
      <div>
        <h2>Room List</h2>
        <div>
          {this.props.allRooms.map((room, idx) => {
            return (<div key={idx}>{`${room.name} - ${room.game}`}</div>)
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Enter Room Name" />
          <br/>
          <input type="text" name="game" placeholder="Enter Game Name" />
          <br/>
          <input type="submit" value="Create Room" />
        </form>
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

const mapDispatch = (dispatch) => {
  return {
    getRooms() {
      dispatch(fetchRoomList())
    },
    addRoom(name, game, admin) {
      dispatch(createRoom(name, game, admin))
    }
  }
}

export default connect(mapState, mapDispatch)(RoomList)

/**
 * PROP TYPES
 */
RoomList.propTypes = {
  allRooms: PropTypes.array
}
