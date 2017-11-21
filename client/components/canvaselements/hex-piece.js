import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Star } from 'react-konva'
import socket from '../../socket'
import { moveTokens } from '../../store' 


class HexPiece extends Component {
    constructor(props){
      super(props)

      this.drag = this.drag.bind(this)
    }

    drag(e) {
      const newCoords = [e.target.attrs.x, e.target.attrs.y]
      this.props.player1_new_token(newCoords)
      socket.emit('move_player1', newCoords)
    }

      render(){
        console.log(this.props)
        return (
          <Star
          x={this.props.coords[0]}
          y={this.props.coords[1]}
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
  return {
    coords: state.tokens.player1
  }
}

const mapDispatch = (dispatch) => {
  return {
    player1_new_token(newCoords) {
      dispatch(moveTokens(newCoords))
    }
  }
}

export default connect(mapState, mapDispatch)(HexPiece)
