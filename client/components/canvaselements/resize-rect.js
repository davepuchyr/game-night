import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Rect } from 'react-konva'

class ResizeRect extends React.Component {
    changeSizeUp() {
      const rect = this.refs.rect;

      // to() is a method of `Konva.Node` instances
      rect.to({
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 0.2
      });
    }
    changeSizeDown() {
      const rect = this.refs.rect;

      // to() is a method of `Konva.Node` instances
      rect.to({
        scaleX: 1,
        scaleY: 1,
        duration: 0.2
      });
    }
    render() {
    return (
      <Group>
        <Rect
          x={300}
          y={300}
          ref="rect"
          width={50}
          height={50}
          draggable={true}
          fill={'black'}
          onDragEnd={this.changeSizeDown.bind(this)}
          onDragStart={this.changeSizeUp.bind(this)}
        />
      </Group>
    );
  }
}