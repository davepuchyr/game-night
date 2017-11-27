import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Video, RoomMessages, MainStage, Drop }from './index'
import ReactDOM from 'react-dom'
import Dice from './Dice'
// import PlayerPieces from './canvaselements/player-pieces'
import socket from '../socket'

class Room extends Component {
    constructor(props) {
        super(props)
        this.state = {
            opacity: false
        }
    }

    handleDieClick(e){
      ['dice', 'canvas'].forEach(el => {
        this.state.opacity ? 
          document.getElementById(el).className+=' hidden' :
          document.getElementById(el).className=document.getElementById(el).className.replace( /(?:^|\s)hidden(?!\S)/g , '' )
      })
      this.setState({ opacity: !this.state.opacity })
    }

    render () {
        const path = this.props.match.url
        return (
            <div id="room-container">
                <img id="trash-can" src="/trash.png" />
                <RoomMessages roomPath={path}/>
                <div className="dice-board" style={{opacity: !!this.state.opacity}}>
                {
                  this.state.opacity ?
                    <Dice/> :
                    null
                }
                </div>
                <Drop />
                <button 
                className="die-button"
                onClick={this.handleDieClick.bind(this)}
                >
                Roll Die
                </button>
                <img id="background-img" src="http://i.imgur.com/uhhfaMZ.png" />
                {/* <Video/> */}
                <MainStage rId={this.props.match.params.roomid}/>
            </div>
        )
    }
}

export default Room
