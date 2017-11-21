/**
 * ACTION TYPES
 */
const MOVE_BLACK = 'MOVE_BLACK'
const MOVE_RED = 'MOVE_RED'
const MOVE_GREEN = 'MOVE_GREEN'
const MOVE_BLUE = 'MOVE_BLUE'

/**
 * INITIAL STATE
 */
const token_positions = {
    black: [500, 500],
    red: [550, 550],
    green: [600, 600],
    blue: [650, 650],
}

/**
 * ACTION CREATORS
 */
export const moveBlack = black_position => ({type: MOVE_BLACK, black_position})

export const moveRed = red_position => ({type: MOVE_RED, red_position})

export const moveGreen = green_position => ({type: MOVE_GREEN, green_position})

export const moveBlue = blue_position => ({type: MOVE_BLUE, blue_position})

/**
 * REDUCER
 */
export default function (state = token_positions, action) {
    switch (action.type) {
      case MOVE_BLACK:
        return Object.assign({}, state, { black: action.black_position })
      case MOVE_RED:
        return Object.assign({}, state, { red: action.red_position })
      case MOVE_GREEN:
        return Object.assign({}, state, { green: action.green_position })
      case MOVE_BLUE:
        return Object.assign({}, state, { blue: action.blue_position })
      default:
        return state
    }
  }