/**
 * ACTION TYPES
 */
const START_DRAGGING = 'START_DRAGGING'
const STOP_DRAGGING = 'STOP_DRAGGING'

/**
 * INITIAL STATE
 */
const dragging = {bool: false, url: ''}

/**
 * ACTION CREATORS
 */
export const startDragging = (url, personal) => ({type: START_DRAGGING, dragging: {bool: true, url, personal}})
export const stopDragging = () => ({type: STOP_DRAGGING, dragging: {bool: false, url: ''}})


/**
 * REDUCER
 */

export default function (state = dragging, action) {
  switch (action.type) {
    case START_DRAGGING:
      return action.dragging
    case STOP_DRAGGING:
      return action.dragging
    default:
      return state
  }
}
