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
      this.state = { messageInput: '' }
  }

  componentWillMount(){
      this.props.getMessages()
  }

  render(){
    const { user, messages, newMessage } = this.props
    return (
        <div className="item-lobby-messages">
            <h3>All Chat</h3>
            <div className="item-lobby-messages-items">
            {
            messages.length?
                messages.map(message =>
                  <div key={message.id}>
                    <p className="message-line"><strong>{message.user.nickname || 'Unknown'}</strong> : {message.content}</p>
                  </div>
                )
                :
                <div> No messages right now </div>
            }
            <form onSubmit={(e) => {
                e.preventDefault()
                this.setState({ messageInput: '' })
                newMessage(user.id, e.target.message.value)
            }}>
               <input
               type="text"
               name="message"
               value={this.state.messageInput}
               onChange={(e) => this.setState({ messageInput: e.target.value })}
               placeholder="Write message"
               />
               <button type="submit">Post</button>
            </form>
            </div>
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
