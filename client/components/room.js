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
            <div>
                this is a room!
            </div>
        )
    }
}

export default Room