import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_ROOMS = 'GET_ALL_ROOMS'
const ADD_ROOM = 'ADD_ROOM'
const REMOVE_ROOM = 'REMOVE_ROOM'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getAllRooms = allRooms => ({type: GET_ALL_ROOMS, allRooms})
const addRoom = addRoom => ({type: ADD_ROOM, addRoom})
const removeRoom = () => ({type: REMOVE_ROOM})

/**
 * THUNK CREATORS
 */
export const fetchRoomList = () =>
  dispatch =>
    axios.get('/rooms/')
      .then(res => {
        dispatch(getAllRooms(res.data))
        history.push('/allRooms')
      })
      .catch(error =>
        dispatch(getAllRooms({error})))

export const createRoom = () =>
  dispatch =>
    axios.post('/channels/logout')
      .then(_ => {
        dispatch(addChannel())
        history.push('/channels')
      })
      .catch(err => console.log(err))

// export const deleteChannel = () =>
//   dispatch =>
//     axios.post('/channel/delete')
//       .then(_ => {
//         dispatch(removeChannel())
//         history.push('/delete')
//       })
//       .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_ROOMS:
      return action.allRooms
    case ADD_ROOM:
      return action.addRoom
    case REMOVE_CHANNEL:
      return defaultUser
    default:
      return state
  }
}
