import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Video, RoomMessages, MainStage, Drop, DropGroup }from './index'
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
            toDelete: '',
            group: false
        }
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    handleMouseOver() {
        this.setState({trashFloat: true})
        if (this.props.dragging.bool) this.setState({delete: true, toDelete: this.props.dragging.url, group: !this.props.dragging.personal})
    }
    
    handleMouseLeave() {
        this.setState({trashFloat: false, delete: false, toDelete: '', group: false})
    }

    handleMouseUp() {
        this.props.delete(this.state.toDelete, this.state.group, this.props.match.params.roomid)
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
<<<<<<< HEAD
                <div className="drop-group-container">
                <DropGroup
                    className="group-dropzone"
                    rId={this.props.match.params.roomid}
                />
                </div>
                <img src="http://i.imgur.com/uhhfaMZ.png" />
=======
                {/* <img id="background-img" src="http://i.imgur.com/uhhfaMZ.png" /> */}
>>>>>>> 12c990a9fb78652755cb743aece41eec37da60b5
                {/* <Video/> */}
                <MainStage rId={this.props.match.params.roomid}/>
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
        delete: (imageUrl, group, rId) => {
            if (group) {
                socket.emit('delete_group_image', imageUrl, rId)
            }
            dispatch(deleteImage(imageUrl))
        }
    }
}

export default connect(mapState, mapDispatch)(Room)
  