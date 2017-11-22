import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Layer, Stage } from 'react-konva'
import HexPiece from './hex-piece'

class PlayerPieces extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { black, red, green, blue } = this.props.tokens
    const { rId } = this.props

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer width={window.innerWidth} height={window.innerHeight}>
          <HexPiece fill={'black'} x={black[0]} y={black[1]} id={rId}/>
          <HexPiece fill={'red'} x={red[0]} y={red[1]} id={rId}/>
          <HexPiece fill={'green'} x={green[0]} y={green[1]} id={rId}/>
          <HexPiece fill={'blue'} x={blue[0]} y={blue[1]} id={rId}/>
        </Layer>
      </Stage>
    );
  }
}

const mapState = (state) => {
  return {
    tokens: state.tokens
  }
}

export default connect(mapState)(PlayerPieces)