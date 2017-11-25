import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Layer, Stage, Image } from 'react-konva'
import HexPiece from './hex-piece'
import MyImage from './Image'


class MainStage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageUrl: 'http://i.imgur.com/uhhfaMZ.png',
      backgroundImage: null
    }

    this.moveStageOnHover = this.moveStageOnHover.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }
  
  componentDidMount() {
    const image = new window.Image()
    image.src = this.state.imageUrl
    image.onload = () => {
      this.setState({
        backgroundImage: image
      })
    }
  }

  moveStageOnHover(e) {
    document.body.style.cursor = 'move'

  }
  
  handleMouseOut () {
    document.body.style.cursor = 'default'
  }


  render() {
    const { black, red, green, blue } = this.props.tokens
    const { images } = this.props
    const { rId } = this.props    
    return (
      <Stage 
        name="mainstage" 
        width={window.innerWidth} 
        height={window.innerHeight}
        draggable={true}
        >
        <Layer 
          width={window.innerWidth} 
          height={window.innerHeight}
          >
          <Image 
            className="dragImg" name="background" 
            image={this.state.backgroundImage} 
            onMouseOver={this.moveStageOnHover}
            onMouseOut={this.handleMouseOut}
            />
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
              key={idx} />
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