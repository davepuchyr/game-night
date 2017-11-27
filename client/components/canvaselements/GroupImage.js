
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Image, Group, Circle, Layer } from 'react-konva'
import { updateImage, startDragging, stopDragging } from '../../store'
import socket from '../../socket'

class GroupImage extends Component {
 constructor(props) {
   super(props)
   this.state = {
     image: null,
     showBig: false
   }
   this.handleClick = this.handleClick.bind(this)
   this.handleDragEnd = this.handleDragEnd.bind(this)
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

  handleClick (e) {
    this.state.showBig ? 
    this.setState({showBig: false})
    :
    this.setState({showBig: true})
  }

  handleDragEnd (e) {
    let konvaImg = e.target
    let x = konvaImg.attrs.x
    let y = konvaImg.attrs.y
    let url = konvaImg.attrs.image.src
    let height = konvaImg.attrs.height
    let width = konvaImg.attrs.width
    let originalWidth = this.props.originalWidth
    let originalHeight = this.props.originalHeight
    let image = {
      x,
      y,
      url,
      width,
      height,
      originalWidth,
      originalHeight,
      personal: false
    }
    this.props.moveImage(image)
  }


  render() {
    return (
      <Group>
        <Image
          image={this.state.image}
          x={this.props.x}
          y={this.props.y}
          width={this.props.width}
          height={this.props.height}
          draggable={true}
          onClick={this.handleClick}
          onDragEnd={this.handleDragEnd}
        />
        {
          this.state.showBig ? 
          (
            <Image
              image={this.state.image}
              x={(Math.floor(window.innerWidth/2)) - (Math.floor(this.props.originalWidth/2))}
              y={100}
              width={this.props.originalWidth}
              height={this.props.originalHeight}
              draggable={true}
              onClick={this.handleClick}
            />
          )
          :
          null
        }
      </Group>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    moveImage: (image) => {
      dispatch(updateImage(image))
    }
  }
}


export default connect(null, mapDispatch)(GroupImage)