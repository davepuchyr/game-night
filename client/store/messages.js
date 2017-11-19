import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_MESSAGES = 'GET_MESSAGES'

/**
 * INITIAL STATE
 */
const allMessages = []

/**
 * ACTION CREATORS
 */
export const getMessages = messages => ({type: GET_MESSAGES, messages})

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

/**
 * REDUCER
 */
export default function (state = allMessages, action) {
    switch (action.type) {
      case GET_MESSAGES:
        return action.messages
      default:
        return state
    }
  }
  