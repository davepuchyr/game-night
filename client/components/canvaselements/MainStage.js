import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Layer, Stage } from 'react-konva'
import HexPiece from './hex-piece'
import MyImage from './Image'


class MainStage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { black, red, green, blue } = this.props.tokens
    const { images } = this.props
    const { rId } = this.props    
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer width={window.innerWidth} height={window.innerHeight}>
          <HexPiece id={rId} fill={'black'} x={black[0]} y={black[1]}/>
          <HexPiece id={rId} fill={'red'} x={red[0]} y={red[1]}/>
          <HexPiece id={rId} fill={'green'} x={green[0]} y={green[1]}/>
          <HexPiece id={rId} fill={'blue'} x={blue[0]} y={blue[1]}/>
          {
            images && images.map((imgObj, idx) => {
              return <MyImage
              x={imgObj.x}
              y={imgObj.y}
              width={imgObj.width}
              height={imgObj.height}
              imageUrl={imgObj.url}
              key={idx}
              />
            })
          }
        </Layer>
      </Stage>
    );
  }
}

const mapState = (state) => {
  return {
    tokens: state.tokens,
    images: state.images
  }
}

export default connect(mapState)(MainStage)