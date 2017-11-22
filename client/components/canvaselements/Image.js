
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-konva'

class MyImage extends Component {
 constructor() {
   super()
   this.state = {
     image: null
   }
  }

  componentDidMount() {
    const image = new window.Image()
    image.src = 'https://i.imgur.com/FktQTMl.png'
    image.onload = () => {
      this.setState({
        image: image
      })
    }
  }

  render() {
    return (
      <Image
        image={this.state.image}
        x={300}
        y={400}
        width={400}
        height={550}
        draggable={true}
      />
    )
  }
}

export default MyImage