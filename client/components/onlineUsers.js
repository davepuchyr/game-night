import React from 'react'
import {connect} from 'react-redux'

const OnlineUsers = (props) => {
  const {users} = props
  return (
    <div className="item-lobby-onlineUsers">
        <h2>Users Online: </h2>
        {
          users && users.map((user, idx) => {
            return (
              <div key={idx}>{user.nickname}</div>
            )
          })
        }
    </div>

  )
}

const mapState = (state) => ({users: state.onlineUsers})

export default connect(mapState)(OnlineUsers)