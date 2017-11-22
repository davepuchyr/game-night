/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Lobby } from './Lobby'
export {default as RoomList} from './Room-list'
export {default as Room} from './room'
export { default as Messages } from './Messages'
export { default as OnlineUsers } from './onlineUsers'
export { default as Whiteboard } from './whiteboard'
export { default as Whiteboard2 } from './whiteboard2'
export { default as Video } from './video'
export { default as RoomMessages } from './room-messages'
export { default as Drop } from './drop'
