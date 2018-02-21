import axios from 'axios';
import history from '../history';
import socket from '../socket';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
export const getUser = (user) => ({type: GET_USER, user});
export const removeUser = () => ({type: REMOVE_USER});

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        if (res.data) {
          let simpleUser = Object.assign({}, {id: res.data.id, nickname: res.data.nickname});
          socket.emit('userConnect', simpleUser);
        }
        dispatch(getUser(res.data || defaultUser));
      })
      .catch(err => console.log(err));

export const auth = (email, password, method, nickname) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, nickname })
      .then(res => {
        let simpleUser = Object.assign({}, {id: res.data.id, nickname: res.data.nickname});
        socket.emit('userConnect', simpleUser);
        dispatch(getUser(res.data));
        history.push('/lobby');
      })
      .catch(error =>
        dispatch(getUser({error})));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser());
        socket.disconnect();
        history.push('/login');
      })
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};