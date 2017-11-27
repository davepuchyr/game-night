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
      context: null,
      isDrawing: false,
      mode: "brush",
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
    // let stage = this.refs.mainstage
    let canvas = this.refs.mainstage._stage.children[0].canvas._canvas
    // let context = canvas.getContext("2d")
    // let canvas = document.createElement("canvas");
    // stage.add(canvas)
    // canvas.width = 300;
    // canvas.height = 300;
    let context = canvas.getContext("2d");

    this.setState({ canvas, context })
  }


  handleMouseDown = (e) => {
    console.log("mousedown!!!!!!!!!!!!!!!", e.target);
    if (this.state.shift){
        this.setState({ isDrawing: true });
    }

    // TODO: improve
    let stage = this.refs.mainstage._stage
    // const stage = this.refs.mainstage
    console.log("FROM e.target ", e.target)
    this.lastPointerPosition = stage.getPointerPosition();
    console.log("FROM lastPointerPosition ", this.lastPointerPosition)
    // this.lastPointerPosition.x = this.lastPointerPosition.x - this.props.offSet[0]
    // this.lastPointerPosition.y = this.lastPointerPosition.y - this.props.offSet[1]
  };

  handleMouseUp = () => {
    console.log("mouseup");
    this.setState({ isDrawing: false });
  };

  handleMouseMove = () => {
    // console.log('mousemove!!!!!!!', this);
    const { context, isDrawing, mode } = this.state;

    if (isDrawing) {
      // console.log("DRAW")
      // TODO: Don't always get a new context
      context.strokeStyle = "#df4b26";
      context.lineJoin = "round";
      context.lineWidth = 5;

      if (mode === "brush") {
        context.globalCompositeOperation = "source-over";
      } else if (mode === "eraser") {
        context.globalCompositeOperation = "destination-out";
      }
      context.beginPath();

      var localPos = {
        x: (this.lastPointerPosition.x),
        y: (this.lastPointerPosition.y)
      };
    //   console.log("moveTo", localPos);
      context.moveTo(localPos.x, localPos.y);

      // TODO: improve
      // const stage = this.image.parent.parent;
      let stage = this.refs.mainstage._stage

      var pos = stage.getPointerPosition();
      localPos = {
        x: (pos.x),
        y: (pos.y)
      };
    //   console.log("lineTo", localPos);
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      this.lastPointerPosition = pos;
      // console.log()
      this.refs.image.draw();
      console.log('!!!!!!!!!!!!!', this.refs.image.getLayer())
      // this.refs.mainstage._stage.children[0].canvas.getLayer().draw();
    }
  };

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
    const { canvas } = this.state;
    const { black, red, green, blue } = this.props.tokens
    const { images } = this.props
    const { rId } = this.props    

    return (
      <Stage
        image={canvas}
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
            ref="image"
            className="dragImg" name="background" 
            image={this.state.backgroundImage} 
            onMouseOver={this.moveStageOnHover}
            onMouseOut={this.handleMouseOut}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            />
          {/* <Drawing
            shift={this.state.shift}
            offSet={this.state.dragOffSet}
            canvas={this.state.canvas}
            context={this.state.context}
          /> */}
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
            {/* <Image
              image={canvas}
              ref={node => (this.image = node)}
              width={window.innerWidth}
              height={window.innerHeight}
              stroke={'blue'}
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              onMouseMove={this.handleMouseMove}
          /> */}
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