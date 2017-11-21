import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Video from './video'
import whiteboard, { draw } from '../whiteboard'
import { Layer, Rect, Stage, Group, Circle, Star } from 'react-konva'
import ReactDOM from 'react-dom'


class ResizeRect extends React.Component {
    changeSizeUp() {
        const rect = this.refs.rect;

        // to() is a method of `Konva.Node` instances
        rect.to({
            scaleX: 3,
            scaleY: 3,
            duration: 0.2
        });
    }
    changeSizeDown() {
        const rect = this.refs.rect;

        // to() is a method of `Konva.Node` instances
        rect.to({
            scaleX: 1,
            scaleY: 1,
            duration: 0.2
        });
    }
    render() {
        return (
            <Group>
                <Rect
                    x={300}
                    y={300}
                    ref="rect"
                    width={50}
                    height={50}
                    draggable={true}
                    fill={'black'}
                    onDragEnd={this.changeSizeDown.bind(this)}
                    onDragStart={this.changeSizeUp.bind(this)}
                />
          </Group>
        );
    }
}

class MyStar extends Component {
    state = { 
    color: 'green', 
    scale: 1
};

handleClick = () => {
    // window.Konva is a global variable for Konva framework namespace
    this.setState({
    color: window.Konva.Util.getRandomColor()
    });
}
    render() {
        return (
            <Star
            x={500}
            y={500}
            numPoints={6}
            innerRadius={43}
            outerRadius={50}
            fill={this.props.fill}
            opacity={0.8}
            draggable={true}
            rotation={0}
            shadowColor={'black'}
            shadowBlur={10}
            shadowOpacity={0.6}
            // custom attribute
        />
        )
    }
}

class App extends React.Component {
    render() {
        return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer width={window.innerWidth} height={window.innerHeight}>
            <MyStar fill={'black'}/>
            <MyStar fill={'green'} />
            <MyStar fill={'red'} />
            <MyStar fill={'blue'} />
            {/* <MyStar />
            <MyStar />
            <MyStar /> */}
            <ResizeRect />
            </Layer>
        </Stage>
        );
    }
}

class Room extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div id="room-container">
                <Video/>
                <App />
                <div id="hex-container">
                <img src="http://i.imgur.com/uhhfaMZ.png" />
                </div>
            </div>
        )
    }
}

export default Room