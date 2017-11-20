import React, { Component }from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import ReactDOM from 'react-dom'

import whiteboard, { draw } from '../whiteboard'


class Whiteboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: 'black',
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
        const currentPosition = this.state.startDraw
        const nextPosition = [e.screenX, e.screenY]

        if(this.state.drawing){
            this.draw(currentPosition, nextPosition)
        }
        this.setState({startDraw: nextPosition})
    }

    handleMouseDown(e) {
        this.setState({startDraw: [e.screenX, e.screenY], drawing: true})
    }

    handleMouseUp(e) {
        this.setState({drawing: false})
    }

    draw(start, end) {
        const ctx = this.state.ctx 
        // const canvas = ReactDOM.findDOMNode(this.refs.canvas)
        // const ctx = canvas.getContext('2d')
        // console.log(ctx, start, end)

        //drawing
        ctx.beginPath()
        ctx.strokeStyle = this.state.color
        ctx.moveTo(...start)
        ctx.lineTo(...end)
        ctx.closePath()
        ctx.stroke()
    }
 
    componentDidMount(){
        const canvas = ReactDOM.findDOMNode(this.refs.canvas)
        const canvasCTX = canvas.getContext('2d')
        canvasCTX.lineWidth = 5
        canvasCTX.lineJoin = 'round'
        canvasCTX.lineCap = 'round'
        this.setState({ ctx: canvasCTX })
    }

    render () {
        return (
            <canvas
            id="canvas-container"
            ref="canvas"
            onMouseMove={this.handleMouseMove}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            >
            </canvas>
        )
    }
}

export default Whiteboard