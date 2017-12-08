/**
 * ACTION TYPES
 */
const UPDATE_BACKGROUND  ='UPDATE_BACKGROUND'

/**
 * INITIAL STATE
 */

const background = {url: 'http://i.imgur.com/uhhfaMZ.png'}

/**
 * ACTION CREATORS
 */
export const updateBackground = img => ({type: UPDATE_BACKGROUND, img})

/**
 * REDUCER
 */
export default function (state = background, action) {
  switch (action.type) {
    case UPDATE_BACKGROUND:
      return action.img
    default:
      return state
  }
}