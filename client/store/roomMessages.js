/**
 * ACTION TYPES
 */
const ADD_MESSAGE  ='ADD_MESSAGE';

/**
 * INITIAL STATE
 */
const allMessages = [];

/**
 * ACTION CREATORS
 */
export const addMessage = message => ({type: ADD_MESSAGE, message});

/**
 * REDUCER
 */
export default function (state = allMessages, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
};