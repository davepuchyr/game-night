import React, { Component }from 'react'

class Dice extends Component {

    render () {
        return (
          <div className="dice-board">
          {
              diceInitialize(document.getElementById('dice-container'), window.innerWidth - 1, 5 - window.innerHeight - 70)
          }
          </div>
        )
    }
}

export default Dice

