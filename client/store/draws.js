/**
 * ACTION TYPES
 */
const ADD_DRAWS = 'ADD_DRAWS';

/**
 * INITIAL STATE
 */
const initialDraws = [];

/**
 * ACTION CREATORS
 */
export const addDraws = draws => ({type: ADD_DRAWS, draws});

/**
 * REDUCER
 */
export default function (state = initialDraws, action) {
  switch (action.type) {
    case ADD_DRAWS:
      return [...state, action.draws];
    default:
      return state;
  }
};