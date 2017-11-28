import axios from 'axios'
import socket from '../socket'
/**
 * ACTION TYPES
 */
const ADD_DRAWS = 'ADD_DRAWS'

/**
 * INITIAL STATE
 */
const draws = []

/**
 * ACTION CREATORS
 */
export const addDraws = draws => ({type: ADD_DRAWS, draws})

/**
 * REDUCER
 */
export default function (state = draws, action) {
  switch (action.type) {
    case ADD_DRAWS:
      return [...state, action.draws]
    default:
      return state
  }
}