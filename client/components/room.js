import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Video, RoomMessages, MainStage, Drop }from './index'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { deleteImage } from '../store'
 
// import PlayerPieces from './canvaselements/player-pieces'
import socket from '../socket'

class Room extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trashFloat: false,
            delete: false,
            toDelete: ''
        }
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    handleMouseOver() {
        this.setState({trashFloat: true})
        if (this.props.dragging.bool) this.setState({delete: true, toDelete: this.props.dragging.url})
    }
    
    handleMouseLeave() {
        this.setState({trashFloat: false, delete: false, toDelete: ''})
    }

    handleMouseUp() {
        this.props.delete(this.state.toDelete)
    }

    render () {
        const path = this.props.match.url
        let trashCheck = false
        if (this.state.trashFloat && this.props.dragging.bool) {
            trashCheck = true
        }
        return (
            <div id="room-container">
                <img
                  id="trash-can"
                  src={trashCheck ? "/redtrash.png" : "/trash.png"}
                  onMouseOver={this.handleMouseOver}
                  onMouseLeave={this.handleMouseLeave}
                  onMouseUp={this.state.delete ? this.handleMouseUp : null}
                />
                <RoomMessages roomPath={path}/>
                <Drop />
                <img src="http://i.imgur.com/uhhfaMZ.png" />
                {/* <Video/> */}
                <MainStage rId={this.props.match.params.roomid}/>
                {/* <PlayerPieces  /> */}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      dragging: state.trash
    }
}

const mapDispatch = dispatch => {
    return {
        delete: (imageUrl) => {
            dispatch(deleteImage(imageUrl))
        }
    }
}

export default connect(mapState, mapDispatch)(Room)
  