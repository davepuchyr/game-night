import React, { Component }from 'react'

class dice extends Component {

    render () {
        return (
          <div id='something'>
            {
              diceInitialize(document.getElementById('trying'), 1010, 1010)
            }
          </div>
        )
    }
}

export default dice

