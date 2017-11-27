import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import rooms from './rooms'
import onlineUsers from './onlineUsers'
import messages from './messages'
import roomMessages from './roomMessages'
import tokens from './tokens'
import images from './images'
import trash from './trash'

const reducer = combineReducers({user, rooms, onlineUsers, messages, roomMessages, tokens, images, trash})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './rooms'
export * from './onlineUsers'
export * from './messages'
export * from './roomMessages'
export * from './tokens'
export * from './images'
export * from './trash'
