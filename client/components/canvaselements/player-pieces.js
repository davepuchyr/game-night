import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Layer, Stage } from 'react-konva'
import HexPiece from './hex-piece'

class PlayerPieces extends React.Component {
    constructor() {
      super()
      this.state = {
        x: 500,
        y: 500,
        moving: false
      }

      this.handleMouseMove = this.handleMouseMove.bind(this)
      this.handleMouseDown = this.handleMouseDown.bind(this)
      this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    handleMouseMove(e) {
      if (this.state.moving) {
        this.setState({
          x: e.screenX, 
          y: e.screenY
        })
      }

    }

    handleMouseDown(e) {
      this.setState({
        moving: true
      })

    }

    handleMouseUp(e) {
      this.setState({
        moving: false
      })

    }

    render() {
      console.log(this.state.x, this.state.y, this.state.moving)
        return (
        <div 
            onMouseDown={this.handleMouseDown} 
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}>
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer width={window.innerWidth} height={window.innerHeight}>
               
               <HexPiece x={this.state.x} 
               y={this.state.y} 
               fill={'black'}
               />
            </Layer>
        </Stage>
        </div>
        );
    }
}

export default PlayerPieces