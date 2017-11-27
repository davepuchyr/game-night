import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Image, Group } from "react-konva";

class Drawing extends Component {
  state = {
    isDrawing: false,
    mode: "brush",
  };

  componentDidMount () {
    let canvas = document.createElement("canvas");
    // canvas.width = 300;
    // canvas.height = 300;
    // let context = canvas.getContext("2d");



    this.setState({ canvas });
  }

  componentWillReceiveProps () {
    // let canvas = this.props.canvas
    let context = this.props.context
    console.log('CONTEXT IS ', context)
    this.setState({ context });
  }


  handleMouseDown = (e) => {
    console.log("mousedown!!!!!!!!!!!!!!!", e.target);
    if (this.props.shift){
        this.setState({ isDrawing: true });
    }

    // TODO: improve
    const stage = this.image.parent.parent;
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
    // console.log('mousemove');
    const { context, isDrawing, mode } = this.state;

    if (isDrawing) {

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
        x: (this.lastPointerPosition.x - this.image.x()),
        y: (this.lastPointerPosition.y - this.image.y())
      };
    //   console.log("moveTo", localPos);
      context.moveTo(localPos.x, localPos.y);

      // TODO: improve
      const stage = this.image.parent.parent;

      var pos = stage.getPointerPosition();
      localPos = {
        x: (pos.x - this.image.x()),
        y: (pos.y - this.image.y())
      };
    //   console.log("lineTo", localPos);
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      this.lastPointerPosition = pos;
      this.image.getLayer().draw();
    }
  };

  render() {
    const { canvas } = this.state;
    console.log("canvas", canvas);

    return (
      <Image
        image={canvas}
        ref={node => (this.image = node)}
        width={window.innerWidth}
        height={window.innerHeight}
        stroke={'blue'}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
}

export default Drawing