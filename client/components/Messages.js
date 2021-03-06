import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { fetchMessages, postMessage } from '../store';

export class Messages extends React.Component {
  constructor(props){
    super(props);
    this.state = { messageInput: '' };
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.props.getMessages();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const messagesContainer = this.refs.message || undefined;
    messagesContainer ? 
      (messagesContainer.scrollTop = messagesContainer ? messagesContainer.scrollHeight : undefined) : 
      undefined;
  }

  handleChange(e){
    this.setState({ messageInput: e.target.value });
  }

  render(){
    const { user, messages, newMessage } = this.props;

    return (
      <div className="container-main-lobby-bottom-comps-chat-messages">
        <div className="container-main-lobby-bottom-comps-chat-messages-items" ref="message">
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
				</div>
				<form onSubmit={(e) => {
					e.preventDefault()
          this.setState({ messageInput: '' })
          user ?
            newMessage(user.id, e.target.message.value) :
            null
				}}>
				  <input
					  type="text"
						name="message"
						value={this.state.messageInput}
						onChange={this.handleChange}
						placeholder="Write message"
					/>
					<button type="submit">Post</button>
				</form>
      </div>
    );
  }
};


const mapState = (state) => {
  return {
    user: state.user,
    messages: state.messages
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMessages: () => {
      dispatch(fetchMessages());
    },
    newMessage: (userId, content) => {
      let info = { userId, content };
      dispatch(postMessage(info));
    }
  };
};

export default connect(mapState, mapDispatch)(Messages);

Messages.propTypes = {
  messages: PropTypes.array,
  getMessages: PropTypes.func.isRequired
};