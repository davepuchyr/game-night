import axios from 'axios'
import socket from '../socket'
/**
 * ACTION TYPES
 */
const ADD_DRAW = 'ADD_DRAW'

/**
 * INITIAL STATE
 */
const draws = []

/**
 * ACTION CREATORS
 */
export const addDraw = strokeArr => ({type: ADD_DRAW, strokeArr})

/**
 * REDUCER
 */
export default function (state = draws, action) {
    switch (action.type) {
      case ADD_DRAW:
        return [...state, ...action.strokeArr]
      default:
        return state
    }
  }