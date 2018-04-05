"use strict";

import React from 'react';
import * as d3 from 'd3';

export default class Node extends React.Component {

  color = d3.scaleOrdinal(d3.schemeCategory20);

  render() {
    return (
      <g
        className="node"
        onClick={(e) => this.props.toggleHighlight(e, this.props.node)}
        onContextMenu={this.props.hideHighlight}
        opacity={this.props.node.disabled ? 0.1 : 1}>

        <circle
          r={this.props.radius(this.props.node)}
          fill={this.color(this.props.node.group)}
          cx={this.props.node.x}
          cy={this.props.node.y}>
        </circle>

        <text
          x={this.props.node.x}
          y={this.props.node.y}
          stroke="black"
          dx={0}
          dy={".30em"}
          alignmentBaseline={"middle"}
          textAnchor={"middle"}>
          {this.props.node.text}
        </text>

      </g>
    );
  }
}
