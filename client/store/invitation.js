/**
 * ACTION TYPES
 */
const GET_INVITE = 'GET_INVITE'
const GET_INVITATIONS = 'GET_INVITATIONS'

/**
 * INITIAL STATE
 */
const defaultState = ''

/**
 * ACTION CREATORS
 */
export const getInvite = invite => ({type: GET_INVITE, invite})
export const getInvitations = invitations => ({type: GET_INVITATIONS, invitations})


/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_INVITE:
      return action.invite
    case GET_INVITATIONS:
      return action.invitations
    default:
      return state
  }
}
