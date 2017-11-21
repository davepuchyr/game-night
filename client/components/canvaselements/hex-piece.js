import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Star } from 'react-konva'
import socket from '../../socket'
import { moveBlack, moveRed, moveGreen, moveBlue } from '../../store' 


class HexPiece extends Component {
    constructor(props){
      super(props)

      this.drag = this.drag.bind(this)
    }

    drag(e) {
      const newCoords = [e.target.attrs.x, e.target.attrs.y]
      const color = e.target.attrs.fill

      this.props.move_token(newCoords, color)
      socket.emit('move_token', newCoords, color)
    }

      render(){
        return (
          <Star
          x={this.props.x}
          y={this.props.y}
          numPoints={6}
          innerRadius={43}
          outerRadius={50}
          fill={this.props.fill}
          opacity={0.8}
          draggable={true}
          onDragEnd={this.drag}
          rotation={0}
          shadowColor={'black'}
          shadowBlur={10}
          shadowOpacity={0.6}
        />)
      }
}

const mapState = (state) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return {
    move_token(newCoords, color) {
      switch(color){
        case 'black':
          dispatch(moveBlack(newCoords))
          break
        case 'red':
          dispatch(moveRed(newCoords))
          break
        case 'green':
          dispatch(moveGreen(newCoords))
          break
        case 'blue':
          dispatch(moveBlue(newCoords))
          break;
      }
    }
  }
}

export default connect(mapState, mapDispatch)(HexPiece)
