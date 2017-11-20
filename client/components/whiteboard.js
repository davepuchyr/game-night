import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'


import whiteboard, { draw } from '../whiteboard'


class Whiteboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: 'black',
            mousePositionX: 0,
            mousePositionY: 0,
            startDraw: [],
            drawing: false,
            ctx: {}
        }
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.draw = this.draw.bind(this)
    }

    handleMouseMove(e) {
        // this.setState({mousePositionX: e.screenX, mousePositionY: e.screenY})
        const currentPosition = this.state.startDraw

        if(this.state.drawing){
            this.draw(currentPosition, [e.screenX, e.screenY])
        }
    }

    handleMouseDown(e) {
        this.setState({startDraw: [e.screenX, e.screenY], drawing: true})
    }

    handleMouseUp(e) {
        this.setState({drawing: false})
    }

    draw(start, end) {

        console.log(start, end)
        const ctx = this.state.ctx

        //line styling
        ctx.strokeStyle = this.state.color
        ctx.lineWidth = 5
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'

        //drawing
        ctx.beginPath()
        ctx.moveTo(...start)
        ctx.lineTo(...end)
        ctx.closePath()
        ctx.stroke()
    }

    componentDidMount(){
        const canvas = document.getElementById('canvas-container')
        const canvasCTX = canvas.getContext('2d')
        this.setState({ ctx: canvasCTX })
    }

    render () {
        // if (this.state.drawing) this.draw(this.state.startDraw, [this.state.mousePositionX, this.state.mousePositionY])
        return (
            <canvas
            id="canvas-container"
            onMouseMove={this.handleMouseMove}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            >
            </canvas>
        )
    }
}

export default Whiteboard