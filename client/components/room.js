import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Video, RoomMessages, MainStage, Drop }from './index'
import ReactDOM from 'react-dom'

// import PlayerPieces from './canvaselements/player-pieces'
import socket from '../socket'

class Room extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        const path = this.props.match.url
        return (
            <div id="room-container">
                <img id="trash-can" src="/trash.png" />
                <RoomMessages roomPath={path}/>
                <Drop />
                {/* <img id="background-img" src="http://i.imgur.com/uhhfaMZ.png" /> */}
                {/* <Video/> */}
                <MainStage rId={this.props.match.params.roomid}/>
            </div>
        )
    }
}

export default Room
