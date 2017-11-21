import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Layer, Stage } from 'react-konva'
import HexPiece from './hex-piece'

class PlayerPieces extends React.Component {
    constructor() {
      super()
    }

    render() {
        return (
        
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer width={window.innerWidth} height={window.innerHeight}>
               <HexPiece fill={'black'}/>
            </Layer>
        </Stage>
        );
    }
}

export default PlayerPieces