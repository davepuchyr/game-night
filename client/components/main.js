import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, Switch, Route} from 'react-router-dom'
import {logout} from '../store'
import Lobby from './Lobby'
import Room from './Room'
import socket from '../socket'
import io from '../../server/socket'

const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props
  return (
    <div id="main" className="container">
      <nav className="container-nav">
        {
          isLoggedIn ?
            (
            <div>
              <h1 id="navbar">GAME NIGHT<a id="logout" href="/login" onClick={handleClick}>Logout</a></h1> 
             </div>
            ) :
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link><hr/>
            </div>
         }
      </nav>
      <div className="container-main">
        {children}
      </div>
    </div>
  )
}


const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Main))

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
