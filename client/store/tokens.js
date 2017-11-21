/**
 * ACTION TYPES
 */
const MOVE_TOKENS = 'MOVE_TOKENS'

/**
 * INITIAL STATE
 */
const token_positions = {
    player1: [500, 500]
}

/**
 * ACTION CREATORS
 */
export const moveTokens = token_positions => ({type: MOVE_TOKENS, token_positions})

/**
 * REDUCER
 */
export default function (state = token_positions, action) {
    switch (action.type) {
      case MOVE_TOKENS:
        return Object.assign({}, state, { player1: action.token_positions })
      default:
        return state
    }
  }