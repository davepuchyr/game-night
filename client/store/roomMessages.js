import axios from 'axios'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const NEW_MESSAGE  ='NEW_MESSAGE'

/**
 * INITIAL STATE
 */
const allMessages = []

/**
 * ACTION CREATORS
 */
export const addMessage = message => ({type: NEW_MESSAGE, message})

/**
 * REDUCER
 */
export default function (state = allMessages, action) {
    switch (action.type) {
      case NEW_MESSAGE:
        return [...state, action.message]
      default:
        return state
    }
  }