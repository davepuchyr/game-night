import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Lobby = (props) => {
  const {} = props

  return (
    <div>
      <h3>Welcome to the Lobby!</h3>
      <Link to='/messages'>
        <h2>Take me to Messages</h2>
      </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // email: state.user.email
  }
}

export default connect(mapState)(Lobby)

/**
 * PROP TYPES
 */
Lobby.propTypes = {
//   email: PropTypes.string
}
