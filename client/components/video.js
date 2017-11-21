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

 addVideo (video, peer) {
    console.log('video added', peer);
    //copy current users object
    let currentUsersObj = Object.assign({}, this.state.users)    
    let userLocalIdx

    //check if there's an open space or assign the next space
    if (this.state.openVideoSpace.length) {
        let openVideoSpaceCopy = this.state.openVideoSpace.slice()
        console.log(openVideoSpaceCopy)
        userLocalIdx = openVideoSpaceCopy.shift()
        console.log(openVideoSpaceCopy)        
        this.setState({openVideoSpace: openVideoSpaceCopy})
    } else if (currentUsersObj[peer.id]){
        userLocalIdx = currentUsersObj[peer.id]
    } else {
        userLocalIdx = Object.keys(this.state.users).length + 1;
    }

    //assign user to userobject and set it to state
    currentUsersObj[peer.id] = userLocalIdx
    this.setState({users: currentUsersObj})

    console.log('current user object is ', currentUsersObj)
    //create video element
    var remotes = document.getElementById('remotes');
    if (remotes) {
        var container = document.createElement('div');
        container.className = 'videoContainer';
        container.id = 'container_' + userLocalIdx;
        container.appendChild(video);

        // suppress contextmenu
        video.oncontextmenu = function () { return false; };

        remotes.appendChild(container);
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


    console.log('video removed ', peer);
    console.log('current user object is ', currentUsersObj)
    var remotes = document.getElementById('remotes');
    var el = document.getElementById(peer ? 'container_' + userLocalIdx : 'localScreenContainer');
    if (remotes && el) {
        remotes.removeChild(el);
    }
}

 render(props) {
    //instantiate webrtc
    const webrtc = new simplewebrtc({
        localVideoEl: 'localVideo',
        remoteVideosEl: '',
        autoRequestMedia: true,
    });

    //join room
    webrtc.on('readyToCall', () => {
        webrtc.joinRoom(history.location.pathname)
    });

    //addvideo
    webrtc.on('videoAdded', (video, peer) => this.addVideo(video, peer));

    //remove video
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