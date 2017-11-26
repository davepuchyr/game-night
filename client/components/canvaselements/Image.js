
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Image, Group, Circle } from 'react-konva'
import { updateImage, startDragging, stopDragging } from '../../store'
import socket from '../../socket'

class MyImage extends Component {
 constructor(props) {
   super(props)
   this.state = {
     image: null,
     dragging: false
   }
   this.handleDrag = this.handleDrag.bind(this)
   this.handleMouseOver = this.handleMouseOver.bind(this)
   this.handleMouseOut = this.handleMouseOut.bind(this)
   this.handleDrag = this.handleDrag.bind(this)
   this.handleMouseUp = this.handleMouseUp.bind(this)
   this.handleDragStart = this.handleDragStart.bind(this)
  }

  componentDidMount() {
    const image = new window.Image()
    image.src = this.props.imageUrl
    image.onload = () => {
      this.setState({
        image: image
      })
    }
  }

  handleDrag (e) {
    let activeAnchor = this.refs[e.target.attrs.name]
    let top_left = this.refs.top_left
    let top_right = this.refs.top_right
    let bottom_left = this.refs.bottom_left
    let bottom_right = this.refs.bottom_right
    let group = this.refs.group
    let image = this.refs.image
    
    let anchorX = activeAnchor.getX()
    let anchorY = activeAnchor.getY()

    switch (activeAnchor.getName()) {
      case 'top_left':
        top_right.setY(anchorY);
        bottom_left.setX(anchorX);
        break;
      case 'top_right':
        top_left.setY(anchorY);
        bottom_right.setX(anchorX);
        break;
      case 'bottom_right':
        bottom_left.setY(anchorY);
        top_right.setX(anchorX);
        break;
      case 'bottom_left':
        bottom_right.setY(anchorY);
        top_left.setX(anchorX);
        break;
    }

    image.position(top_left.position());
    
    var width = top_right.getX() - top_left.getX();
    var height = bottom_left.getY() - top_left.getY();
    if(width && height) {
        image.width(width);
        image.height(height);
    }
  }

  handleMouseOver (e) {
    if (e.target.attrs.name === 'top_right' || e.target.attrs.name === 'bottom_left'){
      document.body.style.cursor = 'nesw-resize'
    } else if (e.target.attrs.name === 'top_left' || e.target.attrs.name === 'bottom_right'){
      document.body.style.cursor = 'nwse-resize'
    } else {
      document.body.style.cursor = 'pointer'
    }
  }

  handleMouseOut () {
    document.body.style.cursor = 'default'
  }

  handleMouseUp () {
    this.props.stopDrag()
    this.setState({dragging: false})
    let x = this.refs.top_left.getX()
    let y = this.refs.top_left.getY()
    let url = this.refs.image.attrs.image.src
    let height = this.refs.image.attrs.height || this.refs.image.attrs.image.height
    let width = this.refs.image.attrs.width || this.refs.image.attrs.image.width

    let image = {
      x, y, url, width, height, personal: this.props.personal
    }
    if (this.props.user) {
      image.user = this.props.user
      image.entry = false
    }
    this.props.sendNewImage(image)
  }

  handleDragStart () {
    const url = this.props.imageUrl
    this.setState({dragging: true})
    if (this.state.dragging) this.props.startDrag(url)
  }


  render() {
    return (
      <Group
        draggable={true}
        ref='group'
        onMouseDown={this.handleDragStart}
        onDragEnd={this.handleMouseUp}
      >
        <Image
          ref="image"
          image={this.state.image}
          x={this.props.x}
          y={this.props.y}
          draggable={false}
        />
        <Circle
          ref="top_left"
          name="top_left"
          x={this.props.x}
          y={this.props.y}
          opacity={0}
          radius={0}
          draggable={true}
          dragOnTop={false}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onDragMove={this.handleDrag}
        />
        <Circle
          ref="top_right"
          name="top_right"
          x={this.props.x + this.props.width}
          y={this.props.y}
          opacity={0}
          radius={0}
          draggable={true}
          dragOnTop={false}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onDragMove={this.handleDrag}
          />
        <Circle
          ref="bottom_left"
          name="bottom_left"
          x={this.props.x}
          y={this.props.y + this.props.height}
          opacity={0}
          radius={0}
          draggable={true}
          dragOnTop={false}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onDragMove={this.handleDrag}
          />
        <Circle
          ref="bottom_right"
          name="bottom_right"
          x={this.props.x + this.props.width}
          y={this.props.y + this.props.height}
          opacity={0}
          radius={8}
          draggable={true}
          dragOnTop={false}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onDragMove={this.handleDrag}
          />
      </Group>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    sendNewImage: (image) => {
      dispatch(updateImage(image))
    },
    startDrag: (url) => {
      dispatch(startDragging(url))
    },
    stopDrag: () => {
      dispatch(stopDragging())
    }
  }
}


export default connect(null, mapDispatch)(MyImage)