import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Video, RoomMessages, MainStage, Drop, DropGroup }from './index'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { deleteImage } from '../store'
import socket from '../socket'


class Room extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trashFloat: false,
            delete: false,
            toDelete: '',
            group: false,
            dieClicked: false
        }
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    //helper function
    classShow(elements, isShow){
      isShow ? 
        Array.prototype.forEach.call(elements, el => el.className+=' show') : 
        Array.prototype.forEach.call(elements, el => el.className=el.className.replace( /(?:^|\s)show(?!\S)/g , '' ))
    }

    componentDidMount(){
      document.getElementById('throw').addEventListener('click', () => {
        setTimeout(()=> {
          socket.emit('die_result', document.getElementById('label').innerHTML, document.getElementById('set').value, `/room/${this.props.routeProps.match.params.roomid}`, this.props.user.nickname)
        }, 4000)
      })
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

    handleDieClick(e){
      ['dice', 'canvas', 'center_field'].forEach(elem => { 
        let isClass = (elem === 'center_field') ? true : false
        if(!this.state.dieClicked){
          isClass ?
            this.classShow(document.getElementsByClassName(elem), true) :
            document.getElementById(elem).className+=' show'

        } else {
          isClass ? 
            this.classShow(document.getElementsByClassName(elem), false) :
            document.getElementById(elem).className=document.getElementById(elem).className.replace( /(?:^|\s)show(?!\S)/g , '' )
        }
      })
      this.setState({ dieClicked: !this.state.dieClicked })
    }

    render() {
        const path = this.props.routeProps.match.url
        let trashCheck = false
        if (this.state.trashFloat && this.props.dragging.bool) {
            trashCheck = true
        }
        return (
            <div id="room-container">
                <img
                  id="trash-can"
                  src={trashCheck ? '/redtrash.png' : '/trash.png'}
                  onMouseOver={this.handleMouseOver}
                  onMouseLeave={this.handleMouseLeave}
                  onMouseUp={this.state.delete ? this.handleMouseUp : null}
                />
                <RoomMessages roomPath={path}/>
                <Drop />
                <div className="drop-group-container">
                <DropGroup
                  className="group-dropzone"
                  rId={this.props.routeProps.match.params.roomid}
                />
                </div>
                {/* <img src="http://i.imgur.com/uhhfaMZ.png" /> */}
                <button className="die-button" onClick={this.handleDieClick.bind(this)}>Roll Die</button>
                {/* <img id="background-img" src="http://i.imgur.com/uhhfaMZ.png" /> */}
                {/* <Video/> */}
                <MainStage rId={this.props.routeProps.match.params.roomid}/>
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