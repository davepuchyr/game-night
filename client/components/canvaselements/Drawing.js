import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Stage, Layer, Rect, Image, Group } from 'react-konva';
import socket from '../../socket';

class Drawing extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDrawing: false,
      mode: 'brush',
      newDraw: [],
      drawsReceived: [],
      width: 0
    };
    this.draw = this.draw.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    const canvas = document.createElement('canvas');
    canvas.width = this.props.width || window.innerWidth;
    canvas.height = this.props.height || window.innerHeight;

    const context = canvas.getContext('2d');
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);

    this.setState({ canvas, context, width: this.props.width });
  }


  componentWillReceiveProps() {
    if (this.props.draws.length){
      this.draw(this.props.draws[this.props.draws.length-1]);
    }

    if (this.props.width !== this.state.width) {
      const canvas = document.createElement('canvas');
      canvas.width = this.props.width;
      canvas.height = this.props.height;

      const context = canvas.getContext('2d');
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('keyup', this.handleKeyUp);

      this.setState({ canvas, context, width: this.props.width });
    }
  }


  handleMouseDown = () => {
    if (this.props.shift || this.props.alt) this.setState({ isDrawing: true, newDraw: []});

    // TODO: improve
    const stage = this.image.parent.parent;
    this.lastPointerPosition = stage.getPointerPosition();
  }

  handleMouseUp = () => {
    this.setState({ isDrawing: false });
  }

  handleMouseMove = () => {
    let { context, isDrawing, mode } = this.state;

    if (isDrawing) {

      // TODO: Don't always get a new context
      // if (mode === "brush") {
      //   context.globalCompositeOperation = "source-over";
      // } else if (mode === "eraser") {
      //   context.globalCompositeOperation = "destination-out";
      // }
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

      let erase = this.props.alt;
      this.draw({firstPos, secondPos, erase, paintColor: this.props.paintColor});
      socket.emit('new_draw', {firstPos, secondPos, room: this.props.roomId, erase, paintColor: this.props.paintColor });
      // this.setState({newDraw: [...this.state.newDraw, {firstPos, secondPos, room: this.props.roomId}]})
    }
  }

  draw(stroke) {
    let { context } = this.state;
    const {firstPos, secondPos, erase, paintColor } = stroke;
    !erase ?
    context.globalCompositeOperation = 'source-over'
  :
    context.globalCompositeOperation = 'destination-out';

    context.strokeStyle = paintColor;
    context.lineJoin = 'round';
    context.lineWidth = erase ? 25 : 5;
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
        // width={this.props.width}
        // height={this.props.height}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
};

const mapState = state => {
  return {
    draws: state.draws
  };
};

export default connect(mapState)(Drawing);
