import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Video, RoomMessages, MainStage, Drop }from './index'
import ReactDOM from 'react-dom'

class Room extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        const path = this.props.match.url
        return (
            <div id="room-container">
                <RoomMessages roomPath={path}/>
                <Drop />
                <img src="http://i.imgur.com/uhhfaMZ.png" />
                {/* <Video/> */}
                <MainStage />
            </div>
        )
    }
}

export default Room