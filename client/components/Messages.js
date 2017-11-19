import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchMessages, postMessage } from '../store'

/**
 * COMPONENT
 */
export class Messages extends React.Component {
  constructor(props){
      super(props)
  }

  componentDidMount(){
      this.props.getMessages()
  }

  render(){
    const { user, messages, newMessage } = this.props
    return (
        <div>
            {
            messages.length &&
                messages.map(message => 
                    <div key={message.id}>
                      <h2>{user.nickname||'Unknown'}</h2>
                      <p>{message.content}</p>
                    </div>
                )
            }
            <form onSubmit={(e) => {
                e.preventDefault()
                newMessage(user.id, e.target.message.value)
            }}>
               <input
               type="text"
               name="message"
               placeholder="Write message" 
               />
               <button type="submit">Post</button>
            </form>
        </div>
    )  
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    messages: state.messages
  }
}

const mapDispatch = (dispatch) => {
    return {
      getMessages: () => {
          dispatch(fetchMessages())
      },
      newMessage: (userId, content) => {
          let info = { userId, content }
          dispatch(postMessage(info))
      }
    }
}

export default connect(mapState, mapDispatch)(Messages)

/**
 * PROP TYPES
 */
Messages.propTypes = {
  messages: PropTypes.array,
  getMessages: PropTypes.func.isRequired
}
