import axios from 'axios'
import history from '../history'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const GET_ALL_ROOMS = 'GET_ALL_ROOMS'
const ADD_ROOM = 'ADD_ROOM'

/**
 * INITIAL STATE
 */
const rooms = []

/**
 * ACTION CREATORS
 */
const getAllRooms = allRooms => ({type: GET_ALL_ROOMS, allRooms})
const addRoom = room => ({type: ADD_ROOM, room})

/**
 * THUNK CREATORS
 */
export const fetchRoomList = () =>
  dispatch =>
    axios.get('/api/rooms')
      .then(res => {
        dispatch(getAllRooms(res.data))
      })
      .catch(error =>
        console.error(error))


export const createRoom = (newName, newGame, user) =>
  dispatch =>
    axios.post('/api/rooms', {name: newName, game: newGame, adminId: user})
      .then(res => {
        socket.emit('created_room', String(res.data.id))
        history.push(`/room/${res.data.id}`)
        dispatch(addRoom(res.data))
      })
      .catch(error =>
        console.error(error))


export default function (state = rooms, action) {
  switch (action.type) {
    case GET_ALL_ROOMS:
      return action.allRooms
    case ADD_ROOM:
      return [...state, action.room];
    default:
      return state
  }
}
