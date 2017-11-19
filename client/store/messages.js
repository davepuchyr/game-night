import axios from 'axios'
import socket from '../socket'
/**
 * ACTION TYPES
 */
const GET_MESSAGES = 'GET_MESSAGES'
const NEW_MESSAGE = 'NEW_MESSAGE'

/**
 * INITIAL STATE
 */
const allMessages = []

/**
 * ACTION CREATORS
 */
export const getMessages = messages => ({type: GET_MESSAGES, messages})

export const newMessage = message => ({type: NEW_MESSAGE, message})

/**
 * THUNK
 */
export const fetchMessages = () => {
    return (dispatch) => (
        axios.get('/api/messages')
          .then(res => res.data)
          .then(messages => {
              dispatch(getMessages(messages))
          })
    )
}

export const postMessage = (info) => {
  return (dispatch) => (
    axios.post('/api/messages', info)
      .then(res => res.data)
      .then(message => {
        dispatch(newMessage(message))
        socket.emit('new_message', message)
      })
  )
}
/**
 * REDUCER
 */
export default function (state = allMessages, action) {
    switch (action.type) {
      case GET_MESSAGES:
        return action.messages
      case NEW_MESSAGE:
        return [...state, action.message]
      default:
        return state
    }
  }
  