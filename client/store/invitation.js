import axios from 'axios'
import history from '../history'

import socket from '../socket'

/**
 * ACTION TYPES
 */
const GET_INVITE = 'GET_INVITE'

/**
 * INITIAL STATE
 */
const defaultState = ''

/**
 * ACTION CREATORS
 */
export const getInvite = invite => ({type: GET_INVITE, invite})


/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_INVITE:
      return action.invite
    default:
      return state
  }
}
