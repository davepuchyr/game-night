import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { addMessage } from '../store'

class RoomMessages extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit (e) {
        e.preventDefault()
        const sender = this.props.user.nickname
        const content = e.target.content.value
        const message = {[sender]: content}
        this.props.postMessage(message)
        e.target.content.value = ''
    }

    render () {
        return (
            <div>
                RoomMessages
                <br />
                {
                    this.props.roomMessages.map((message, idx) => {
                        return (
                            <div key={idx}>
                                {Object.keys(message)[0]} - {Object.values(message)[0]}
                                {/* {`${message.sender} - ${message[sender]}`} */}
                            </div>
                        )
                    })
                }
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="content"/>
                    <button type="submit"/>
                </form>
            </div>
        )
    }
}

const mapState = state => {
    return {
        user: state.user,
        roomMessages: state.roomMessages
    }
}

const mapDispatch = dispatch => {
    return {
        postMessage(message) {
            dispatch(addMessage(message))
        }
    }
}

export default connect(mapState, mapDispatch)(RoomMessages)