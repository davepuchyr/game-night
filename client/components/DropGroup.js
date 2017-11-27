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
            const image = {
                x: 300,
                y: 400,
                personal: false,
                url: response.body.secure_url,
                width: 15,
                height: 15,
                originalWidth: response.body.width,
                originalHeight: response.body.height,
                room: this.props.rId,
                user: this.props.user.nickname
            }
            socket.emit('new_group_image', image)
          }
        });
      }

    render () {
        // const dropStyle = {
        //     width: '20%'
        // }
        return (
                <div className="FileUpload">
                    <Dropzone
                        name="personal"
                        multiple={false}
                        accept="image/*"
                        // style={dropStyle}
                        onDrop={this.onImageDrop}>
                        <p>Add to all players' gameboard</p>
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