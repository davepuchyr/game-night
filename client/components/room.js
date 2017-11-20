import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'


import whiteboard, { draw } from '../whiteboard'


class Room extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div id="room-container">
                <div id="hex-container">
                <img src="http://i.imgur.com/uhhfaMZ.png" />
                </div>
            </div>
        )
    }
}

export default Room