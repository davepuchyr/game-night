import React, { Component }from 'react'
const htmlContent = require('../../public/hello.html')

class dice extends Component {
    render () {
        return (
            <div id='something'>
                <div id='svg' dangerouslySetInnerHTML={ {__html: htmlContent} }></div>
            </div>
        )
    }
}

export default dice