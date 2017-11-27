import React, {Component} from 'react';
import PropTypes from 'prop-types';
/*
* All thanks goes to "ceddia" for the dialog example :
* https://github.com/dceddia/modal-in-react/blob/master/src/App.js
*/
class InviteForm extends Component {

  render() {
    // Render nothing if the "show" prop is false
    const {children, onClose, invited, names, editInvites} = this.props
    if(!this.props.show) {
      return null;
    }
    console.log('line 15', editInvites)
    return (
      <div className="invitation-form-background">
        <div className="invitation-form-background-box">
          {children}
          <div id="invitationlist">
            <div id="invitationlist-nicknameList">
            ONLINE USERS :
            {
                names.length?
                  names.map((nickname,ind) => {
                   return !invited.includes(nickname)? (
                          <div
                              key={nickname.id}
                              onClick={e => editInvites(e,nickname,ind,'add')}>
                              {nickname.nickname}
                          </div>
                      ) :' Empty'
                  })
                  :
                  <div> Unavailable </div>
            }
            </div>
            <div id="invitationlist-invitedList">
            INVITE :
            {
              invited.length?
                invited.map((user,ind) => {
                  return (
                          <div
                            key={user.id}
                            onClick={e => editInvites(e,user,ind,'delete')}>
                            {user.nickname}
                          </div>
                  )
                })
                :
                <div>Invited no one</div>
            }
            </div>
          </div>
          <div className="inviteForm-background-box-footer">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

InviteForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default InviteForm;
