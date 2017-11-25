import React, { Component }from 'react'

class dice extends Component {

    render () {
        return (
          <div id='dice-roller'>
            {
              diceInitialize(document.getElementById('dice'), 1010, 1010)
            }
          </div>
        )
    }
}

export default dice

