import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link, Switch, Route } from 'react-router-dom'
import { logout } from '../store'
import { Lobby, Room } from './index.js'
import socket from '../socket'
import io from '../../server/socket'

const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props
  return (
    <div id="main" className="container">
      <div className="container-main">
        { children }
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
