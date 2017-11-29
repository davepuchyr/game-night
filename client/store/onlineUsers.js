/**
 * ACTION TYPES
 */
const GET_ONLINE_USERS = 'GET_ONLINE_USERS'

/**
 * INITIAL STATE
 */
const onlineUsers = []

/**
 * ACTION CREATORS
 */
export const getOnlineUsers = userArray => ({type: GET_ONLINE_USERS, onlineUsers: userArray})

/**
 * REDUCER
 */
export default function (state = onlineUsers, action) {
  switch (action.type) {
    case GET_ONLINE_USERS:
      return action.onlineUsers
    default:
      return state
  }
}
  