import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchMessages } from '../store'

/**
 * COMPONENT
 */
export class Messages extends React.Component {
  constructor(props){
      super(props)
  }

  componentDidMount(){
      this.props.getMessages()
  }

  render(){
    const { messages } = this.props
    return (
        <div>
            <h3>Hello!</h3>
            {
            messages.length &&
                messages.map(message => 
                    <p key={message.id}>{message.content}</p>
                )
            }
            <form>
               <input
               type="text"
               placeholder="Write message" 
               />
               <button></button>
            </form>
        </div>
    )  
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    messages: state.messages
  }
}

const mapDispatch = (dispatch) => {
    return {
      getMessages: () => {
          dispatch(fetchMessages())
      }
    }
}

export default connect(mapState, mapDispatch)(Messages)

/**
 * PROP TYPES
 */
Messages.propTypes = {
  messages: PropTypes.array,
  getMessages: PropTypes.func.isRequired
}
