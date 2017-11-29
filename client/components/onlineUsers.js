import React from 'react'
import {connect} from 'react-redux'

const OnlineUsers = (props) => {
  const {users} = props
  return (
    <div className="item-lobby-onlineUsers">
      <h3>Players Online</h3>
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