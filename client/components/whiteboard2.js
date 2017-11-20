import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import ReactDOM from 'react-dom'

import whiteboard, { draw } from '../whiteboard'
import socket from '../socket'

class Whiteboard2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: 'black',
            currentMousePosition: [],
            lastMousePosition: [],
            drawing: false,
            ctx: {}
        }
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)  
        this.getDraws = this.getDraws.bind(this)      
        this.draw = this.draw.bind(this)
    }

    handleMouseDown(e) {
        this.setState({currentMousePosition: [e.screenX, e.screenY], drawing: true})
    }

    handleMouseUp(e) {
        this.setState({drawing: false})
    }

    handleMouseMove(e){
        const lastMousePosition = this.state.currentMousePosition
        const currentMousePosition = [e.screenX, e.screenY]
        if (this.state.drawing){
            socket.emit('draw', lastMousePosition, currentMousePosition)
            this.draw(lastMousePosition, currentMousePosition)
            this.setState({currentMousePosition})
        }
    }

    draw(start, end) {
        // const canvas = this.refs.canvas
        // const ctx = canvas.getContext('2d')
        // ctx.lineWidth = 5
        // ctx.lineJoin = 'round';
        // ctx.lineCap = 'round';

        const ctx = this.state.ctx

        ctx.beginPath();
        ctx.strokeStyle = this.state.color;
        ctx.moveTo(...start);
        ctx.lineTo(...end);
        ctx.closePath();
        ctx.stroke();
        console.log('ran through draw function', ctx, start, end)
    }

    getDraws(draws) {
        this.props.draws.forEach(stroke => {
            const {start, end} = stroke
            this.draw(start, end)
        })
    }

    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas)
        const ctx = canvas.getContext('2d')
        ctx.lineWidth = 5
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        this.setState({ctx})
    }

    componentWillReceiveProps() {
        this.getDraws(this.props.draws)
    }


    render () {
        // console.log('i re-rendered', this.props.draws)
        return (
            <canvas
            id="canvas-container"
            ref="canvas"
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            >
            </canvas>
        )
    }
}

const mapState = state => ({draws: state.draws})



export default connect(mapState)(Whiteboard2)