import React, { Component }from 'react'
const htmlContent = require('../../public/3d-die-roller/dice/hello.html')

class dice extends Component {
    render () {
        return (
            <div id='dice'>
                <div dangerouslySetInnerHTML={ {__html: htmlContent} } />
            </div>
        )
    }
}

export default dice