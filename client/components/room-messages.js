import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import socket from '../socket'
import { addMessage } from '../store'
import InviteForm from './InviteForm'

class RoomMessages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            searchNickName: '',
            invited:[]
        }
        this.names = []
        this.invitations = []
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleInvite = this.toggleInvite.bind(this)
        this.sendInvites = this.sendInvites.bind(this)
        this.editInvites = this.editInvites.bind(this)
    }

    handleSubmit (e) {
        e.preventDefault()
        const sender = this.props.user.nickname
        const content = e.target.content.value
        const message = {[sender]: content}
        this.props.postMessage(message)
        socket.emit('postRoomMessage', message, this.props.roomPath)
        e.target.content.value = ''
    }

    /*
    * Is the invite box is open
    * if it's closed, the invitation names are erased
    */
    toggleInvite() {
        this.invitations = []
        this.state.invited = []
        this.setState({ isOpen: !this.state.isOpen})
    }
    /*
    * EDIT YOUR INVITATION
    */
    editInvites(e,nickname,index,action) {
      const {invited} = this.state
      console.log('LINE 49 - list of invitations', this.invitations)

      switch(action){
        case 'add':
            if(!this.invitations.includes(nickname.id)) {
              this.invitations.push(nickname.id)
              invited.push(nickname)
              this.names = this.names.splice(index,1)
              this.setState({invited})
            }
            break;
        case 'delete':
            if(this.invitations.includes(nickname.id)) {
              this.invitations.splice(index,1)
              invited.splice(index,1)
              this.names = this.names.splice(index,1)
              this.setState({invited})
            }
            break;
      }
      /*  if(!this.invitations.includes(nickname.id)) {
          this.invitations.push(nickname.id)
          invited.push(nickname)
          this.names = this.names.splice(ind,1)
          this.setState({invited})
        } else {
          this.invitations.splice(ind,1)
        }*/
    }
    /*
    * Emitting to the backend socket with a list of user ids for an invite
    */
    sendInvites(e) {
        // e.stopImmediatePropagation()
        // socket.emit('invite', this.invitations , this.props.roomPath)
    }

    componentDidMount () {
        const room = this.props.roomPath
        socket.emit('joinroom', room, this.props.user.nickname)
        socket.emit('current_token_positions', room)
    }

    componentWillUnmount () {
        const room = this.props.roomPath
        socket.emit('leaveroom', room, this.props.user.nickname)
    }

    render () {
        const {user, roomMessages, onlineUsers} = this.props
        const {isOpen , invited} = this.state

        this.names = onlineUsers.filter(nickName => {
            if(nickName.nickname.toLowerCase().includes(this.state.searchNickName)&& nickName.id !== user.id) return nickName
        })
        console.log('LINE 69', this.names)
        console.log('LINE 70', invited)

        return (
            <div id="room-message-component">
                <div id="room-message-component-option">
                    <h3> Messages </h3>
                    <button onClick={this.toggleInvite}>Invite</button>
                    <InviteForm
                        show={isOpen}
                        onClose={this.toggleInvite}
                        names={this.names}
                        editInvites={this.editInvites}
                        invited={invited}>
                        <div>
                          <small>Find by nickname</small>
                          <form>
                            <input
                                type="text"
                                placeholder="Search for your friend"
                                required
                                onChange={ searchFor => {
                                    searchFor.preventDefault()
                                    this.setState({searchNickName: searchFor.target.value.toLowerCase()})
                                }}/>
                            <button id="inviteFormSubmitBtn"type="submit" onSubmit={this.sendInvites}>Submit</button>
                          </form>
                        </div>
{/*                        <div id="listOfNames">
                          {
                              /*invited.length?
                              invited.map((nickname,ind) => {
                                  return (
                                         <button
                                              key={ind}
                                              onDelete={() => invited.splice(ind,1)}
                                              onClick={() =>{
                                                  if(!this.invitations.includes(nickname)) {
                                                      this.invitations.push(nickname.id)
                                                      invited.push(nickname)
                                                      // names = names.filter(each => {if(each.id!==nickname.id) return each })
                                                      // this.setState({invited, names})
                                                  }
                                              }}>
                                              {nickname}
                                          </button>
                                         )
                              })
                              names.length?
                              names.map((nickname,ind) => {
                               return !invited.includes(nickname)? (
                                      <div
                                          key={nickname.id}
                                          onClick={e =>{
                                            e.preventDefault()
                                              if(!this.invitations.includes(nickname.id)) {
                                                  this.invitations.push(nickname.id)
                                                  invited.push(nickname)
                                                  names = names.splice(ind,1)
                                                  this.setState({invited, names})
                                              }
                                          }}>
                                          {nickname.nickname}
                                      </div>
                                  ) :'No more users to invite'
                              })
                              :
                              <div> No one is online </div>
                          }
                        </div>*/}
                    </InviteForm>
                </div>
                <br />
                <div id="message-view">
                {
                    roomMessages.map((message, idx) => {
                        return (
                            <div key={idx}>
                                {Object.keys(message)[0]} - {Object.values(message)[0]}
                            </div>
                        )
                    })
                }
                </div>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="content"/>
                    <button type="submit"> Enter </button>
                </form>
            </div>
        )
    }
}

const mapState = state => {
    return {
        user: state.user,
        onlineUsers: state.onlineUsers,
        roomMessages: state.roomMessages
    }
}

const mapDispatch = dispatch => {
    return {
        postMessage(message) {
            dispatch(addMessage(message))
        }
    }
}

export default connect(mapState, mapDispatch)(RoomMessages)
