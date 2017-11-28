import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux"
import { Stage, Layer, Rect, Image, Group } from "react-konva";
import socket from '../../socket'

class Drawing extends Component {
  constructor(props){
    super(props)
    this.state = {
      isDrawing: false,
      mode: "brush",
      newDraw: []
    }
    this.draw = this.draw.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  componentDidMount() {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");

    this.setState({ canvas, context });
  }

  componentDidUpdate () {
    console.log("I RECEIVED PROPS IN COMPONENT WILL RECEIVE PROPS")
    this.props.draws.forEach(stroke => {
      console.log('I RECEIVED PROPS ', stroke)
      this.draw(stroke, false)
    })
  }

  handleMouseDown = () => {
    if (this.props.shift) this.setState({ isDrawing: true, newDraw: []});

    // TODO: improve
    const stage = this.image.parent.parent;
    this.lastPointerPosition = stage.getPointerPosition();
  };

  handleMouseUp = () => {
    socket.emit('new_draw', this.state.newDraw)
    this.setState({ isDrawing: false });
  };

  handleMouseMove = () => {
    // console.log('mousemove');
    let { context, isDrawing, mode } = this.state;

    if (isDrawing) {

      // TODO: Don't always get a new context
      if (mode === "brush") {
        context.globalCompositeOperation = "source-over";
      } else if (mode === "eraser") {
        context.globalCompositeOperation = "destination-out";
      }
      let stage = this.image.parent.parent;
      let firstPos = {
        x: this.lastPointerPosition.x - stage.x(),
        y: this.lastPointerPosition.y - stage.y()
      };
      let pos = stage.getPointerPosition();
      this.lastPointerPosition = pos;
      let secondPos = {
        x: pos.x - stage.x(),
        y: pos.y - stage.y()
      };
      this.draw({firstPos, secondPos}, true)
      this.setState({newDraw: [...this.state.newDraw, {firstPos, secondPos, room: this.props.roomId}]})
    }
  }

  draw (stroke) {
    let { context, mode } = this.state;
    const {firstPos, secondPos } = stroke
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(firstPos.x, firstPos.y);
    context.lineTo(secondPos.x, secondPos.y);
    context.closePath();
    context.stroke();
    this.image.getLayer().draw();
  }

  render() {
    const { canvas } = this.state;

    return (
      <Image
        image={canvas}
        ref={node => (this.image = node)}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
}

const mapState = state => {
  return {
    draws: state.draws
  }
}

export default connect(mapState)(Drawing)