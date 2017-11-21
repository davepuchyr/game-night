import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Star } from 'react-konva'


const HexPiece = (props) => {
        return (
          <Star
          x={props.x}
          y={props.y}
          numPoints={6}
          innerRadius={43}
          outerRadius={50}
          fill={props.fill}
          opacity={0.8}
          // draggable={true}
          rotation={0}
          shadowColor={'black'}
          shadowBlur={10}
          shadowOpacity={0.6}
          />)
}


export default HexPiece
