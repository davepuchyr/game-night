import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Video from './video'
import whiteboard, { draw } from '../whiteboard'
import { Layer, Rect, Stage, Group, Circle, Star } from 'react-konva'
import ReactDOM from 'react-dom'
import PlayerPieces from './canvaselements/player-pieces'

class Room extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div id="room-container">
                <Video/>
                <PlayerPieces />
                <div id="hex-container">
                <img src="http://i.imgur.com/uhhfaMZ.png" />
                </div>
            </div>
        )
    }
}

export default Room