import React from 'react'
import {connect} from 'react-redux'

const OnlineUsers = (props) => {
  const {users} = props
  console.log(users)
  return (
    <div>
      <div>
        <h4>Users Online: </h4>
        {
          users && users.map((user, idx) => {
            return (
              <div key={idx}>{user.nickname}</div>
            )
          })
        }
      </div>
    </div>

  )
}

const mapState = (state) => ({users: state.onlineUsers})

export default connect(mapState)(OnlineUsers)