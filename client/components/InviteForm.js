import React, {Component} from 'react';
import PropTypes from 'prop-types';
/*
* All thanks goes to "dceddia" for the dialog example :
* https://github.com/dceddia/modal-in-react/blob/master/src/App.js
*/
const InviteForm = (props) => {

	// Render nothing if the "show" prop is false
	const {children, onClose, invited, invitedNames, editInvites, sendInvites, onlineUsers, userId} = props
	if(!props.show) {
		return null;
	}
	return (
		<div className="invitation-form-background">
			<div className="invitation-form-background-box">
				{children}
				<div id="invitationlist">
					<div id="invitationlist-nicknameList">
						<h3>ONLINE USERS</h3>
						{
							onlineUsers.length?
								onlineUsers.map((user,ind) => {
									return !invited.includes(user.nickname) && user.id !== userId ?
									(
										<h5
											key={user.id}
											onClick={e => editInvites(e,user,ind,'add')}
										>
										{user.nickname}
										</h5>
									) : user.id === userId ? null : `${user.nickname} Invited!`
								}) :
								<h5> Unavailable </h5>
						}
					</div>
					<div id="invitationlist-invitedList">
						<h3>INVITE</h3>
						{
							invited.length ?
								invited.map((user,ind) => {
									return (
										<h5 key={+user.id}>
											<button
												onClick={e => editInvites(e,user,ind,'delete')}>&times; </button>
											{user}
										</h5>
									)
								}) :
								<h5>Invited no one</h5>
						}
						</div>
					</div>
					<div className="invitation-form-footer">
						<button onClick={onClose}>Close</button>
						<button onClick={sendInvites}>Send</button>
					</div>
			</div>
		</div>
	)
}

InviteForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool,
	children: PropTypes.node
};

export default InviteForm
