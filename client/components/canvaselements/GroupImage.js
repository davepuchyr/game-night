
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


  render() {
    return (
      <Group>
        <Image
          image={this.state.image}
          x={this.props.x}
          y={this.props.y}
          width={this.props.width}
          height={this.props.height}
          draggable={false}
          onClick={this.handleClick}
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
              draggable={false}
            />
          )
          :
          null
        }
      </Group>
    )
  }
}


export default GroupImage