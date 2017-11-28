import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import { addImage } from '../store'

const CLOUDINARY_UPLOAD_PRESET = 'gamenight';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/gamenight/upload';

class Drop extends Component {
    constructor (props){
        super(props)
        // this.state = {
        //     uploadedFile: ''
        //   }
        this.onImageDrop = this.onImageDrop.bind(this)
        this.handleImageUpload = this.handleImageUpload.bind(this)
    }

    onImageDrop(files) {
        // this.setState({
        //   uploadedFile: files[0]
        // })
        this.handleImageUpload(files[0]);
    }
    
    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            // this.setState({
            //   uploadedFileCloudinaryUrl: response.body.secure_url
            // });
            this.props.newImage({x: 300, y: 400, personal: true, url: response.body.secure_url, width: response.body.width, height: response.body.height})
          }
        });
      }

    render () {
        const dropStyle = {
            "width": '5em',
            "height": '5em',
            "border-width": "2px",
            "border-color": "rgb(102, 102, 102)",
            "border-style": "dashed",
            "border-radius": "5px",
            "background-color": "rgba(255, 255, 255, 0.8)"
        }
        return (
                <div className="file-upload">
                    <Dropzone
                        name="personal"
                        multiple={false}
                        accept="image/*"
                        style={dropStyle}                        
                        onDrop={this.onImageDrop}>
                        Add Personal Image
                    </Dropzone>
                </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user
})

const mapDispatch = (dispatch) => {
    return {
        newImage: (image) => {
            dispatch(addImage(image))
        }
    }
}

export default connect(mapState, mapDispatch)(Drop)