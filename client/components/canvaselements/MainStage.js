import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Layer, Stage, Image } from 'react-konva'
import HexPiece from './hex-piece'
import MyImage from './Image'
import GroupImage from './GroupImage'
import Drawing from './Drawing'


class MainStage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageUrl: 'http://i.imgur.com/uhhfaMZ.png',
      backgroundImage: null,
      shift: false,
      dragStart: [],
      dragOffSet: [0, 0],
      canvas: null,
      context: null
    }

    this.moveStageOnHover = this.moveStageOnHover.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
  }
  
  componentDidMount() {
    const image = new window.Image()
    image.src = this.state.imageUrl
    image.onload = () => {
      this.setState({
        backgroundImage: image
      })
    }
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    let canvas = this.refs.mainstage._stage.children[0].canvas._canvas
    let context = canvas.getContext("2d")
    this.setState({ canvas, context }, () => console.log("!!!!!!!!!", this.state.canvas))
  }

  handleKeyDown (e) {
      if (e.key === 'Shift') this.setState({shift: true})
  }

  handleKeyUp (e) {
    if (e.key === 'Shift') this.setState({shift: false})
  }

  moveStageOnHover(e) {
    document.body.style.cursor = 'move'

  }

  handleMouseOut () {
    document.body.style.cursor = 'default'
  }

  handleDragEnd (e) {
    let newX = this.state.dragStart[0] - e.evt.x
    let newY = this.state.dragStart[1] - e.evt.y
    this.setState({dragOffSet: [newX, newY]})
  }

  handleDragStart (e) {
    this.setState({dragStart: [e.evt.x, e.evt.y]})
  }


  render() {
    console.log(this.state)
    const { black, red, green, blue } = this.props.tokens
    const { images } = this.props
    const { rId } = this.props    

    return (
      <Stage 
        name="mainstage"
        ref="mainstage"
        width={window.innerWidth} 
        height={window.innerHeight}
        className="main-canvas"
        draggable={!this.state.shift}
        onDragEnd={this.handleDragEnd}
        onDragStart={this.handleDragStart}
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
          <Drawing
            shift={this.state.shift}
            offSet={this.state.dragOffSet}
            canvas={this.state.canvas}
            context={this.state.context}
          />
          <HexPiece id={rId} fill={'black'} x={black[0]} y={black[1]}/>
          <HexPiece id={rId} fill={'red'} x={red[0]} y={red[1]}/>
          <HexPiece id={rId} fill={'green'} x={green[0]} y={green[1]}/>
          <HexPiece id={rId} fill={'blue'} x={blue[0]} y={blue[1]}/>
          {
            images && images.map((imgObj, idx) => {
              if (imgObj.personal){
                
                return <MyImage
                x={imgObj.x}
                y={imgObj.y}
                width={imgObj.width}
                height={imgObj.height}
                imageUrl={imgObj.url}
                key={idx}
                personal={true}
                />
              }
              else return <GroupImage
              x={imgObj.x}
              y={imgObj.y}
              width={imgObj.width}
              height={imgObj.height}
              originalWidth={imgObj.originalWidth}
              originalHeight={imgObj.originalHeight}                
              imageUrl={imgObj.url}
              key={idx}
              personal={false}
              user={imgObj.user}
              entry={imgObj.entry}
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