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
            endDraw: [],
            drawing: true
        }
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.draw = this.draw.bind(this)
    }

    handleMouseMove(e) {
        this.setState({mousePositionX: e.screenX, mousePositionY: e.screenY})
    }

    handleMouseDown(e) {
        this.setState({startDraw: [this.mousePositionX, this.mousePositionY], drawing: true})
    }

    handleMouseUp(e) {
        this.setState({drawing: false})
    }

    draw() {
        ctx.strokeStyle = this.state.color
        ctx.beginPath()
    }

    render () {
        if (this.state.drawing) this.draw()
        return (
            <div
            id="canvas-container"
            onMouseMove={this.handleMouseMove}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            >
            </div>
        )
    }
}

export default Whiteboard