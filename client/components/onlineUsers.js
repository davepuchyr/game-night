import React from 'react'
import {connect} from 'react-redux'

const OnlineUsers = (props) => {
  const {users} = props
  return (
    <div className="container-main-lobby-bottom-comps-players-onlineUsers">
      {
        users && users.map((user, idx) => {
          return (
            <div className="container-main-lobby-bottom-comps-players-onlineUsers-users" key={idx}>
              <h3>{user.nickname}</h3>
            </div>
          )
        })
      }
    </div>
  )
}


const mapState = (state) => ({users: state.onlineUsers})

export default connect(mapState)(OnlineUsers)
