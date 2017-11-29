import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchMessages, postMessage } from '../store'

export class Messages extends React.Component {
  constructor(props){
    super(props)
    this.state = { messageInput: '' }
  }

  componentDidMount(){
    this.props.getMessages()
  }


  render(){
    const { user, messages, newMessage } = this.props
    return (
      <div className="container-main-lobby-bottom-comps-chat-messages">
        <div className="container-main-lobby-bottom-comps-chat-messages-items">
          {/* <div className="container-main-lobby-bottom-comps-chat-messages-items-list"> */}
          {
            messages.length ?
              messages.map(message => {
                return message.hasOwnProperty('user') ?
                  (
                  <div key={message.id} className="container-main-lobby-bottom-comps-chat-messages-items-list-line">
                   <strong>{message.user.nickname}</strong> : {message.content}
                  </div>
                  ) :
                  null
              }) :
              <div> No messages right now </div>
          }
          {/* </div> */}
				</div>
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
    )
  }
}


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

Messages.propTypes = {
  messages: PropTypes.array,
  getMessages: PropTypes.func.isRequired
}
