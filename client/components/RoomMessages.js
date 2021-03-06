import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { reactDom } from 'react-dom';

import socket from '../socket';
import { addMessage } from '../store';
import InviteForm from './InviteForm';
import history from '../history';

export class RoomMessages extends Component {

	constructor(props) {
		super(props);

		this.state = {
				isOpen: false,
				searchNickName: '',
				invited: []
		};
		this.invitedNames = [];
		this.invitations = [];
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleInvite = this.toggleInvite.bind(this);
		this.sendInvites = this.sendInvites.bind(this);
		this.editInvites = this.editInvites.bind(this);
		this.scrollToBottom = this.scrollToBottom.bind(this);
		this.returnToLobby = this.returnToLobby.bind(this);
	}

	handleSubmit (e) {
		e.preventDefault();
		const nickname = this.props.user.nickname;
		const content = e.target.content.value;
		const message = {nickname, content};
		this.props.postMessage(message);
		socket.emit('postRoomMessage', message, this.props.roomPath);
		e.target.content.value = '';
	}

	/*
	* Is the invite box is open
	* if it's closed, the invitation names are erased
	*/
	toggleInvite() {
		this.invitations = [];
		this.state.invited = [];
		this.setState({ isOpen: !this.state.isOpen});
	}

	/*
	* EDIT YOUR INVITATION
	*/
	editInvites(e, nickname, index, action) {
		const {invited} = this.state;
		switch(action){
			case 'add':
				if(!this.invitations.includes(nickname.id)) {
					this.invitations.push(nickname.id);
					invited.push(nickname.nickname);
					this.invitedNames = this.invitedNames.splice(index,1);
					this.setState({invited});
				}
				break;
			case 'delete':
				if(this.invitations.includes(nickname.id)) {
					this.invitations.splice(index,1);
					invited.splice(index,1);
					this.invitedNames = this.invitedNames.splice(index,1);
					this.setState({invited});
				}
				break;
		}
	}
	
	/*
	* EMIT TO FRONTEND SOCKET WITH A LIST OF USER IDS
	*/
	sendInvites(e) {
		e.preventDefault();
		socket.emit('invite', this.invitations , this.props.roomPath);
		this.toggleInvite();
	}

	componentDidMount() {
		const room = this.props.roomPath;
		socket.emit('joinroom', room, this.props.user.nickname);
		socket.emit('current_token_positions', room);
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	componentWillUnmount() {
		const room = this.props.roomPath;
		socket.emit('leaveroom', room, this.props.user.nickname);
	}

	scrollToBottom() {
		const messagesContainer = this.refs.message;
		messagesContainer.scrollTop = messagesContainer.scrollHeight;;
	};

	returnToLobby(e) {
		history.push('/lobby');
	}

	render () {
		const {user, roomMessages, onlineUsers} = this.props;
		const {isOpen , invited} = this.state;

		return (
			<div id="room-message-component">
				<InviteForm
					show={isOpen}
					userId={user.id}
					onClose={this.toggleInvite}
					onlineUsers={onlineUsers}
					invitedNames={this.invitedNames}
					editInvites={this.editInvites}
					invited={invited}
					sendInvites={this.sendInvites}>
				</InviteForm>
				<div id="room-message-component-option">
					<h3> Game Log </h3>
					<button id="invite-button" onClick={this.toggleInvite}>
						Invite
					</button>
					<button 
					  id="invite-button" 
					  className="return-lobby-button"
					  onClick={this.returnToLobby}>Lobby
					</button>
				</div>
				<hr/>
				<div id="message-view" ref="message">
					{
						roomMessages.map((message, idx) => {
							return (
								<div style={{'display': 'flex', 'flexDirection': 'column'}} key={idx}>
									<div style={{'display': 'flex', 'flexDirection': 'row'}}>
										<div style={{'color': '#7289DA', 'paddingRight': '6px'}}>
											{message.nickname}:
										</div>
										<div style={{'wordBreak': 'break-word'}}>
											{message.content}
										</div>
									</div>
									<hr/>
								</div>
							)
						})
					}
				</div>
				<form onSubmit={this.handleSubmit}>
					<input className="msg-input" type="text" name="content"/>
					<button type="submit">
						enter
					</button>
				</form>
			</div>
		);
  }
};

const mapState = (state) => {
	return {
		user: state.user,
		onlineUsers: state.onlineUsers,
		roomMessages: state.roomMessages
	};
};

const mapDispatch = (dispatch) => {
	return {
		postMessage(message) {
			dispatch(addMessage(message));
		}
	};
};

export default connect(mapState, mapDispatch)(RoomMessages);