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
            opacity: false
        }
    }

    handleDieClick(e){

      function classShow(elements, isShow){
        if(isShow){
          Array.prototype.forEach.call(elements, el => el.className+=' show')
        } else {
          Array.prototype.forEach.call(elements, el => el.className=el.className.replace( /(?:^|\s)show(?!\S)/g , '' ))
        }
      }

      ['dice', 'canvas', 'center_field'].forEach(elem => { 
        let isClass = (elem === 'center_field') ? true : false
        if(!this.state.opacity){
          isClass ?
            classShow(document.getElementsByClassName(elem), true) :
            document.getElementById(elem).className+=' show'
        } else {
          isClass ? 
            classShow(document.getElementsByClassName(elem), false) :
            document.getElementById(elem).className=document.getElementById(elem).className.replace( /(?:^|\s)show(?!\S)/g , '' )
        }
      })

      this.setState({ opacity: !this.state.opacity })
    }

    render() {
        const path = this.props.match.url
        return (
            <div id="room-container">
                <img id="trash-can" src="/trash.png" />
                <RoomMessages roomPath={path}/>
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



{/* <div id="dice-container" class="svg" style="margin: 0">
<style type="text/css">@import "/main.css";</style>
<style type="text/css">@import "/dice.css";</style>   
<div id="info_div" style="display: none">
  <div class="center_field">
    <span id="label"></span>
  </div>
  <div class="center_field">
    <div class="bottom_field">
      <span id="labelhelp">click to continue or tap and drag again</span>
    </div>
  </div>
</div>
<div id="selector_div" style="display: none">
  <div class="center_field">
    <div id="sethelp">
    </div>
  </div>
  <div class="center_field">
    <input type="text" id="set" value="1d6"/><br/>
    <button id="clear">clear</button>
    <button style="margin-left: 0.6em" id="throw">throw</button>
  </div>
</div>
<div id="canvas" style="width: 200px; height: 200px;"></div>
</div> */}



// if(!!this.state.numClicks && !this.state.opacity){
//     console.log('Here')
//     const newCanvas = document.createElement('div')
//     newCanvas.id = 'canvas'
//     newCanvas.style.width = `${window.innerWidth - 1}px`
//     newCanvas.style.height = '200px'
//     document.getElementById('dice-container').appendChild(newCanvas)
// }