"use strict";

import React from 'react';


export default class TreeNode extends React.Component {

  render() {

    return (
      <g>

        <circle
          r={3}
          fill="#ff7f0e"
          cx={this.props.node.y + this.props.offset.y}
          cy={this.props.node.x + this.props.offset.x}>
        </circle>

        <text
          dy={2}
          fontSize={10}
          x={this.props.node.y + this.props.offset.y - 8}
          y={this.props.node.x + this.props.offset.x}
          stroke="black"
          textAnchor={"end"}
          >
          {this.props.node.data.name}
        </text>

      </g>
    );
  }
}
