/**
 * ACTION TYPES
 */
const ADD_IMAGE = 'ADD_IMAGE'
const UPDATE_IMAGE = 'UPDATE_IMAGE';
const DELETE_IMAGE = 'DELETE_IMAGE';

/**
 * INITIAL STATE
 */
const images = [];

/**
 * ACTION CREATORS
 */
export const addImage = image => ({type: ADD_IMAGE, image});
export const updateImage = updatedImage => ({type: UPDATE_IMAGE, updatedImage});
export const deleteImage = imageUrl => ({type: DELETE_IMAGE, imageUrl});

/**
 * REDUCER
 */
export default function (state = images, action) {
  switch (action.type) {
    case ADD_IMAGE:
      return [...state, action.image];
    case UPDATE_IMAGE:
      return state.map(img => img.url === action.updatedImage.url ? action.updatedImage : img);
    case DELETE_IMAGE: 
      return  state.filter(img => img.url !== action.imageUrl);
    default:
      return state;
  }
}
