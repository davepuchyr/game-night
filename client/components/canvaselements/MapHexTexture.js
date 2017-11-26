import React, {Component} from 'react'
import { connect } from 'react-redux'
import { RegularPolygon, } from 'react-konva'
import socket from '../../socket'
// import { move_black, move_red, move_green, move_blue } from '../../store' 


class MapHexTexture extends Component {
    constructor(props){
      super(props)
      this.drag = this.drag.bind(this)

      this.state = {
        images: {},
        sources: {
          evergreen: '/evergreen.png',
          evergreenhills: '/evergreenhills.png'
        }
      }
      this.loadImages = this.loadImages.bind(this)
    }

    componentDidMount() {
      this.loadImages(this.state.sources, () => console.log('images loaded'))
    }

    loadImages(sources, callback) {
      const imgSources = this.state.sources;

      const images = {}
      let loadedImages = 0;
      let numImages = 0;
      // get num of sources
      for(const src in imgSources) {
          numImages++;
      }
      for(let src in imgSources) {
          images[src] = new Image();
          images[src].onload = function(images) {
              if(++loadedImages >= numImages) {
                  callback(images);
              }
          };
          images[src].height = 50
          images[src].width = 50
          images[src].src = imgSources[src]
      }

      this.setState({ images })
      console.log(images)
  }

    drag(e) {
      const newCoords = [e.target.attrs.x, e.target.attrs.y]
      const color = e.target.attrs.fill || e.target.attrs.fillPatternImage

      this.props.move_token(newCoords, color)
      socket.emit('move_token', newCoords, color, this.props.id)
    }

      render(){
        
        return (
          <RegularPolygon
          x={300}
          y={400}
          sides={6}
          radius={50}
          fillPatternImage ={this.state.images.evergreen}
          fillPatternScale= {1}
          // image ={this.state.images.evergreen}
          // fill={this.props.fill}
          fillPatternOffset={{x: -25, y: 25}}
          draggable={true}
          onDragEnd={this.drag}
          rotation={0}
          stroke={'black'}
          strokeWidth={1}
        />
        )
      }
}

// const mapState = (state) => {
//   return {}
// }

// const mapDispatch = (dispatch) => {
//   return {
//     move_token(newCoords, color) {
//       switch(color){
//         case 'black':
//           dispatch(move_black(newCoords))
//           break
//         case 'red':
//           dispatch(move_red(newCoords))
//           break
//         case 'green':
//           dispatch(move_green(newCoords))
//           break
//         case 'blue':
//           dispatch(move_blue(newCoords))
//           break;
//       }
//     }
//   }
// }

export default MapHexTexture