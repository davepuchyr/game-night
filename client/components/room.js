import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Video from './video'
import RoomMessages from './room-messages'
import whiteboard, { draw } from '../whiteboard'
import { Layer, Rect, Stage, Group, Circle, Star } from 'react-konva'
import ReactDOM from 'react-dom'
import PlayerPieces from './canvaselements/player-pieces'
import socket from '../socket'

class Room extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        const path = this.props.match.url
        return (
            <div id="room-container">
                <RoomMessages roomPath={path}/>
                <img src="http://i.imgur.com/uhhfaMZ.png" />
                {/* <Video/> */}
                <PlayerPieces rId={this.props.match.params.roomid} />
            </div>
        )
    }
}

export default Room
