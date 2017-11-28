import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Video, RoomMessages, MainStage, Drop }from './index'
import ReactDOM from 'react-dom'
import socket from '../socket'


class Room extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dieClicked: false
        }
    }

    componentDidMount(){
      document.getElementById('throw').addEventListener('click', () => {
          setTimeout(()=> {
            socket.emit('die_result', document.getElementById('label').innerHTML, document.getElementById('set').value, `/room/${this.props.routeProps.match.params.roomid}`, this.props.user.nickname)
          }, 4000)
      })
    }

    //helper function
    classShow(elements, isShow){
      isShow ? 
        Array.prototype.forEach.call(elements, el => el.className+=' show') : 
        Array.prototype.forEach.call(elements, el => el.className=el.className.replace( /(?:^|\s)show(?!\S)/g , '' ))
    }

    //roll die button clicked
    handleDieClick(e){
      //toggle show and not show dice module
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
      this.setState({ dieClicked: !this.state.dieClicked, rollCount: this.state.rollCount+1 })
    }

    render() {
        const path = this.props.routeProps.match.url
        return (
            <div id="room-container">
                <img id="trash-can" src="/trash.png" />
                <RoomMessages roomPath={path}/>
                <Drop />
                <button className="die-button" onClick={this.handleDieClick.bind(this)}>Roll Die</button>
                <img id="background-img" src="http://i.imgur.com/uhhfaMZ.png" />
                {/* <Video/> */}
                <MainStage rId={this.props.routeProps.match.params.roomid}/>
            </div>
        )
    }
}

export default Room