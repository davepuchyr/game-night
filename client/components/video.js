import React, { Component } from 'react'
import simplewebrtc from 'simplewebrtc'
import history from '../history'

class Video extends Component {

  constructor(props) {
    super(props);
    this.state = {
        users: {},
        openVideoSpace: []
    }
    this.addVideo = this.addVideo.bind(this)
    this.removeVideo = this.removeVideo.bind(this)
  }

  shouldComponentUpdate(){
    return false
 }

  addVideo (video, peer) {
    //copy current users object
    let currentUsersObj = Object.assign({}, this.state.users)    
    let userLocalIdx

    //check if there's an open space or assign the next space
    if (this.state.openVideoSpace.length) {
        let openVideoSpaceCopy = this.state.openVideoSpace.slice()
        userLocalIdx = openVideoSpaceCopy.shift()
        this.setState({openVideoSpace: openVideoSpaceCopy})
    } else if (currentUsersObj[peer.id]){
        userLocalIdx = currentUsersObj[peer.id]
    } else {
        userLocalIdx = Object.keys(this.state.users).length + 1;
    }

    //assign user to userobject and set it to state
    currentUsersObj[peer.id] = userLocalIdx
    this.setState({users: currentUsersObj})

    //create video element
    var remotes = document.getElementById('remotes')
    if (remotes) {
      var container = document.createElement('div')
      container.className = 'videoContainer'
      container.id = 'container_' + userLocalIdx
      container.appendChild(video)

      // suppress contextmenu
      video.oncontextmenu = function () { return false; }

      remotes.appendChild(container)
    }
  }

  removeVideo(video, peer) {
    //get the user's position
    const userLocalIdx = this.state.users[peer.id]

    //remove user from current user's object
    let currentUsersObj = Object.assign({}, this.state.users)
    delete currentUsersObj[peer.id]

    //add the space to the list of open spaces, sort and set state with new users object and new openspaces array
    let newOpenSpaces = [...this.state.openVideoSpace, userLocalIdx]
    newOpenSpaces.sort()
    this.setState({users: currentUsersObj, openVideoSpace: newOpenSpaces})

    var remotes = document.getElementById('remotes')
    var el = document.getElementById(peer ? 'container_' + userLocalIdx : 'localScreenContainer')
    if (remotes && el) {
      remotes.removeChild(el)
    }
  }


  render(props) {
    const webrtc = new simplewebrtc({
      localVideoEl: 'localVideo',
      remoteVideosEl: '',
      autoRequestMedia: true,
    })

    webrtc.on('readyToCall', () => {
      webrtc.joinRoom(history.location.pathname)
    })

    webrtc.on('videoAdded', (video, peer) => this.addVideo(video, peer))

    webrtc.on('videoRemoved', (video, peer) => this.removeVideo(video, peer))

    return (
      <div id="remotes">
        <video id="localVideo">
        </video>
      </div>
    )
  };
}

export default Video