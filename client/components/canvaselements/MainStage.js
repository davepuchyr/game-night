import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Layer, Stage, Image } from 'react-konva'
import { HexPiece, MyImage, GroupImage, Drawing } from '../index.js'


class MainStage extends React.Component {
  constructor(props) {
    super(props)

this.state = {
      imageUrl: 'http://i.imgur.com/uhhfaMZ.png',
      backgroundImage: null,
      shift: false,
      alt: false,
      dragStart: [],
      dragOffSet: [0, 0],
      canvas: null,
      context: null,
      isDrawing: false,
      mode: 'brush',
      backgroundHeight: 1911,
      backgroundWidth: 2196
    }

    this.moveStageOnHover = this.moveStageOnHover.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
  }
  
  componentDidMount() {
    const image = new window.Image()
    image.src = this.props.background.url
    image.onload = () => {
      this.setState({
        backgroundImage: image
      })
    }
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentDidUpdate() {
    if (this.props.background.url !== this.state.imageUrl){
      const image = new window.Image()
      const originalHeight = this.props.background.originalHeight
      const originalWidth = this.props.background.originalWidth
      const newSize = this.aspectRatio(originalHeight, originalWidth)
      const width = newSize[0]
      const height = newSize[1]
      image.src = this.props.background.url
      image.onload = () => {
        this.setState({
          backgroundImage: image,
          imageUrl: this.props.background.url,
          backgroundWidth: width,
          backgroundHeight: height,
        })
      }
    }
  }

  aspectRatio (originalHeight, originalWidth) {
    const originalRatio = (originalHeight / originalWidth)
    const windowWidth = 1680  
    const windowHeight = 1050
    let height = originalHeight
    let width = originalWidth
    if (originalHeight <= windowHeight) height = windowHeight
    if (originalWidth <= windowWidth) width = windowWidth
    const heightDifference =  height - originalHeight
    const widthDifference =  width - originalWidth
    if (heightDifference > 0 || widthDifference > 0) {
      if (widthDifference > heightDifference) {
        height = width * originalRatio
      } else {
        width = height / originalRatio
      }
    } else {
      const heightToWindowDifference = height - windowHeight
      const widthToWindowDifference = width - windowHeight
      if (heightToWindowDifference < widthToWindowDifference) {
        height = windowHeight
        width = height / originalRatio
      } else {
        width = windowWidth
        height = width * originalRatio
      }
    }
    return [width, height]
  }

  handleKeyDown(e) {
      if (e.key === 'Shift') this.setState({shift: true})
      if (e.key === 'Alt') this.setState({alt: true})
      
  }

  handleKeyUp(e) {
    if (e.key === 'Shift') this.setState({shift: false})
    if (e.key === 'Alt') this.setState({alt: false})    
  }

  moveStageOnHover(e) {
    document.body.style.cursor = 'move'

  }

  handleMouseOut() {
    document.body.style.cursor = 'default'
  }

  handleDragEnd(e) {
    let newX = 0 - e.evt.x
    let newY = 0 - e.evt.y
    this.setState({dragOffSet: [newX, newY]})
  }

  
  render() {
    const { canvas } = this.state;
    const { black, red, green, blue } = this.props.tokens
    const { images } = this.props
    const { rId } = this.props 

    return (
      <Stage
        image={canvas}
        name="mainstage"
        ref="mainstage"
        width={this.state.backgroundWidth} 
        height={this.state.backgroundHeight}
        className="main-canvas"
        draggable={!this.state.shift && !this.state.alt}
        onDragEnd={this.handleDragEnd}
        onDragStart={this.handleDragStart}
        onMouseDown={this.handleMouseDown}
        >
        <Layer 
          width={this.state.backgroundWidth} 
          height={this.state.backgroundHeight}
          >
          <Image 
            ref="image"
            className="dragImg" name="background" 
            image={this.state.backgroundImage}
            width={this.state.backgroundWidth}
            height={this.state.backgroundHeight}
            onMouseOver={this.moveStageOnHover}
            onMouseOut={this.handleMouseOut}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            />
          <Drawing
            shift={this.state.shift}
            alt={this.state.alt}
            roomId={rId}
            width={this.state.backgroundWidth}
            height={this.state.backgroundHeight}
            paintColor={this.props.paintColor}
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
              trashFloat={this.props.trashFloat}
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
    images: state.images,
    background: state.background
  }
}

export default connect(mapState)(MainStage)