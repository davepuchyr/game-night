
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-konva'

class MyImage extends Component {
 constructor(props) {
   super(props)
   this.state = {
     image: null
   }
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

  render() {
    return (
      <Image
        image={this.state.image}
        x={300}
        y={400}
        draggable={true}
      />
    )
  }
}

export default MyImage