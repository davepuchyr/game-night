import socket from '../socket'
/**
 * ACTION TYPES
 */
const ADD_IMAGE = 'ADD_IMAGE'
const UPDATE_IMAGE = 'UPDATE_IMAGE'
const DELETE_IMAGE = 'DELETE_IMAGE'

/**
 * INITIAL STATE
 */
const images = []

/**
 * ACTION CREATORS
 */
export const addImage = image => ({type: ADD_IMAGE, image})
export const updateImage = updatedImage => ({type: UPDATE_IMAGE, updatedImage})
export const deleteImage = imageUrl => ({type: DELETE_IMAGE, imageUrl})

/**
 * REDUCER
 */
export default function (state = images, action) {
  switch (action.type) {
    case ADD_IMAGE:
      return [...state, action.image]
    case UPDATE_IMAGE:
      let stateCopy = state.filter(image => {
        if (image.url === action.updatedImage.url){
          return false
        }
        return true
      })
      return [...stateCopy, action.updatedImage]
    case DELETE_IMAGE: 
      let stateCopy2 = state.filter(image => {
        if (image.url === action.imageUrl){
          return false
        }
        return true
      })
      return [...stateCopy2]
    default:
      return state
  }
}