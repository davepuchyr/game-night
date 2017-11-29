import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import request from 'superagent';
import { addImage } from '../store'
import socket from '../socket'

const CLOUDINARY_UPLOAD_PRESET = 'gamenight';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/gamenight/upload';

class DropGroup extends Component {
    constructor (props){
        super(props)
        this.state = {
            hover: false
          }
        this.onImageDrop = this.onImageDrop.bind(this)
        this.handleImageUpload = this.handleImageUpload.bind(this)
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
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
            const image = {
                x: 300,
                y: 400,
                personal: false,
                url: response.body.secure_url,
                width: 45,
                height: 45,
                originalWidth: response.body.width,
                originalHeight: response.body.height,
                room: this.props.rId,
                user: this.props.user.nickname
            }
            socket.emit('new_group_image', image)
          }
        });
      }
    
    handleMouseOver () {
        this.setState({hover: true})
    }

    handleMouseLeave () {
        this.setState({hover: false})
    }

    render () {
        const dropStyle = {
            "position": "absolute",
            "bottom": "0",
            "width": "4em",
            "height": "4em",
            "z-index": "11",
            "margin": "0.4em"
        }
        return (
                <div className="file-upload-group">
                    <img
                        src={this.state.hover ? "/assets/broadcast_image_icon_mix.png" : "/assets/broadcast_image_icon.png"}
                    />
                    <Dropzone
                        name="personal"
                        multiple={false}
                        accept="image/*"
                        style={dropStyle}
                        onDrop={this.onImageDrop}
                        onMouseOver={this.handleMouseOver}
                        onMouseLeave={this.handleMouseLeave}
                    >
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
        newImage: (image, rId, userId) => {
            dispatch(addImage(image))
        }
    }
}

export default connect(mapState, mapDispatch)(DropGroup)