import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Star } from 'react-konva'
import socket from '../../socket'
import { move_black, move_red, move_green, move_blue } from '../../store' 


class HexPiece extends Component {
    constructor(props){
      super(props)
      this.drag = this.drag.bind(this)
    }

    drag(e) {
      const newCoords = [e.target.attrs.x, e.target.attrs.y]
      const color = e.target.attrs.fill

      this.props.move_token(newCoords, color)
      socket.emit('move_token', newCoords, color, this.props.id)
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
          dispatch(move_black(newCoords))
          break
        case 'red':
          dispatch(move_red(newCoords))
          break
        case 'green':
          dispatch(move_green(newCoords))
          break
        case 'blue':
          dispatch(move_blue(newCoords))
          break;
      }
    }
  }
}

export default connect(mapState, mapDispatch)(HexPiece)
