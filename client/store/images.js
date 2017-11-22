import socket from '../socket'
/**
 * ACTION TYPES
 */
const ADD_IMAGE = 'ADD_IMAGE'

/**
 * INITIAL STATE
 */
const images = []

/**
 * ACTION CREATORS
 */
export const addImage = image => ({type: ADD_IMAGE, image})

/**
 * REDUCER
 */
export default function (state = images, action) {
    switch (action.type) {
      case ADD_IMAGE:
        return [...state, action.image]
      default:
        return state
    }
  }